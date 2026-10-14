# Unreal: Geometry: What is geometry, and how is different from other shapes?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

It can seem slightly confusing at first why Unreal has a section of the Place Actors tab for "Shapes", which contains an option for a Cube, and "Geometry", which also contains an option for a Box

The difference is in how Unreal considers these types of actors.

- **A shape is a static mesh. It *might* be something a character interacts with in some way like walking on, climbing up, or pushing around within a space.**
- **Any geometry is background for the level. When we use something from the Geometry category, we are actually using a *brush* to "paint" something into the level like a wall, passageway, or ceiling.**

This difference is important because we often want to "draw" shapes in a level to create structures such as walls and a connecting passageway for a character to use. During play, a character might bump into the wall, but they will rarely interact with it in important ways. For those purposes, we use a static mesh from the Shapes category.

***In a simple way: a shape might move. Geometry does not ever move.***

***In a more complex way: static meshes interact with more systems than geometric actors do.***
