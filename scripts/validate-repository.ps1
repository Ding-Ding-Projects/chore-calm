[CmdletBinding()]
param(
    [ValidateSet('Scaffold', 'Build', 'Strict')]
    [string]$Mode = 'Scaffold',
    [string]$Root = ''
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
$manifestPath = Join-Path $Root 'build-manifest.json'
$required = @(
    'AGENTS.md', 'README.md', 'ROADMAP.md', 'HANDOFF.md', 'build-manifest.json',
    'build.bat', 'build-installer.bat', 'download-dependencies.bat',
    'docs/README.md', 'docs/features/README.md', 'docs/features/chore-coaching.md',
    'docs/coverage/universal-feature-coverage.md', 'scripts/count-lines.ps1',
    'scripts/validate-repository.ps1', 'scripts/write-build-provenance.ps1',
    '.github/workflows/pages.yml', '.github/workflows/dependency-inventory.md',
    'index.html', 'styles.css', 'script.js', 'content.js', 'build-provenance.js',
    'assets/chore-calm-mascot-hero.png', 'assets/chore-calm-first-step.png',
    'assets/chore-calm-reset-pose.png', 'social-preview.png',
    'scripts/generate-social-preview.ps1'
)

function Assert-Text([string]$Path, [string]$Needle, [string]$Description) {
    $full = Join-Path $Root $Path
    $text = Get-Content -Raw -LiteralPath $full
    if (-not $text.Contains($Needle)) { throw "Missing $Description in $Path" }
}

foreach ($path in $required) {
    if (-not (Test-Path -LiteralPath (Join-Path $Root $path) -PathType Leaf)) {
        throw "Required path is missing: $path"
    }
}

$manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
if ($manifest.schemaVersion -ne 1) { throw 'build-manifest.json schemaVersion must be 1.' }
if (@($manifest.dependencies).Count -ne 0) { throw 'The scaffold must remain dependency-free.' }
if ($manifest.build.canonicalCommand -ne '.\build.bat --run') { throw 'Manifest canonicalCommand is incorrect.' }
if ($manifest.installer.applicable -ne $false) { throw 'Static-site installer applicability must remain false.' }

Assert-Text 'README.md' '.\build.bat --run' 'the fresh Windows build command'
Assert-Text 'README.md' 'https://Ding-Ding-Projects.github.io/chore-calm/' 'the replaceable landing-page URL placeholder'
Assert-Text 'README.md' 'ADHD can make chores harder through initiation' 'the ADHD scope boundary'
Assert-Text 'AGENTS.md' '## Agent conversation vocabulary' 'the sanitized agent block'
Assert-Text 'AGENTS.md' 'Published writing uses ordinary professional English' 'the public-writing boundary'
Assert-Text 'ROADMAP.md' '- [ ]' 'unticked roadmap work'
Assert-Text 'docs/coverage/universal-feature-coverage.md' '| U01 |' 'the hand-written coverage inventory'
Assert-Text 'docs/coverage/universal-feature-coverage.md' '| U39 |' 'the final universal coverage row'
Assert-Text '.github/workflows/pages.yml' 'workflow_dispatch' 'manual Pages dispatch'
Assert-Text '.github/workflows/pages.yml' 'windows-2025' 'the Windows-only workflow scope'
Assert-Text '.github/workflows/dependency-inventory.md' 'build' 'the workflow dependency inventory'
Assert-Text 'index.html' 'You do not need to be yelled at to begin.' 'the concept hero'
Assert-Text 'index.html' 'build-provenance.js' 'the provenance bootstrap'
Assert-Text 'index.html' 'property="og:image"' 'the absolute link-preview image'
Assert-Text 'index.html' 'twitter:card' 'the large link-preview card type'
Assert-Text 'script.js' 'event.ctrlKey && event.shiftKey' 'the command palette shortcut'
Assert-Text 'content.js' 'five ordered bilingual steps' 'the content contract'

$publicFiles = Get-ChildItem -LiteralPath $Root -File -Recurse | Where-Object {
    $_.FullName -notlike "*$([IO.Path]::DirectorySeparatorChar)build$([IO.Path]::DirectorySeparatorChar)*" -and
    $_.FullName -ne $PSCommandPath
}
$forbiddenMarkers = @('PERSONAL_VOCABULARY.json', 'noreply@anthropic.com')
foreach ($file in $publicFiles) {
    if ($file.Extension.ToLowerInvariant() -in @('.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico')) {
        $relative = Get-RelativePath $Root $file.FullName
        if ($relative -ne 'social-preview.png' -and -not $relative.StartsWith('assets/', [StringComparison]::OrdinalIgnoreCase)) {
            throw "Image file is outside the declared assets folder: $relative"
        }
        continue
    }
    if ($file.Length -lt 2MB -and $file.Extension.ToLowerInvariant() -in @('.md', '.bat', '.ps1', '.json', '.yml', '.yaml', '.html', '.txt')) {
        $text = Get-Content -Raw -LiteralPath $file.FullName
        foreach ($marker in $forbiddenMarkers) {
            if ($text.Contains($marker)) { throw "Public-safe marker found in $(Get-RelativePath $Root $file.FullName): $marker" }
        }
    }
}

$strictEntry = Join-Path $Root 'index.html'
if ($Mode -eq 'Strict' -and -not (Test-Path -LiteralPath $strictEntry -PathType Leaf)) {
    throw 'Strict site validation requires the root index.html page entry point.'
}

Write-Output "Validated public-safe page source in mode $Mode."
if (Test-Path -LiteralPath $strictEntry -PathType Leaf) {
    Write-Output 'Site entry point: present.'
} else {
    Write-Output 'Site entry point: pending page implementation lane.'
}
Add-Type -AssemblyName System.Drawing
$previewPath = Join-Path $Root 'social-preview.png'
$preview = [Drawing.Image]::FromFile($previewPath)
try {
    if ($preview.Width -ne 1200 -or $preview.Height -ne 630) {
        throw "social-preview.png must be 1200x630, found $($preview.Width)x$($preview.Height)."
    }
} finally {
    $preview.Dispose()
}
Write-Output 'Page assets: local mascot files and 1200x630 social preview decoded successfully.'
