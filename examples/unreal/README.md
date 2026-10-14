# Native Unreal checks

This disposable, asset-free editor project tests the exact two synthetic graphs supplied by the browser lab, using Unreal's native clipboard importer and Blueprint compiler.

On macOS, with Unreal 5.8 and Xcode installed:

```sh
UE_ROOT="/Users/Shared/Epic Games/UE_5.8" bun run test:unreal
```

The runner builds the editor-only Verification plugin, generates fixtures with distinctive log messages, then runs `LearningCheck` headlessly using NullRHI. It requires no Python or third-party asset pack.

Checks:

1. Import exact fixture text into an Actor Blueprint Event Graph.
2. Refresh nodes to reconstruct engine-supplied defaults; assert node/link counts and compile without errors.
3. Export through Unreal, import into a fresh Blueprint and compile again.
4. Spawn compiled Actors in a disposable game world and dispatch BeginPlay for two instances.
5. Dispatch the overlap event with an untagged Actor, a Component-Tag-only Actor, and an Actor tagged `visitor`; only the Actor Tag case may print.

Logs and authoritative engine round-trip text remain in the ignored `SignalGarden/Saved/Verification/` directory. A scoped, machine-readable result is written to `content/unreal-verification.json`.

This is **event dispatch**, not a physics overlap test, an interactive PIE playthrough or a packaged build. No claim is made that all course lessons work in 5.8. See the [compatibility scope](../../content/compatibility.md).

For another platform, build this project's editor target with that engine's platform build script, then run the editor commandlet with `-run=LearningCheck -Fixtures=<directory> -unattended -nullrhi -stdout`. The Bun runner deliberately rejects platforms it has not been tested on.

Source project: [GitHub examples](https://github.com/videlais/learning-unreal/tree/main/examples/unreal/SignalGarden).
