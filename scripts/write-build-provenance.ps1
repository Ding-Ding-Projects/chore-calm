[CmdletBinding()]
param(
    [string]$Root = '',
    [Parameter(Mandatory = $true)]
    [string]$Output
)

$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}
$Root = (Resolve-Path -LiteralPath $Root).Path
$manifest = Get-Content -Raw -LiteralPath (Join-Path $Root 'build-manifest.json') | ConvertFrom-Json
$commit = (& git -C $Root rev-parse --verify HEAD 2>&1).Trim()
if ($LASTEXITCODE -ne 0 -or $commit -notmatch '^[0-9a-f]{40}$') {
    throw 'Unable to resolve the exact source commit for build provenance.'
}
$updatedAt = (& git -C $Root show -s --format=%cI $commit 2>&1).Trim()
if ($LASTEXITCODE -ne 0 -or $updatedAt -notmatch '^[0-9]{4}-[0-9]{2}-[0-9]{2}T') {
    throw 'Unable to resolve the commit provenance timestamp.'
}
$payload = [ordered]@{
    version = [string]$manifest.version
    updatedAt = $updatedAt
    commit = $commit
    source = 'Git commit committer timestamp'
} | ConvertTo-Json -Compress
if ([IO.Path]::IsPathRooted($Output)) {
    $outputPath = [IO.Path]::GetFullPath($Output)
} else {
    $outputPath = [IO.Path]::GetFullPath((Join-Path $Root $Output))
}
$outputDirectory = Split-Path -Parent $outputPath
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$javascript = "window.CHORE_CALM_BUILD_PROVENANCE = Object.freeze($payload);`n"
[IO.File]::WriteAllText($outputPath, $javascript, (New-Object Text.UTF8Encoding($false)))
Write-Output "Wrote commit-bound build provenance for $commit to $Output."
