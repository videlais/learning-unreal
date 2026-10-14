# Unreal: Blueprints: Global: What is a Global Blueprint?

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

There are many cases when working with data in Unreal where we need the use the same functionality multiple times. To help with this, Unreal defines multiple global Blueprints.

- Player Controller: Represents the player's connection to the game and their input. Filters button presses into events.
- Game Instance: A persistent object that exists for the entire duration of the game or application.
- Game Mode: Global data but reset per level load. Think of it as tracking the scores in a single game of a sport but not a season of it.
- Player State: Stores information about a specific player that is relevant to other players, such as score or name.

## *When should I use Game Instance, Game Mode, or Player State?*

Do you need data to last the entire game regardless of level? You want Game Instance. There will only ever be one and it can be accessed anywhere.

Do you want to share data across a level but not across the game? You want Game Mode. This will be reset with every level load.

Do you want to hold data about a single player character? You want Player State. This can be used to access the data of a single player character when multiple player characters exist.

## *This seems really complicated!*

Just use Game Instance. Once created, it can be used everywhere.
