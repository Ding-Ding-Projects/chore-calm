# Documentation index

This offline documentation set explains the Chore Calm concept and records the repository
contract. It uses ordinary English and Hong Kong-style Cantonese. The documents do not claim a
medical outcome, a live hosted page, or control over another person's anger.

## Feature documentation

- [Chore coaching concept](features/chore-coaching.md): scope, calm language, ADHD-related needs,
  safety boundaries, and accessible static-page equivalents.

The public marketing pages are also available as local, offline HTML routes:

- [How Chore Calm works](../how-it-works.html)
- [ADHD and chores](../adhd-and-chores.html)
- [The calm promise](../calm-promise.html)
- [Meet the chore companion](../about-robot.html)

See the [universal feature coverage inventory](coverage/universal-feature-coverage.md) for the
full surface-by-surface contract review. Static documentation is not treated as exempt. Where a
control cannot literally exist without an application runtime, the limitation and the closest
honest browser-local equivalent are recorded.

## Build notes

The repository has no third-party packages and no network requirement for local validation. Use
the root command from the README. The build stages the root page, local assets, documentation,
social preview, and commit-bound provenance into `build/site`. The published URL is
https://ding-ding-projects.github.io/chore-calm/ and its live response is verified.
