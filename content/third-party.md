# Third-party notices

The browser lab uses these locally bundled, MIT-licensed renderers:

- [ueblueprint 3.0.0](https://github.com/barsdeveloper/ueblueprint), with its [MIT license](../vendor/ueblueprint/LICENSE) and bundled font assets.
- [Klee](https://github.com/Joined-Forces/klee), pinned at `3c694f280ea1702624f81e7b0d20b9292d635cc5`, with its [MIT license](../vendor/klee/LICENSE).

Roboto font assets retain their [Apache 2.0 license](../vendor/ueblueprint/Roboto-LICENSE). Google/Lit license comments embedded in the upstream renderer are retained in the browser bundle.

Klee is an experimental comparison; clipping and upstream canvas warnings are not treated as evidence of graph correctness.

The site builder uses [Marked](https://github.com/markedjs/marked) and [sanitize-html](https://github.com/apostrophecms/sanitize-html); these execute only during the Bun build, not in the deployed browser.

Screenshots illustrate Epic Games' Unreal Editor. They are not a redistribution of Unreal Engine or a claim of affiliation with Epic Games. No unsupported blanket license is assigned to third-party material.
