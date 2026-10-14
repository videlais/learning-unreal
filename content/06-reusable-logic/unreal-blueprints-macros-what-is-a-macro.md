# Unreal: Blueprints: Macros: What is a macro?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

We now know what a function is, it's a sub-graph! Having this knowledge, allows us to move to another, connected topic: macros.

During our programming, it can become frustrating to write the same sequences over and over. An example in our work is the sequence to create a widget, add it to Viewport, and change input mode. Later, we then reverse this sequence.

In Unreal, there is a concept used for these repetitive tasks named **macros.**

Nearly every blueprint supports creating them. They are [described in the documentation](https://docs.unrealengine.com/5.1/en-US/macros-in-unreal-engine/) as:

> **Blueprint Macros**, or **Macros**, are essentially the same as collapsed graphs of nodes. They have an entry point and exit point designated by tunnel nodes. Each tunnel can have any number of execution or data pins which are visible on the macro node when used in other Blueprints and graphs.

Macros work like events, in that there is an entry and exit, but they are *repeatable sequences*.

Whenever we have a sequence of nodes in a graph where we might to use the same nodes multiple times by supplying no or only a few inputs, we can select them and use the "Collapse to Macro" from the right-click menu.
