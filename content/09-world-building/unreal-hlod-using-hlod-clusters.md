# Unreal: HLOD: Using HLOD Clusters

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Unreal can detect and generate the HLOD cluster data based on the static meshes in the level. However, this should be done as one of the *last* steps for a level. Any change to the position of a static mesh will require re-generating the proxy meshes!

### Automatic Cluster Generation

1.  In the HLOD Outliner, select your level.
2.  Click Generate Clusters button.
3.  Unreal analyzes your level and creates cluster groups.
4.  Clusters appear in the outliner hierarchy.

![Re-generate clusters.](../media/Screenshot%202025-11-09%20at%207.03.55%E2%80%AFPM.png)

*Figure: Re-generate clusters.*

### Building HLOD Proxies

After creating clusters:

1.  In HLOD Outliner, click Generate Proxy Meshes button.
2.  Unreal creates simplified proxy meshes for each cluster.
3.  This process can take time depending on complexity.
4.  Progress bar shows generation status.

![Screenshot showing "Generate Proxy Meshes" option.](../media/Screenshot%202025-11-09%20at%207.06.23%E2%80%AFPM.png)

*Figure: Screenshot showing "Generate Proxy Meshes" option.*

### Rebuilding HLOD

When you modify your level:

1.  Click Delete to remove old HLOD data.
2.  Click Generate Clusters to recreate clusters.
3.  Click Generate Proxy Meshes to rebuild proxies.
