# Built page evidence, 2026-09-14

These captures were taken from the deployed Chore Calm page through the isolated cheap
Lowlevel headless route. They are tied to deployment run `34877909162` and live provenance
commit `36b1c41ff685faa492a294512c546500bd5612b9`.

The desktop and settings captures are whole-window PNGs from the hidden Edge window. The portrait
capture is page-only CDP evidence with touch emulation, so it is labelled as emulated mobile
evidence rather than physical-device proof.

| State | Tuple | Capture |
| --- | --- | --- |
| Initial hero and version provenance | 929 x 1004, scale 1, English, light, idle | [desktop-1440x1000.png](desktop-1440x1000.png) |
| Settings with language, tone, theme, narration, and local JSON controls | 929 x 1004, scale 1, English, light | [settings-1440x1000.png](settings-1440x1000.png) |
| Narrow initial hero and provenance | 390 x 844, scale 1, touch-emulated, English, light | [mobile-390x844.png](mobile-390x844.png) |

## Runtime result

- The complete target-list proof found exactly one page target at the expected URL.
- Desktop body overflow was false at the inspected tuple.
- Mobile body overflow was false at 390 x 844.
- The accessibility tree had a root web area and zero unnamed interactive controls in the inspected scans.
- Settings opened through a real background mouse click and exposed the local JSON picker, language mode, and tone controls.
- Playback state was exercised through the real page control and returned to a stable final step.
- Console errors and runtime exceptions were zero after the favicon repair.
- No unexpected network failure was observed in the inspected runtime batch.

The complete machine-readable summary is [runtime-audit.json](runtime-audit.json). Raw target receipts
and diagnostics remain in the task-owned private run directory and are not copied into this public
Oak Kay because they contain local process and path details.
