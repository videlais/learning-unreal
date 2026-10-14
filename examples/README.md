# Blueprint teaching examples

Open the [interactive lab](index.html) through the built site's preview or GitHub Pages.

## Implemented scope

- Two deterministic, synthetic Unreal clipboard graphs: BeginPlay -> Print String and Actor overlap -> tag query -> Branch.
- Message/tag customization and interactive ueblueprint node editing/export.
- An independent, explicitly experimental Klee comparison.
- Source lesson/screenshot links, dependencies, accessible text and static fallbacks.
- Browser node/link counts, complete primary graph framing, downloads, serialization/reparse and mobile-width checks.
- [Native Unreal import, compilation, round-trip and event-dispatch checks](unreal/README.md).

The graphs are authored teaching examples, not recovered `.uasset` exports. The overlap example adds Print String beyond the original screenshot crop. Browser parsing is not proof of Unreal behavior.

## Tool choice and licenses

ueblueprint 3.0.0 is the primary renderer. Klee is pinned to commit `3c694f280ea1702624f81e7b0d20b9292d635cc5`; it may clip nodes at default framing and emits upstream canvas warnings. It is not the production teaching view.

Both renderers, styles and fonts are served locally from the static site; no course content is sent to their websites. License notices accompany the deployed files. See [third-party notices](../content/third-party.md).

## Verification limits

An imported graph requires the appropriate Actor Blueprint Event Graph. Reconstruct engine defaults, inspect references, compile, save, and test positive/negative cases.

The native commandlet dispatches events and checks log output. It does not prove physical collision generation, interactive player input, a packaged build, arbitrary node-palette authoring, or support for every Unreal 5.8 node.

The [compatibility report](../content/compatibility.md) keeps untested course workflows explicit.

## Browser checks

```sh
bun run build
bunx playwright install chromium
bun run test:browser
```

Tests serve the production output under `/learning-unreal/`, so root-relative URLs and missing bundled resources cannot hide behind a local root preview. Electron is not required.
