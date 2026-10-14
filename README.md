# Learning Unreal

A self-study introduction to Unreal Engine, organized around a small cumulative project: **Signal Garden**.

- [Learning path](content/README.md): ten stages, with 164 legacy lessons.
- [Coursebook](content/coursebook.md): outcomes, labs, observable checks and recovery steps.
- [Blueprint foundations](content/blueprint-foundations.md): events, execution/data flow and tag filtering.
- [Interactive Blueprint lab](examples/index.html): two synthetic teaching graphs.
- [Unreal 5.8 verification](content/compatibility.md): tested scope, evidence and remaining gates.
- [Publication policy](content/publication.md) and [third-party notices](content/third-party.md).

## Organization

`content/` combines the former reading path, lesson archive and approved instructional images. Lessons use topic-based stage folders; shared screenshots live in `content/media/`. `examples/` contains browser examples and a reproducible Unreal smoke-test project. Tooling is in `tools/`; no original export is needed.

Historical attendance, assessment metadata, institutional/LMS records, unlicensed attachments and missing original project ZIPs are not part of this public edition. Legacy lessons retain an explicit verification notice rather than claiming that older screenshots were captured in 5.8.

## Bun workflow

Requires **Bun 1.4.3**. Node.js, npm and Pandoc are not required.

```sh
bun install --frozen-lockfile
bun test
bun run build
bun run validate
bun start
```

Open <http://127.0.0.1:4173>. Preview serves only the generated static site.

```sh
bunx playwright install chromium
bun run test:browser
```

Browser tests use the `/learning-unreal/` project-site prefix and forbid remote requests. The lab runs entirely from bundled local assets.

## Unreal checks

See [verification instructions](examples/unreal/README.md). These require the locally installed Unreal editor and platform build tools; they do not run on GitHub's Pages runner. Browser rendering alone is not Unreal compilation or gameplay certification.

## GitHub Pages

The Pages workflow installs locked Bun dependencies, runs unit tests, builds static HTML, validates all local links, and runs Chromium checks before uploading **only `dist/`**. Pull requests build and test without deployment; pushes to `main` deploy.

Repository Settings -> Pages -> Build and deployment must use **GitHub Actions**.

Published site: <https://videlais.github.io/learning-unreal/>.
