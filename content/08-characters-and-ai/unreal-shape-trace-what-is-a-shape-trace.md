# Unreal: Shape Trace: What is a shape trace?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

We can think of perception in games as coming from two main categories:

- Overlap/Collision: Some actor is touching another actor.
- Line Trace: Some actor is "facing" another in a line-of-sight.

For most cases, those two categories can help us. However, we might want a "shape" of a trace rather than a single line itself. we can think of this as increasing the "width" of a line using some trace. Instead of single small laser shot, we are making a larger "beam" to potentially intersect with more things.

## *Why would we need a shape trace?*

A shape trace is very useful in situations where we want things like a larger projectile or for a wide range of perception of some actor, being able to "see" across some larger area than a single point for the line trace.

![Screenshot of Box Trace By Channel sequence.](../media/Screenshot%202025-11-08%20at%206.31.38%E2%80%AFPM.png)

*Figure: Screenshot of Box Trace By Channel sequence.*
