# Universal feature coverage inventory

## Purpose and status vocabulary

This is a hand-written inventory, not a list generated from discovered controls. Every canonical
user-facing contract is named, including contracts that do not fit a static documentation page.
`Gap` means the scaffold does not provide the feature. `Equivalent` means the page can provide a
limited browser-local version and must state its boundary. `Pending` means the page implementation
lane still owns the work. No row claims a capture, release, hosted URL, or test success.

| ID | Canonical feature | Static-page implementation or limitation | Documentation | Local state | Focused validation | Built proof | Capture | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| U01 | English, Hong Kong-style Cantonese, and bilingual language modes | Page copy may offer all three presentations; persistence is browser-local. | `docs/features/chore-coaching.md` | browser storage | validation script plus page checks pending | pending page build | none | Pending |
| U02 | Emoji display control | Browser-local preference can control decorative emoji in dialogs; control text stays factual. | feature article | browser storage | pending page checks | pending | none | Pending |
| U03 | Personal-vocabulary JSON upload | A local file picker can validate a neutral schema; private values must never enter public records. | README and feature article | browser storage only | pending page implementation | pending | none | Pending |
| U04 | Funny-level controls for English and Cantonese | A page can expose two local sliders and disclose their effect; the scaffold has no controls yet. | feature article | browser storage | pending page checks | pending | none | Pending |
| U05 | Narration and selectable voices | A browser page may offer opt-in speech where supported, with a text alternative; it cannot promise a voice or background delivery. | feature article | browser preference only | pending capability checks | pending | none | Gap |
| U06 | Scheduled and external settings | Browser timers may demonstrate a local schedule while the page is open; external API and Home Assistant access are not part of this scaffold. | feature article | browser storage | pending | pending | none | Gap |
| U07 | Dim-sum surprise | No photo or surprise asset is included in this lane. | coverage inventory | none | not applicable | none | none | Gap |
| U08 | Advanced regex builder on every search | A static page may provide a plain-text-first search and an explained local pattern mode; the full engine work is pending. | coverage inventory | browser state | pending | pending | none | Pending |
| U09 | Non-blocking notifications | In-page status messages are the accessible local equivalent; system notifications are not claimed. | feature article | browser state | pending | pending | none | Equivalent |
| U10 | Material Design 3 appearance and per-element editor | The page must use documented design tokens; a full image and typography editor is not literal for this scaffold. | coverage inventory | browser storage | pending | pending | none | Gap |
| U11 | Tabs, groups, pinning, and four tab searches | Documentation navigation can use ordinary links; application tab management is not present. | `docs/README.md` | none | pending | pending | none | Gap |
| U12 | Element context menus and appearance editing | The browser equivalent is a visible settings panel; no per-element editor is claimed. | coverage inventory | browser storage | pending | pending | none | Gap |
| U13 | Locks, Support Tickets, and the unlock ladder | A static page cannot secure individual rendered elements with an application credential policy. | HANDOFF.md | none | not applicable | none | none | Gap |
| U14 | Command palette with `Ctrl+Shift+F` | The page can expose a keyboard-accessible feature index; the required teleporting palette is pending. | `docs/README.md` | browser state | pending | pending | none | Pending |
| U15 | Changelog viewer with date, regex, copy, and export | Repository changelog content and plain downloads can be documented; an in-page viewer is pending. | ROADMAP.md | none | pending | pending | none | Pending |
| U16 | Local version history | Browser storage can keep preference revisions, but it is not an application-local Git repository or secure history manager. | feature article | browser storage | pending | pending | none | Equivalent |
| U17 | File conversion | No file-conversion feature is exposed by the documentation scaffold. | coverage inventory | none | not applicable | none | none | Gap |
| U18 | Local Ollama suite manager | A static page cannot manage local models, stores, or launch profiles. | coverage inventory | none | not applicable | none | none | Gap |
| U19 | Authenticator and TOTP registration | A static page must not persist authenticator secrets or claim vault support. | coverage inventory | none | not applicable | none | none | Gap |
| U20 | Destructive-action super confirmation | The page can use ordinary confirmation text for local preference reset; no destructive application action exists. | feature article | browser storage | pending | pending | none | Equivalent |
| U21 | External editor handoff | A page may offer a copyable text block; it cannot guarantee a local editor process handoff. | coverage inventory | none | pending | pending | none | Equivalent |
| U22 | Exports in every supported format | Markdown and plain text downloads can be offered for public docs; application formats are not present. | `docs/README.md` | browser state | pending | pending | none | Equivalent |
| U23 | Bulk actions | A static article index can support ordinary filtering; no destructive bulk application action exists. | coverage inventory | none | pending | pending | none | Gap |
| U24 | Accessibility and responsive sizing | The page implementation must cover keyboard, touch, screen readers, reduced motion, contrast, and approximately 320 px width. | feature article | browser preference | pending page checks | pending | none | Pending |
| U25 | Offline landing page and documentation | This scaffold is dependency-free and can be staged offline; the HTML entry point remains pending. | `docs/README.md` | none | local validation | pending page build | none | Pending |
| U26 | Browser-extension download start, progress, completion, and recovery | No browser extension or transfer exists. | coverage inventory | none | not applicable | none | none | Gap |
| U27 | App update manager | A static page has no installed application update feed or restart action. | HANDOFF.md | none | not applicable | none | none | Gap |
| U28 | App logo and link-preview graphic | No image files are added in this lane; page branding and metadata remain pending. | ROADMAP.md | none | pending | pending | none | Pending |
| U29 | Running version and updated-at provenance | The manifest records `0.0.0-scaffold` and `updatedAt: unavailable`; no user-facing runtime front screen exists yet. | `build-manifest.json` | manifest | validation script | pending | none | Equivalent |
| U30 | Shared status surface | A static page can show a dated local status block, but no live authenticated status service is wired here. | HANDOFF.md | none | pending | pending | none | Gap |
| U31 | Guided forms, presets, and rich controls | Documentation can provide labelled examples; no form editor or preset engine exists in the scaffold. | feature article | none | pending | pending | none | Gap |
| U32 | Overlays, keyboard shortcuts, progress, and recovery | The future page must provide visible local equivalents and avoid simulated success. | feature article | browser state | pending | pending | none | Pending |
| U33 | Provider-authored text rendering | Public documentation is authored source; no remote-authored content renderer is included. | coverage inventory | none | not applicable | none | none | Gap |
| U34 | Forge publishing and account selection | GitHub Pages publication is a workflow concern; no account-management surface is shipped. | ROADMAP.md | none | workflow validation pending | pending | none | Gap |
| U35 | Filters and statistics | A feature index may provide collapsible local filters; no statistics panel is present. | `docs/features/README.md` | browser state | pending | pending | none | Equivalent |
| U36 | Checked-in design reference parity | No design-reference folder or parity capture is present in this scaffold. | HANDOFF.md | none | not applicable | none | none | Gap |
| U37 | Clean-source build, manifest, dependency, and installer receipts | Root scripts and a committed manifest are present; the page entry point is intentionally checked separately by the workflow. | README and manifest | manifest | `scripts/validate-repository.ps1` | pending | none | Equivalent |
| U38 | School mode and shared reset path | A static page can offer a browser-local presentation switch, but it cannot share an application-wide credential or live state across installed apps. | coverage inventory | browser storage | pending page implementation | pending | none | Gap |
| U39 | ADHD-friendly modes | The concept can explain lower-demand, step-by-step, sensory-aware, and recovery-oriented choices; no product modes are shipped in this scaffold. | `docs/features/chore-coaching.md` | none | pending page implementation | pending | none | Pending |

## Required next evidence

The next owner must add the real page implementation, run the strict local validation against the
built output, capture genuine built-page states, verify the GitHub Pages deployment, and replace
only the placeholder URL after that verification. Any row that remains impossible for a static page
must keep its exact limitation and browser-local equivalent here.
