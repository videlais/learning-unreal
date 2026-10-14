# Unreal: Blueprints: Functions: Functions Versus Events

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Unreal is event-driven. This means most of the functionality written in Unreal is responding to events such as player input or physics interactions. This does not mean functions, which act similar to events in many ways, do not have a place.

## *Do you care about the result?*

When comparing functions and events as possible solutions to accomplishing some goal in Unreal, consider the following question: do you care about the result? Functions are sub-graphs. They are capable of performing calculations and tasks. The same could also be said of events. However, **only functions can return values**.

An event follows a "fire and forget" model of interactivity. Data can be passed along with an event, but the calling context does not care about what happens as a result. There could be hundreds of actors listening for an event or none. It has no way of knowing.

Functions, on the other hand, will always return back to the calling context.

## Importance of timing

Functionality will always stop until the called function is finished. This means a function will always be *synchronous*. Events, however, are always asynchronous: there may be many, one, or no functionality listening for the event.

Functions and Events

| Aspect                        | Function    | Event        |
|-------------------------------|-------------|--------------|
| Input                         | Yes         | Yes          |
| Output                        | Yes         | Yes          |
| Variables                     | Local       | None         |
| Callable by another Blueprint | No          | Yes          |
| Temporality                   | Synchronous | Asynchronous |
