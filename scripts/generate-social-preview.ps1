[CmdletBinding()]
param(
    [string]$Root = ''
)

$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}
$Root = (Resolve-Path -LiteralPath $Root).Path
$asset = Join-Path $Root 'assets/chore-calm-mascot-hero.png'
$output = Join-Path $Root 'social-preview.png'
if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
    throw "Missing mascot asset: $asset"
}
Add-Type -AssemblyName System.Drawing
$canvas = New-Object Drawing.Bitmap 1200, 630
$graphics = [Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.TextRenderingHint = [Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$background = New-Object Drawing.Drawing2D.LinearGradientBrush(
    (New-Object Drawing.Point 0, 0),
    (New-Object Drawing.Point 1200, 630),
    ([Drawing.Color]::FromArgb(255, 248, 247, 255)),
    ([Drawing.Color]::FromArgb(255, 226, 236, 238))
)
$graphics.FillRectangle($background, 0, 0, 1200, 630)
$background.Dispose()
$orbBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(80, 109, 74, 255))
$graphics.FillEllipse($orbBrush, 820, -180, 520, 520)
$orbBrush.Dispose()
$accentBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(100, 255, 145, 122))
$graphics.FillEllipse($accentBrush, -120, 470, 280, 280)
$accentBrush.Dispose()
$cardBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(235, 255, 255, 255))
$card = New-Object Drawing.Rectangle 58, 54, 700, 520
$graphics.FillRectangle($cardBrush, $card)
$cardBrush.Dispose()
$border = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(45, 73, 62, 115)), 2
$graphics.DrawRectangle($border, $card)
$border.Dispose()
$fontEyebrow = New-Object Drawing.Font('Segoe UI', 18, [Drawing.FontStyle]::Bold)
$fontTitle = New-Object Drawing.Font('Segoe UI', 55, [Drawing.FontStyle]::Bold)
$fontBody = New-Object Drawing.Font('Segoe UI', 23, [Drawing.FontStyle]::Regular)
$fontChip = New-Object Drawing.Font('Segoe UI', 16, [Drawing.FontStyle]::Bold)
$ink = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(255, 35, 31, 45))
$muted = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(255, 74, 69, 83))
$primary = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(255, 73, 48, 150))
$graphics.DrawString('CALM CHORE COMPANION CONCEPT', $fontEyebrow, $primary, 100, 98)
$graphics.DrawString('Chore Calm', $fontTitle, $ink, 96, 150)
$graphics.DrawString('Begin without being yelled at.', $fontBody, $muted, 100, 236)
$graphics.DrawString('Teach one next step. Make room to pause.', $fontBody, $muted, 100, 278)
$chipBrush = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(255, 235, 224, 255))
$graphics.FillRectangle($chipBrush, 100, 362, 235, 50)
$chipBrush.Dispose()
$graphics.DrawString('NOTICE', $fontChip, $primary, 122, 377)
$graphics.DrawString('BREAK IT DOWN', $fontChip, $primary, 378, 377)
$graphics.DrawString('COACH', $fontChip, $primary, 100, 448)
$graphics.DrawString('RECOVER', $fontChip, $primary, 242, 448)
$graphics.DrawString('CALM COMPLETION', $fontChip, $primary, 410, 448)
$graphics.DrawString('Not a cure. Not control over other people.', $fontBody, $muted, 100, 506)
$graphics.DrawString('Just calmer support.', $fontBody, $muted, 100, 540)
$mascot = [Drawing.Image]::FromFile($asset)
$ratio = [Math]::Min(420 / $mascot.Width, 520 / $mascot.Height)
$width = [int]($mascot.Width * $ratio)
$height = [int]($mascot.Height * $ratio)
$x = 820 + [int]((300 - $width) / 2)
$y = 60 + [int]((520 - $height) / 2)
$graphics.DrawImage($mascot, $x, $y, $width, $height)
$mascot.Dispose()
$fontFooter = New-Object Drawing.Font('Segoe UI', 15, [Drawing.FontStyle]::Regular)
$graphics.DrawString('chore-calm | local-first concept', $fontFooter, $muted, 100, 586)
$ink.Dispose(); $muted.Dispose(); $primary.Dispose(); $fontEyebrow.Dispose(); $fontTitle.Dispose(); $fontBody.Dispose(); $fontChip.Dispose(); $fontFooter.Dispose(); $graphics.Dispose()
$canvas.Save($output, [Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
Write-Output "Generated product-specific social preview: $output"
