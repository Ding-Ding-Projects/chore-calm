[CmdletBinding()]
param(
    [string]$Root = '',
    [string]$Output = ''
)

$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}
function Get-RelativePath([string]$Base, [string]$FullName) {
    $basePath = (Resolve-Path -LiteralPath $Base).Path.TrimEnd('\') + '\'
    $fullPath = (Resolve-Path -LiteralPath $FullName).Path
    if (-not $fullPath.StartsWith($basePath, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Path is outside the repository root: $FullName"
    }
    return $fullPath.Substring($basePath.Length).Replace('\', '/')
}
$excludedDirectories = @('.git', 'build', 'node_modules')
$excludedExtensions = @('.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.zip', '.7z', '.exe', '.dll')

$files = Get-ChildItem -LiteralPath $Root -File -Recurse | Where-Object {
    $relative = Get-RelativePath $Root $_.FullName
    $parts = $relative -split '[\\/]'
    ($parts | Where-Object { $excludedDirectories -contains $_ }).Count -eq 0 -and
    ($excludedExtensions -notcontains $_.Extension.ToLowerInvariant())
}

$records = foreach ($file in $files | Sort-Object FullName) {
    $relative = Get-RelativePath $Root $file.FullName
    $lines = if ($file.Length -eq 0) { 0 } else { (Get-Content -LiteralPath $file.FullName).Count }
    [ordered]@{
        path = $relative
        bytes = $file.Length
        lines = $lines
    }
}

$totalLines = (@($records) | ForEach-Object { [int]$_['lines'] } | Measure-Object -Sum).Sum
if ($null -eq $totalLines) { $totalLines = 0 }

$result = [ordered]@{
    schemaVersion = 1
    generatedBy = 'scripts/count-lines.ps1'
    generatedAt = 'not provenance'
    files = @($records)
    totalFiles = @($records).Count
    totalLines = $totalLines
}

$json = $result | ConvertTo-Json -Depth 5
if ($Output) {
    $outputPath = [IO.Path]::GetFullPath((Join-Path $Root $Output))
    $parent = Split-Path -Parent $outputPath
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    Set-Content -LiteralPath $outputPath -Value $json -Encoding UTF8
}
$json
