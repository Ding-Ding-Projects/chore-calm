# Handoff

## Current integrated state

The `main` candidate integrates the public-safe documentation lane and the page implementation
lane. The page is a dependency-free static concept surface with local mascot art, a product-
specific social preview, build provenance, and a strict Pages workflow.

Changed paths:

- `.gitignore`
- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `HANDOFF.md`
- `build-manifest.json`
- `build.bat`
- `build-installer.bat`
- `download-dependencies.bat`
- `docs/README.md`
- `docs/features/README.md`
- `docs/features/chore-coaching.md`
- `docs/coverage/universal-feature-coverage.md`
- `scripts/count-lines.ps1`
- `scripts/validate-repository.ps1`
- `.github/workflows/pages.yml`

The implementation also adds `index.html`, `styles.css`, `script.js`, `content.js`, the `assets/`
mascot files, `design/README.md`, `social-preview.png`, and the provenance helpers.

## Verification boundary

The local validation script checks the required repository contract, page entry point, metadata,
local image inventory, documentation links, public wording boundaries, social preview dimensions,
and build provenance. `cmd /c .\\build.bat` and strict validation pass locally at the integrated
candidate.

No built-page capture, hosted URL, release, or installer is claimed here. The first remote Pages
run was red because GitHui was still pointed at `chore-calm-docs`, the scaffold-only ref. The next
owner must dew `main`, set it as the default ref, rerun the workflow, and verify the published
response before changing the URL placeholder.

## Public tracking

- [Issue 1: Chore Calm concept build and public launch](https://github.com/Ding-Ding-Projects/chore-calm/issues/1)
- [Discussion 2: rolling General progress](https://github.com/Ding-Ding-Projects/chore-calm/discussions/2)

These links are tracking references only. This lane did not post, edit, close, or claim completion
on either public surface.

## 廣東話交接

而家 `main` 已經合返公開安全文件、真正概念頁、本地角色圖、預覽圖同建置來源資料。離線建置
同嚴格驗證喺本機通過；但真實建置截圖、線上網址同遠端 workflow 仍然要核實。第一次遠端 Pages
執行係紅色，原因係預設 ref 仲係 `chore-calm-docs`，下一步要 dew `main`、改預設 ref，再重新執行。

## Contract gaps for the next owner

- The page still needs built-artifact interaction evidence, real captures, and responsive review.
- The universal coverage inventory records static-page limitations and local equivalents, but most
  application-only controls are not literally implemented by this documentation scaffold.
- Real built-artifact captures, responsive verification, link-preview metadata, and a verified
  GitHub Pages URL remain open.
- A static page has no installer, application update feed, operating-system credential vault,
  application-local Git history, or external editor process. The inventory documents browser-local
  equivalents where reasonable and says when no equivalent can be honest.
