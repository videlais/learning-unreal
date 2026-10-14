# Unreal: Characters: What data do we have access to?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

The Character class has access to the CharacterMovement component. This is a very useful class with multiple nodes we can use to determine what is happening with a character in a level.

Every Actor also has access to a number of nodes. (Remember, a Character is an Actor!)

## Boolean Nodes

- **IsFalling**: Returns a boolean value (`True` or `False`) indicating if the character is in the "falling" movement mode.
- **IsMovingOnGround**: Returns `True` if the character is currently walking or running on a solid surface.
- **IsCrouching**: Returns `True` if the character is currently in a crouched state.
- **IsFlying**: Returns `True` if the character is currently flying.

## Transform (from Actor)

- **Get Actor Location:** Gets the world-space position of the Actor's root component.
- **Set Actor Location:** Moves the Actor to a new world-space location. You can specify whether to sweep (handle collisions) or teleport.
- **Get Actor Rotation:** Gets the world-space rotation of the Actor's root component.
- **Set Actor Rotation:** Sets the Actor's world-space rotation.
- **Get Velocity:** Returns the velocity of the Actor's root component. (Characters have CharacterMovement component!)
- **Get Physics Linear Velocity:** Retrieves the linear velocity of a physics-enabled component.
