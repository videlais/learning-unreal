# Blueprint foundations: events, data and overlap filtering

This adapted lesson corrects conceptual ambiguities in the legacy BeginPlay and Actor Has Tag examples. The supplied synthetic graphs passed native Unreal 5.8.3 compilation and event-dispatch checks; interactive collision setup remains a separate check. See the [verification scope](compatibility.md).

## Prerequisites

- A saved playable level.
- A placed Actor Blueprint instance.
- Basic familiarity with the Blueprint Event Graph.

## Outcomes

You will distinguish execution wires from value wires, test an event path, and filter another Actor using its Actor Tags.

## 1. Events start execution

Event BeginPlay is called when an Actor begins play. That includes Actors spawned after gameplay has already started; it is not only a one-time broadcast to every Actor initially in a level.

Do not depend on an unspecified universal order between different Actors' BeginPlay events. If one Actor requires another to be ready, make that relationship explicit.

Connect BeginPlay's execution output to Print String's execution input. Compile, save, and test a placed instance. Use a distinctive message and inspect the Output Log.

**Check:** One placed active instance should run its own path. Two instances may each print the message.

**If the check fails:** Confirm the played map, the placed instance, the execution connection and compilation result before rewriting the graph.

## 2. Data wires do not execute actions

A Branch chooses its True or False execution path using a Boolean Condition.

Actor Has Tag is a pure query: it returns a Boolean indicating whether the supplied Actor has the requested Actor Tag. Its output is data, not an instruction that advances execution.

For the archived overlap example:

```text
Execution: overlap event -> Branch -> chosen action
Data:      Other Actor -> Actor Has Tag.Target
           Actor Has Tag.Return Value -> Branch.Condition
```

The query's Tag value must match the tag on the intended Actor. Actor Tags, Component Tags and Gameplay Tags are distinct mechanisms.

## 3. An overlap is not a hit

The archived figure uses ActorBeginOverlap. Its lesson title says "collision," but that does not make it a blocking-hit example.

- Overlap events report objects entering or leaving an overlapping region.
- Hit events describe blocking contact under the relevant collision and simulation conditions.
- Collision responses and event-generation settings determine which notifications are possible.

When using a component overlap event, multiple overlapping components may produce multiple notifications. Add a guard or track state when the desired behavior is once per logical interaction.

## 4. Reconstruct the missing context

The existing screenshot stops after Branch's True output. It cannot establish what action was connected beyond the crop.

The browser pilot deliberately adds a Print String action as a teaching extension, not as a recovered original node.

Before importing any browser-generated graph text into Unreal:

1. Confirm the destination Blueprint class and graph type.
2. Provide required variables, components, functions and assets.
3. Inspect pasted nodes for missing references.
4. Compile and save.
5. Run both the tagged and untagged overlap cases.

The browser can display a graph but does not compile or execute Unreal behavior.

## Independent exercise

Temporarily print different messages on the True and False paths. Predict the result for a tagged Actor, an untagged Actor, and an Actor with only a Component Tag.

Remove temporary debug output after explaining the results.

## Original sources

- [Original BeginPlay lesson](03-blueprint-fundamentals/unreal-blueprints-reacting-to-the-beginning-of-play-beginplay.md)
- [Original Actor Has Tag lesson](04-events-and-interaction/unreal-example-branch-on-collision-actor-has-tag.md)
- [Blueprint browser lab](../examples/index.html)
