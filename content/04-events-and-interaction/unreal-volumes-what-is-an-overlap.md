# Unreal: Volumes: What is an overlap?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

When working with a game engine, most contain functionality for testing if one or more objects *overlap* in space.

**An overlap happens when the position of one object, based on its scale, intersect with the position of another, based on its scale.**

We have already seen an example of this in the overlapping of the subtractive brush with the additive brush. Because they were overlapping, one "carved out" the other.

## *Why do we care about an overlap?*

If two actors overlap is core to many common mechanics found in video games:

- Collection (such as coins, health, etc.)
- Dangers (such as spikes, fire, etc.)
- Spatial Interactions
  - Having a character walk up to to some object (such as a screen in-game).
  - Pushing an object (such as a block).
