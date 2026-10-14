# Unreal: Assets: Size Map

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

The Size Map tool visualizes which assets consume the most disk space in your project.

### Opening the Size Map

1.  Open Content Drawer.
2.  Right-click on an asset.
3.  Click on Size Map.

![Screenshot of accessing Size Map tool.](../media/Screenshot%202025-11-09%20at%205.30.04%E2%80%AFPM.png)

*Figure: Screenshot of accessing Size Map tool.*

### Interpreting the Size Map

- Larger boxes = files taking up more space.
- Color coding typically indicates file types.
- Click boxes to drill down into folders.
- Hover over boxes to see exact file sizes.

![Screenshot example of Size Map for first person template.](../media/Screenshot%202025-11-09%20at%205.32.37%E2%80%AFPM.png)

*Figure: Screenshot example of Size Map for first person template.*

### Finding Large Unused Assets

1.  Use Size Map to identify your largest assets.
2.  Cross-reference with the Reference Viewer.
3.  Check if large assets are actually being used in your levels.
4.  Consider if high-resolution assets could be downscaled or replaced.
5.  Remove any larger, unused files.
