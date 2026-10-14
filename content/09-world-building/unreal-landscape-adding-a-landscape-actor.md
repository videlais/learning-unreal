# Unreal: Landscape: Adding a Landscape Actor

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

With the Landscape Mode selected, we need to create a landscape asset to hold the data and act as an actor in the level.

As part of creating a landscape, we also define important details:

- World Partition Grid Size.
- World Partition Region Size.
- Defining a default material.

This define how big the landscape will be and also allow us to define other landscapes around as part of a larger world.

## *How do I create a new landscape?*

![Screenshot showing default landscape grid and space values.](../media/Screenshot%202025-11-08%20at%208.18.07%E2%80%AFPM.png)

*Figure: Screenshot showing default landscape grid and space values.*

Once created, a new actor will be added to the level.

![Screenshot showing added options for working with landscape and new actor.](../media/Screenshot%202025-11-08%20at%208.23.14%E2%80%AFPM.png)

*Figure: Screenshot showing added options for working with landscape and new actor.*

## Setting a Default Material

By default, Unreal will assign a grid pattern as the material for the landscape. This can be helpful to see the changes but is rarely the best choice aesthetically. Through setting a material, it will be assigned -- and repeated -- across the landscape size.

![Screenshot of selecting a default material for the landscape.](../media/Screenshot%202025-11-08%20at%2010.24.31%E2%80%AFPM.png)

*Figure: Screenshot of selecting a default material for the landscape.*
