# Unreal: Blueprints: Understanding Events

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Unreal is event-based. This means Blueprints receive data based on when an event happens. An example event is BeginPlay, which happens when some data is loaded by Unreal. This happens for the Game Instance, Level, and for every Actor, if they are listening for the event.

## Events pass data

When an event happens, Unreal passes data to the event. Often, Unreal will pass data in the classes it knows about. For example, if a collision or overlap happens, it passes the Actor class. Usually, if we want something to happen with some code, we cast from the Actor into some other, new class we have defined.
