# Unreal: Interactions: Sockets: What is a socket?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Nearly every form of mesh in Unreal can used as part of a concept known as a **socket**. There are often situations where one mesh needs to be attached to another in some way. For example, a door might have hinges or, in the case of a skeletal mesh, a character animation might need to attach a sword or other weapon. In these cases, Unreal interprets the connection point as “glue” between the two meshes. When one moves, the other will translate the motion across the point to the other.

Every skeletal mesh is composed of many connected meshes. This means, to attach something to a skeletal mesh, it needs a *socket*.

## *What is a socket?*

A *socket* is an added point on a skeletal mesh where something can be "socketed." In Unreal, we often want to have one mesh move with another. In Unreal, when a mesh is *socketed* to another, they move together.

To use a socket, there are two parts. First, we must add a socket to a skeletal mesh. Second, we must add a mesh component to an actor and set its "parent socket" to the socket point of the parent.

Sockets are commonly used to attach:

- **Weapons** to a character's hand.
- **Hats or helmets** to a character's head.
- **Props** like backpacks, shields, or accessories.
- **Effects** like particle systems or lights.
- **Other meshes** to create modular objects.
