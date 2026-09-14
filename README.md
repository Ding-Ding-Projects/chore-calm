# Chore Calm

Chore Calm is a calm chore-companion concept. It is intended to teach routines, break work into
small steps, and remind without yelling, threats, shame, or language such as “I will move out
because of this.”

## Concept scope

ADHD can make chores harder through initiation, working memory, sequencing, sensory load, and
recovery from mistakes. A calm companion can teach a routine, offer one next step, remind gently,
and help someone recover after a missed step. It cannot control another person's anger, predict
another person's reaction, or make a difficult home situation safe. It is not medical treatment,
does not diagnose ADHD, and does not replace professional, social, or emergency support.

廣東話講，ADHD 可以令家務難開始、難記住步驟、難安排次序、難承受感官負荷，做錯之後亦可能
難以重新整理再試。平靜嘅助手可以教你一個流程、一次提醒一小步，亦可以陪你由錯誤中復原。
但係，助手控制唔到另一個人會唔會發脾氣，亦唔係醫療治療，唔會取代專業支援。

## Build

The repository is dependency-free and offline-friendly. From a fresh Windows checkout, run:

```bat
.\build.bat --run
```

The command validates the repository contract, counts source lines, stages the root page, local
mascot assets, documentation, social preview, and commit-bound build provenance in `build\site`,
and opens the generated folder when `--run` is supplied. The local build is verified, but the
public URL remains unverified until the GitHub Pages workflow completes.

The installer route is documented for contract completeness, but an installer is not applicable
to this static documentation concept. See `build-installer.bat` for the honest no-installer result.

## Public landing page

Expected URL, not yet published or verified: [Chore Calm landing page](https://Ding-Ding-Projects.github.io/chore-calm/).

The link is a replaceable placeholder. It must not be presented as live until a real GitHub Pages
deployment and its URL have been verified.

## Documentation

- [Documentation index](docs/README.md)
- [Chore coaching concept](docs/features/chore-coaching.md)
- [Universal feature coverage inventory](docs/coverage/universal-feature-coverage.md)
- [Roadmap](ROADMAP.md)
- [Handoff](HANDOFF.md)

## Current evidence boundary

The integrated `main` candidate contains the public page, local mascot assets, product-specific
social preview, design handoff, build provenance, documentation, and Pages workflow. Local build
and strict source validation pass. Built-artifact interaction proof, real captures, the published
URL, and remote workflow success remain open.
