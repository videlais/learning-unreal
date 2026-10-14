# Unreal: What is Hierarchical Level of Detail (HLOD)?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Hierarchical Level of Detail (HLOD) is an optimization technique that combines multiple static mesh actors into simplified proxy meshes at a distance. Instead of rendering hundreds of individual objects far away, Unreal renders a single, optimized mesh, significantly reducing draw calls and improving performance.

A common example is how open worlds were created for *The Legend of Zelda: Breath of the Wild* (2017). At a far distance, complex meshes were combined into a single, flat image, reducing the amount of calculations needed.

Every static mesh has access to its individual HLOD details:

![Screenshot showing an individual static mesh actor's HLOD settings.](../media/Screenshot%202025-11-09%20at%206.28.53%E2%80%AFPM.png)

*Figure: Screenshot showing an individual static mesh actor's HLOD settings.*

## *How does HLOD work?*

1.  Close range: Individual meshes render with full detail.
2.  Medium range: Meshes transition to lower LODs (standard LOD system).
3.  Far range: Multiple meshes combine into a single HLOD proxy mesh.
4.  Very far range: HLOD meshes use their own LOD chain for further optimization.

### Performance Benefits

- Reduces draw calls: Instead of 100 draw calls, you might have 1.
- Lowers triangle count: Simplified geometry at distance.
- Decreases material complexity: Combined materials or simplified shaders.
- Improves culling efficiency: Larger bounding volumes cull more effectively.

## *How do I configure HLOD settings?*

Before using HLOD:

1.  Your level should contain static mesh actors (not movable).
2.  Meshes should have proper collision set up.
3.  Your level should be mostly finalized (HLOD regenerates when level changes).

### Enabling HLOD

1.  Open your level in the Unreal Editor.
2.  Go to Window → Hierarchical LOD Outliner.
3.  The HLOD Outliner window appears, showing your level's HLOD hierarchy.

![Screenshot showing HLOD clusters.](../media/Screenshot%202025-11-09%20at%206.46.15%E2%80%AFPM.png)*Figure: Screenshot showing HLOD clusters.*

### Understanding HLOD Levels

HLOD works in levels (clusters):

- HLOD Level 0: Combines nearby small objects
- HLOD Level 1: Combines HLOD0 clusters into larger groups
- HLOD Level 2: Further combines HLOD1 clusters for extreme distances

Each level represents a distance threshold where meshes combine.
