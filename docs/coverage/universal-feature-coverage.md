# Universal feature coverage inventory

## Purpose and status vocabulary

This is a hand-written inventory, not a list generated from discovered controls. Every canonical
user-facing contract is named, including contracts that do not fit a static documentation page.
`Gap` means the current static page cannot provide the feature literally. `Equivalent` means the
page provides a bounded browser-local version and states its boundary. `Pending` means the feature
or its built evidence is still open. No row claims a capture, release, hosted URL, or remote workflow
success.

| ID | Canonical feature | Static-page implementation or limitation | Documentation | Local state | Focused validation | Built proof | Capture | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| U01 | English, Hong Kong-style Cantonese, and bilingual language modes | Implemented in page settings and story copy; persistence is browser-local. | `docs/features/chore-coaching.md` | browser storage | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U02 | Emoji display control | Implemented as a browser-local message decoration preference; control text stays factual. | feature article | browser storage | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U03 | Personal-vocabulary JSON upload | Implemented as a bounded local JSON picker with clear/reset; private values must never enter public records. | README and feature article | browser storage only | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U04 | Funny-level controls for English and Cantonese | Implemented as two independent local sliders with localized tone output. | feature article | browser storage | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U05 | Narration and selectable voices | A browser page may offer opt-in speech where supported, with a text alternative; it cannot promise a voice or background delivery. | feature article | browser preference only | pending capability checks | pending | none | Gap |
| U06 | Scheduled and external settings | Browser timers may demonstrate a local schedule while the page is open; external API and Home Assistant access are not part of this scaffold. | feature article | browser storage | pending | pending | none | Gap |
| U07 | Dim-sum surprise | No photo or surprise asset is included in this lane. | coverage inventory | none | not applicable | none | none | Gap |
| U08 | Advanced regex builder on every search | A static page may provide a plain-text-first search and an explained local pattern mode; the full engine work is pending. | coverage inventory | browser state | pending | pending | none | Pending |
| U09 | Non-blocking notifications | Implemented as in-page non-blocking status messages; system notifications are not claimed. | feature article | browser state | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U10 | Material Design 3 appearance and per-element editor | The page uses documented local design tokens; a full image and typography editor is not literal for this static concept. | coverage inventory | browser storage | pending | pending | none | Gap |
| U11 | Tabs, groups, pinning, and four tab searches | Documentation navigation can use ordinary links; application tab management is not present. | `docs/README.md` | none | pending | pending | none | Gap |
| U12 | Element context menus and appearance editing | The browser equivalent is a visible settings panel; no per-element editor is claimed. | coverage inventory | browser storage | pending | pending | none | Gap |
| U13 | Locks, Support Tickets, and the unlock ladder | A static page cannot secure individual rendered elements with an application credential policy. | HANDOFF.md | none | not applicable | none | none | Gap |
| U14 | Command palette with `Ctrl+Shift+F` | Implemented as a keyboard-accessible local palette that focuses or scrolls to concept controls. | `docs/README.md` | browser state | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U15 | Changelog viewer with date, regex, copy, and export | Repository changelog content and plain downloads can be documented; an in-page viewer is pending. | ROADMAP.md | none | pending | pending | none | Pending |
| U16 | Local version history | Browser storage can keep preference revisions, but it is not an application-local Git repository or secure history manager. | feature article | browser storage | pending | pending | none | Equivalent |
| U17 | File conversion | No file-conversion feature is exposed by this concept page. | coverage inventory | none | not applicable | none | none | Gap |
| U18 | Local Ollama suite manager | A static page cannot manage local models, stores, or launch profiles. | coverage inventory | none | not applicable | none | none | Gap |
| U19 | Authenticator and TOTP registration | A static page must not persist authenticator secrets or claim vault support. | coverage inventory | none | not applicable | none | none | Gap |
| U20 | Destructive-action super confirmation | The page can use ordinary confirmation text for local preference reset; no destructive application action exists. | feature article | browser storage | pending | pending | none | Equivalent |
| U21 | External editor handoff | A page may offer a copyable text block; it cannot guarantee a local editor process handoff. | coverage inventory | none | pending | pending | none | Equivalent |
| U22 | Exports in every supported format | Markdown and plain text downloads can be offered for public docs; application formats are not present. | `docs/README.md` | browser state | pending | pending | none | Equivalent |
| U23 | Bulk actions | A static article index can support ordinary filtering; no destructive bulk application action exists. | coverage inventory | none | pending | pending | none | Gap |
| U24 | Accessibility and responsive sizing | Implemented with keyboard paths, focus styles, text alternatives, reduced motion, and 320 px CSS targets; built layout proof remains open. | feature article | browser preference | local source checks pass, built layout pending | pending | none | Pending evidence |
| U25 | Offline landing page and documentation | Root `index.html`, local scripts, local assets, and documentation are staged offline by the build route. | `docs/README.md` | none | strict local validation passes | built output local only | none | Pending remote evidence |
| U26 | Browser-extension download start, progress, completion, and recovery | No browser extension or transfer exists. | coverage inventory | none | not applicable | none | none | Gap |
| U27 | App update manager | A static page has no installed application update feed or restart action. | HANDOFF.md | none | not applicable | none | none | Gap |
| U28 | App logo and link-preview graphic | Product-specific mascot branding, `social-preview.png`, and static Open Graph metadata are implemented; live crawler proof remains open. | ROADMAP.md | browser storage | local decode and strict validation pass | built output local only | none | Pending remote evidence |
| U29 | Running version and updated-at provenance | The front screen reads version `0.1.0` and commit-bound updated-at provenance from `build-provenance.js`; built capture remains open. | `build-manifest.json` | manifest | strict local validation passes | commit-bound local build | none | Pending capture |
| U30 | Shared status surface | A static page can show a dated local status block, but no live authenticated status service is wired here. | HANDOFF.md | none | pending | pending | none | Gap |
| U31 | Guided forms, presets, and rich controls | Documentation can provide labelled examples; no form editor or preset engine exists in this static concept. | feature article | none | pending | pending | none | Gap |
| U32 | Overlays, keyboard shortcuts, progress, and recovery | Implemented with dialogs, keyboard palette, story progress, pause, recovery step, and non-blocking notifications. | feature article | browser state | local source checks pass, built interaction pending | pending | none | Pending evidence |
| U33 | Provider-authored text rendering | Public documentation is authored source; no remote-authored content renderer is included. | coverage inventory | none | not applicable | none | none | Gap |
| U34 | Forge publishing and account selection | GitHub Pages publication is a workflow concern; no account-management surface is shipped. | ROADMAP.md | none | workflow validation pending | pending | none | Gap |
| U35 | Filters and statistics | A feature index may provide collapsible local filters; no statistics panel is present. | `docs/features/README.md` | browser state | pending | pending | none | Equivalent |
| U36 | Checked-in design reference parity | A code-native design handoff exists in `design/README.md`; a dedicated reference app and parity captures remain open. | HANDOFF.md | none | pending | none | none | Gap |
| U37 | Clean-source build, manifest, dependency, and installer receipts | Root scripts and manifest are present; local build and strict validation pass, while remote workflow proof remains open. | README and manifest | manifest | `scripts/validate-repository.ps1` | commit-bound local build | none | Pending remote evidence |
| U38 | School mode and shared reset path | A static page can offer a browser-local presentation switch, but it cannot share an application-wide credential or live state across installed apps. | coverage inventory | browser storage | pending page implementation | pending | none | Gap |
| U39 | ADHD-friendly modes | The concept page explains lower-demand, step-by-step, sensory-aware, and recovery-oriented choices; separate persisted product modes are not shipped. | `docs/features/chore-coaching.md` | none | pending | pending | none | Gap |

## Required next evidence

The next owner must run the strict local validation against the built output, capture genuine
built-page states, verify the GitHub Pages deployment, and replace only the expected URL after that
verification. Any row that remains impossible for a static page must keep its exact limitation and
browser-local equivalent here.
