# Unreal: Blueprints: Reviewing Blueprints

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

## *What is a blueprint?*

In Unreal, we can convert a static actor into a dynamic, scriptable object. We call this process creating a *blueprint*. When we create a Blueprint, we replace the original actor with a new once created from a copy we make in the Content Drawer.

Every Blueprint allows us to write code. In the language Blueprints, code is represented visually using nodes. A node can have an execution pin, connecting one to another, and input and output pins. To share data between nodes, we connect the output pin of one node to the input node of another.

A group of nodes is called a sequence. The movement across a sequence is called a *flow*.

We can control the flow of nodes using nodes like Branch and Do N to create more complex sequences.

## Adding Variables

Many Blueprints allows us to add variables. These are values either used in the sequences of nodes in the Blueprint or shared with other code. If the value is shared, it is called *instance editable* because the copy (instance) of it can be edited by other code.

One of the ways actors communicate is through changing the values of instance editable variables.

## Blueprints are Classes

Every Blueprint is based on a *class*. In Unreal, everything is something. This means when we work on an Actor Blueprint, it is an Actor. When we edit a Level Blueprint, it is a Level.

When Unreal performs most acts, it works with classes it knows. This includes classes like Actor, Character, Level, and Game Instance. These are all built-in classes. When we create a Blueprint, we are creating a class based on another class.

## Casting To Classes

In Unreal, we often perform the act of *casting to* some class. What this means is that we take a class Unreal knows about and then use our own based on those built-in classes. For example, we often cast from a Character to a Player Character. We also cast from Game Instance to something like Global Data.
