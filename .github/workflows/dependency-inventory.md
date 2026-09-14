# Workflow dependency inventory

This file is the hand-written dependency inventory for `.github/workflows/pages.yml`. It records
the work each job performs and the external actions it invokes. The workflow does not run tests,
lint, type checks, screenshots, or other quality gates.

| Job | Runner | Required actions and tools | Bootstrap path | Output |
| --- | --- | --- | --- | --- |
| `build` | `windows-2025` | `actions/checkout@v4`, `cmd.exe`, Windows PowerShell 5.1, `xcopy`, `actions/upload-pages-artifact@v3` | `build.bat` calls `download-dependencies.bat`; the manifest declares zero project packages | `build/site` Pages package |
| `deploy` | `windows-2025` | `actions/deploy-pages@v4` and the Pages deployment token supplied by the workflow environment | The `build` job must complete and provide the Pages package | Published Pages state, only when the strict page-entry check is present |

No action downloads project packages for this repository. The page entry point is checked by the
build job before upload, so a scaffold without `docs/index.html` fails honestly rather than
publishing a directory that has no landing page.
