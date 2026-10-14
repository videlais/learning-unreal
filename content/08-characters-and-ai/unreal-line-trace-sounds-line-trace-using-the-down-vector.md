# Unreal: Line Trace + Sounds: Line Trace Using the "Down" Vector

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Along with the **Get Forward Vector**, where a actor is "facing" in the world, we can also access its "Up" vector as well using the **Get Up Vector**. By multiplying this vector by a negative number, we can "flip" a line trace to below a mesh.

We know a line trace needs at least two things:

- Where to start.
- Where to end.

Let's start with the beginning. The *Start* will be the **Get Actor Location**. The *End* will be **Get Up Vector** and then multiplied by -200 for "down" and then down by 200 units. This is then added to the **Get Actor Location** value, pointing the line trace below the mesh itself.

![Screenshot of Line Trace "down" from a mesh.](../media/Screenshot%202025-11-05%20at%208.03.41%E2%80%AFPM.png)

*Figure: Screenshot of Line Trace "down" from a mesh.*
