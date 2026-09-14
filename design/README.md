# Chore Calm concept design handoff

## Route and availability

The preferred visual design route was unavailable in this session because no creation or export surface was connected. The sanctioned fallback is a code-native implementation using local HTML, CSS, SVG, and repository-local image files. This deviation is intentional and limited to the design-authoring route.

The files in this folder describe design data and deterministic capture targets. They are not a production-proof claim, a primary application, or a playable game.

## Deterministic screen inventory

| Screen id | State | Route | Viewport | Theme | Language | Motion | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `home-calm-loop` | Initial hero and first story step | `index.html#top` | 1440 x 1000 | Light | English | Idle | Version and updated-at provenance are visible before navigation |
| `home-calm-loop-dark` | Initial hero and first story step | `index.html#top` | 1440 x 1000 | Dark | English | Idle | Same structure and copy, dark token set |
| `story-recovery` | Recovery step in spill scenario | `index.html#story` | 1440 x 1000 | Light | Bilingual | Paused | Select `A spill after a hard day`, then select Recovery |
| `settings-accessibility` | Settings open with reduced motion and local JSON control | `index.html#settings-dialog` | 390 x 844 | Light | Bilingual | Reduced | The dialog scrolls within the viewport |
| `mobile-first-step` | First step card and narration controls | `index.html#story` | 320 x 720 | Dark | Cantonese | Reduced | Narrow layout target, no horizontal page scroll |

## Design tokens and component intent

- Color roles, typography, shape, elevation, focus, and state layers live in `styles.css` as local custom properties.
- Buttons, switches, selects, cards, dialogs, the palette, and the story rail have explicit focus and touch-size behavior.
- The SVG path is the primary motion diagram. The story card adds a local companion pose without depending on a remote service.
- The hero, first-step, and recovery images are local files under `assets/`. Alt text describes what each image shows without making an asset provenance claim.

## Intentional deviations

- There is no hosted visual design file because the connected design-authoring surface was unavailable.
- The implementation uses a static page and browser APIs only. It does not claim to be the primary application, runtime, a medical treatment, or a substitute for human support.
- The updated-at field honestly reports unavailable provenance because no build or release record is attached to this concept-only lane.

## Review notes

Repeat captures with the exact screen id, state, viewport, theme, language, and motion settings above. Compare raw page captures to the implementation, not to a mock or copied design. Keep all visual review data outside the public page unless it is safe, necessary, and tied to the exact implementation state.
