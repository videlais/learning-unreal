# Unreal: Line Trace + Sounds: What are we stepping on?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

A common usage of a line trace is to determine what the player character is stand on in any given moment.

Using a line trace, it may seem obvious that we can detect various things, but the results of a successful hit are somewhat limited in Unreal.

We can detect:

- Actor
- Component (as part of the actor)
- Bone (as part of skeletal mesh)

We can also gain access to:

- Location
- Impact Point (of hit)

Finally, we can gain access to one more important thing: Physical Material.

If the player-character is standing on something, they are potentially colliding with a mesh and a material. We cannot detect a material because the rendering (drawing to screen) system does not communicate with the physics and collision system. We *can* detect a physical material because it stores values about the physics system.

Let's put this another way: to detect what the player-character is standing on, we need to line trace "down" to a set physical material and then respond in some way such as playing a sound!
