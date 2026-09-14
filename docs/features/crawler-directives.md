# Crawler directives

## Behavior

The published static site includes a root `robots.txt` file with an explicit public policy:

```text
User-agent: *
Allow: /
```

This policy keeps crawl access available so search crawlers can read the page-level suppression
metadata. Every published HTML page also carries:

```html
<meta name="robots" content="noindex, nofollow, noarchive" />
```

Together, these directives ask search engines not to index, follow, or cache the pages. It does
not grant access to private files, credentials, build directories, or any service outside the
published Pages output.

## Build and configuration

`build.bat` copies the root file into `build/site/robots.txt`. The repository validator requires
the source file, checks both directives, and checks the page-level metadata on every HTML page.
The Pages workflow publishes the staged output at
`https://ding-ding-projects.github.io/chore-calm/robots.txt`.

## Failure modes and security

If the source file is missing, either directive is changed accidentally, page-level metadata is
removed, or the build stops copying the file, validation fails before publication. A robots file
is not an access-control boundary, and a blocked crawl can prevent a crawler from seeing `noindex`.
That is why this site leaves crawling available and uses page-level metadata for suppression.
Sensitive material must never be placed in the published output.

## Verification

Local verification runs `cmd /c .\\build.bat`, confirms `build/site/robots.txt` exists, checks all
five HTML pages for the exact metadata, and runs `scripts/validate-repository.ps1 -Mode Strict`.
The deployed response is checked separately after the Pages workflow completes. Search engines may
take time to recrawl an already-known URL, so this is a request for suppression rather than an
instant removal guarantee.
