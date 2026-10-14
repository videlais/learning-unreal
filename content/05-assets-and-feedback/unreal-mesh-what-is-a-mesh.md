# Unreal: Mesh: What is a mesh?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

We have previously seen the term "static mesh" as something we can create using geometry brushes. We were able to convert them into a static mesh. As we move forward, let's look at the term more directly.

## *What is a mesh?*

In game programming, a *mesh* is some shape in a three-dimensional space. For example, a chair is a mesh. A wall is a mesh. The character being controlled by the player is often a mesh, too.

## *What is a static mesh?*

[A *static mesh,* as its name implies, is is "static."](https://dev.epicgames.com/documentation/en-us/unreal-engine/static-meshes) This means its shape will not change. This is very helpful to know, as Unreal can optimize how to draw things based on if they will change or not. Put another way, we use static meshes the most to create common things in projects in Unreal such as walls and floors.
