# Unreal: Assets: Reference Viewer

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

The Reference Viewer is your primary tool for understanding asset dependencies and finding unused content.

### Opening the Reference Viewer

1.  Right-click on any asset in the Content Browser.
2.  Select Reference Viewer from the context menu.
3.  The viewer shows a graph of what the asset references (dependencies) and what references it (referencers).

![Screenshot showing Reference Viewer option from right-click menu.](../media/Screenshot%202025-11-09%20at%205.17.26%E2%80%AFPM.png)

*Figure: Screenshot showing Reference Viewer option from right-click menu.*

### Understanding the Graph

- Left side (blue arrows): Assets that reference the selected asset.
- Right side (red arrows): Assets that the selected asset depends on.
- No left-side connections: Potentially unused asset (nothing references it).

![Screenshot of Reference Viewer for example widget blueprint and use in level.](../media/Screenshot%202025-11-09%20at%205.18.29%E2%80%AFPM.png)

*Figure: Screenshot of Reference Viewer for example widget blueprint and use in level.*

### Finding Assets with No References

If an asset has no blue arrows pointing to it from the left, it may be unused. However, verify that it's not:

- Referenced by Blueprint code dynamically.
- Loaded by name in C++.
- Used in a level you haven't checked.
