# Unreal: Blueprints: Actor Communication: Save to variable and access its values

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

**If one or more actors DO share an event, the easiest approach is to access the actor directly.**

**If one or more actors DO NOT share an event, you can create a variable, save the actor's value, and access its values.**

## Save to Variable

Let's consider an example of a video game where a player-character walks up to a door. To have the door open automatically, a trigger box could have a variable with the value of the door(s). When the player-character overlaps with the trigger box, it could use its variable to affect other actors.

![Screenshot showing an example of one actor being affected by another when not sharing an event.](../media/UnrealEditor_KupmB1dli4-1.png)

*Figure: Screenshot showing an example of one actor being affected by another when not sharing an event.*

**Variables can be very useful in cases where one or more actors should affect others but they are not "connected" by pre-defined events in a level.**
