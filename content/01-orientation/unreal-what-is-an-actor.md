# Unreal: What is an Actor?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

There are multiple core concepts in Unreal that can help people get started with it.

**A level is some collection of things describing a virtual, physical, or designed space. When we create in Unreal, we are creating within a level.**

Each "thing" in a level is called an *actor*. Borrowing from theater terms, Unreal describes an actor as "any object placed into a Level."

**Objects, collection of values, are called actors in Unreal. They are placed in levels.**

The "collection of values" as part of an actor is called a *component*. Whenever we want to work with a system, such as having something drawn to a screen, we use a component as the "bridge" between us and the system in Unreal.

**To help divide up how to do things, components can themselves hold components. This allows access to sub-systems.**

Sometimes, we want to draw shapes to screens. Other times, we want to be very specific on how things are drawn. Unreal allows us to add components to components, narrowing down into sub-systems of larger systems.

Put all together, we have the following:

**Levels are composed of Actors; Actors are composed of components; components can be composed of sub-components.**
