# Unreal: HLOD: Using HLOD Volumes

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

### Creating HLOD Volumes

For precise control over clustering:

1.  In Place Actors panel, search for "HLOD"
2.  Drag Hierarchical LOD Volume into your level
3.  Scale and position the volume to encompass actors you want to cluster

### Using HLOD Volumes

1.  Place volumes around logical groups (buildings, forests, etc.)
2.  Actors inside a volume automatically cluster together
3.  Volumes override automatic clustering for their area
4.  Use multiple volumes for different sections of your level

### Volume Settings

Select an HLOD Volume and configure:

- HLOD Level: Which HLOD level this volume affects (0, 1, 2)
- Override Settings: Use volume-specific settings instead of global ones
