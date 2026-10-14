# Unreal: Blueprints: Actor Lifecycle

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

## Ticking

Unreal understands the updating of actors as a **tick**. Every actor in a level *ticks* (is updated) based on either their default or as setup by a developer. This means an actor can be updated every frame or on some other interval as needed.

The Unreal documentation [describes actors and ticking as either being individual or grouped together](https://dev.epicgames.com/documentation/en-us/unreal-engine/actor-ticking-in-unreal-engine?application_version=5.6):

> Actors and components can be set up to tick each frame, at set minimum time intervals, or not at all. In addition, they can be grouped together at different phases in the engine's per-frame update loop, and can be individually instructed to wait for specific ticks to complete before beginning.

Ticking starts after a specific events does in Unreal: **BeginPlay**.

## Actor Lifecycle

Every actor undergoes three common parts of their lifecycle:

- BeginPlay
- Tick
- EndPlay

When the level starts, BeginPlay also starts. (This is the equivalent of **Start()** in Unity.)

As the Actor is updated, its Tick happens. (This is similar to Unity’s **Update()**.)

Should the level be unloaded or the Actor destroyed, its EndPlay will happen.
