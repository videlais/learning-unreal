# Unreal: AI: AI Controller: What is AI Controller?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Back when we were working with widgets, we used something named Player Controller, "where the input is coming from."

**In Unreal, there are two types of controllers: player and AI**. If we, as players, are ever providing input for anything, we are using Player Controller. In all other cases, Unreal assumes, by default, to be using something named [AI Controller](https://dev.epicgames.com/documentation/en-us/unreal-engine/ai-controllers-in-unreal-engine).

## *What is an AI Controller?*

We often want non-player characters (NPCs) to interact with the world in some way. While we can set animations and potentially use movement components, to do anything vaguely complicated we need an AI Controller to do this. However, to use AI Controller, we need to not only define the "controller," where input is coming from, but also its own senses, what Unreal describes as types of perception.
