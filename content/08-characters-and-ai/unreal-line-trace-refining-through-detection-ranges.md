# Unreal: Line Trace: Refining through detection ranges

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Using a line trace every frame is *really* expensive computationally. Instead, we want to walk around with a "detection" sphere around the player character.

![Screenshot of added sphere collision.](../media/Screenshot%202025-11-03%20at%207.07.05%E2%80%AFPM.png)

*Figure: Screenshot of added sphere collision.*

We now need to test when an overlap happens with another actor.

When the play character moves within range of some actor with the tag "interaction", we want to detect that.

![Screenshot of detecting "interaction" tag.](../media/Screenshot%202025-11-03%20at%207.18.31%E2%80%AFPM.png)

*Figure: Screenshot of detecting "interaction" tag.*

## Creating a *Line Trace to Range* function

![Screenshot showing a Line Trace to Range function.](../media/Screenshot%202025-11-03%20at%207.23.32%E2%80%AFPM.png)

*Figure: Screenshot showing a Line Trace to Range function.*

## Refining Event Tick

![Screenshot of refined Event Tick.](../media/Screenshot%202025-11-03%20at%207.25.00%E2%80%AFPM.png)

*Figure: Screenshot of refined Event Tick.*
