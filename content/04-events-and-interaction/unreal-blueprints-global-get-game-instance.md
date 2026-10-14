# Unreal: Blueprints: Global: Get Game Instance

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

A Game Instance acts as a Blueprint for the game. It is created when the game is created and ends when the game ends. As a Blueprint, if it has any instance editable variables, these can be accessed.

As a global Blueprint, it can be accessed using the **Get Game Instance** node.

## *Why Game Instance?*

It is helpful to remember that Unreal the game engine was created as part of Unreal (1998) the game. It was originally created as a single- and multi-player experience. There needed to be some "manager" code to keep track of things like score and other data. Game Instance became how more modern projects kept track of data across levels.
