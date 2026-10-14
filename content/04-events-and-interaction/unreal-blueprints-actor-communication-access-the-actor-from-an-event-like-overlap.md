# Unreal: Blueprints: Actor Communication: Access the Actor from an Event (like Overlap)

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

One of the most common approaches for actor communication is to access some actor as a result of an event between them. The common example is an overlap. For both ActorBeginOverlap and ActorEndOverlap, the thing being overlapped is an *actor*, so we can access its value and then perform something on it.

We saw an example of this with the "bounce pad." We were able to pull off the event to access the actor and use the Get Actor Location node to access, add to its existing values, and then, working with the Set Actor Location node, change its values directly.

![Screenshot of accessing an actor as a result of an event, getting its values, and then changing them.](../media/UnrealEditor_KZ7VCSNwc6-2.png)

*Figure: Screenshot of accessing an actor as a result of an event, getting its values, and then changing them.*

**For any situation where one or more actors share an event, this is the easiest approach of actor communication.**
