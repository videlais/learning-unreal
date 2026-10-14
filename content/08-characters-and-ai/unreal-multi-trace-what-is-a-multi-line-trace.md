# Unreal: Multi-Trace: What is a multi-line trace?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

In Unreal, the **Line Trace** nodes return the *first* result of a blocking hit. That is, the first thing that the line trace collide with will be returned.

We can also ask a line to return *all* results as the line passes through them up to its full length. This approach is named a *multi-line* trace. Rather than the first, it will continue and then collect everything it collides with.

![Screenshot of Multi-Line Trace by Channel.](../media/Screenshot%202025-11-08%20at%206.44.27%E2%80%AFPM.png)*Figure: Screenshot of Multi-Line Trace by Channel.*
