# Unreal: Line Trace: Seeing a line trace

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

### Blueprint Setup

In your player character's Blueprint, we'll create a system that continuously scans for enemies in front of the player using raycasts.

### Event Tick Implementation

Start by adding the Event Tick node to your Blueprint's Event Graph. This ensures our enemy detection runs every frame, providing real-time awareness of nearby threats.

From the Tick event, add a Line Trace by Channel node. Configure the trace parameters as follows:

- Start Location: Use Get Actor Location from your player character to establish the raycast origin point. This ensures the trace begins from the player's current position.
- End Location: Calculate the end point by taking the player's forward vector and multiplying it by your desired detection range (e.g., 1000 units). Use Get Actor Forward Vector, multiply by a float value representing range, then add this to the start location using Vector + Vector.
- Trace Channel: Set this to Visibility or create a custom collision channel specifically for enemy detection. The Visibility channel works well for line-of-sight checks.
- Ignore Self: true (checked)

![Screenshot showing node sequence to draw the line trace every frame.](../media/Screenshot%202025-11-03%20at%206.28.24%E2%80%AFPM.png)

*Figure: Screenshot showing node sequence to draw the line trace every frame.*

### Processing Hit Results

Connect the Hit Result output to a Break Hit Result node to access detailed collision information. The key outputs we need are:

- Hit Actor: The actor that was struck by the raycast.
- Hit: Boolean indicating if anything was hit.
- Impact Point: Exact location where the ray intersected.

![Screenshot printing what line trace is hitting.](../media/Screenshot%202025-11-03%20at%206.39.58%E2%80%AFPM.png)

*Figure: Screenshot printing what line trace is hitting.*

### Enemy Tag Verification

Use a Branch node connected to the Hit output. If true, check if the hit actor has the "enemy" tag using Actor Has Tag. Input "enemy" as the tag name.

![Using Actor Has Tag to determine if "enemy" is being hit by the line trace.](../media/Screenshot%202025-11-03%20at%206.43.06%E2%80%AFPM.png)

*Figure: Using Actor Has Tag to determine if "enemy" is being hit by the line trace.*
