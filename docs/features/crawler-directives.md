# Crawler directives

## Behavior

The published static site includes a root `robots.txt` file with an explicit public policy:

```text
User-agent: *
Allow: /
```

This policy permits ordinary crawlers to discover the public concept pages and local assets. It
does not grant access to private files, credentials, build directories, or any service outside the
published Pages output.

## Build and configuration

`build.bat` copies the root file into `build/site/robots.txt`. The repository validator requires
the source file and checks both directives. The Pages workflow publishes the staged output at
`https://ding-ding-projects.github.io/chore-calm/robots.txt`.

## Failure modes and security

If the source file is missing, either directive is changed accidentally, or the build stops
copying the file, validation fails before publication. The policy is intentionally small and does
not list hidden paths, credentials, local diagnostics, or unverified URLs. A crawler directive is
not an access-control boundary, so sensitive material must never be placed in the published output.

## Verification

Local verification runs `cmd /c .\\build.bat`, confirms `build/site/robots.txt` exists, and runs
`scripts/validate-repository.ps1 -Mode Strict`. The deployed response is checked separately after
the Pages workflow completes.
