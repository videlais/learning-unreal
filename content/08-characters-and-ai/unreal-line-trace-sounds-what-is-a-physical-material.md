# Unreal: Line Trace + Sounds: What is a physical material?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

We have seen a *material* as something covering a shape (mesh) defined by some space (volume). However, there are different types of materials. Sometimes we want to define the physics values connected to some material. [We call this a *physical material*](https://dev.epicgames.com/documentation/en-us/unreal-engine/physical-materials-in-unreal-engine). In Unreal, we define a physical material and then connect it to a material. This allows us to define physics values and then connect it to some mesh in a level.

## *How do we create a physical material?*

In the Content Drawer, click on "+Add".

Under Physics, select "Physical Material".

![Screenshot showing Physics -\> Physical Material.](../media/Screenshot%202025-11-05%20at%207.45.13%E2%80%AFPM.png)

*Figure: Screenshot showing Physics -\> Physical Material.*

Name this physical material "Concrete".

Double-click the file to open it.

![Screenshot of physical material values.](../media/Screenshot%202025-11-05%20at%207.46.31%E2%80%AFPM.png)

*Figure: Screenshot of physical material values.*

A physical material is a set of values.

To use a physical material, we attach it to a new or existing material

## *How do we use a physical material?*

In the first- or third-person template, click on the yellow, center mesh.

Double-click on its material.

![Screenshot of General section showing Physical Material asset area.](../media/Screenshot%202025-11-05%20at%208.30.38%E2%80%AFPM.png)

*Figure: Screenshot of General section showing Physical Material asset area.*

## Detecting a Physical Material through a Material

If a material uses a physical material, it can be detect using a line trace. Rather than the material itself, the hit will be on the connected physical material.
