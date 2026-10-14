# Unreal: Asset Audit Window

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

he Asset Audit tool provides detailed information about asset usage across your project.

### Opening Asset Audit

1.  Open Content Drawer.
2.  Select the folders you want to audit.
3.  Right-click on it and select Audit Assets.

![Screenshot showing "Audit Assets..." option in right-click menu.](../media/Screenshot%202025-11-09%20at%205.35.28%E2%80%AFPM.png)

*Figure: Screenshot showing "Audit Assets..." option in right-click menu.*

### Audit Results

The tool provides:

- List of all assets in selected folders.
- Size information for each asset.
- Reference counts.
- Memory usage estimates.
- Asset type categorization.

![Screenshot of Asset Audit window for folder.](../media/Screenshot%202025-11-09%20at%205.36.01%E2%80%AFPM.png)

*Figure: Screenshot of Asset Audit window for folder.*

### Filtering for Unused Assets

1.  Sort by References column (Name) (ascending).
2.  **Assets with 0 references are potentially unused.**
3.  Right-click to see options for fixing or removing references.

![Screenshot of Asset Audit. In the screenshot, the red are unused assets.](../media/Screenshot%202025-11-09%20at%205.51.47%E2%80%AFPM.png)

*Figure: Screenshot of Asset Audit. In the screenshot, the red are unused assets.*
