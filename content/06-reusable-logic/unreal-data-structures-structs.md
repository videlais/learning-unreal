# Unreal: Data Structures: Structs

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Borrowed from C into C++ into Blueprints is the data structure of a **struct**.

**A struct (structure) is a custom data type for grouping related values together.**

We have already seen examples of how Unreal uses structs in the form of "breaking." For example, a Vector is a kind of struct in Unreal. We can "break" it to allow for inputting one axis, (x, y, or z) instead of all values. This is also true of other things like AI Perception and other functionality. If you can "break" the result, it is a struct.

## *Why use a struct?*

In complex games, we often want to group values together such as character statistics, item data, or quest information. Through making a structure, we can make all of the values one "group" as a unit and update data as needed.

## Defining a new struct

To create a new struct, we need to add a "Structure" blueprint with its own variables to a project.

In the Content Drawer, click on Add and then search for "Structure".

![Screenshot showing adding a "Structure" Blueprint.](../media/Screenshot%202025-11-08%20at%207.35.02%E2%80%AFPM.png)

*Figure: Screenshot showing adding a "Structure" Blueprint.*

Once created, the new data type can be named. (In this example, the name "Statistics" is used.)

![Screenshot of Statistics structure.](../media/Screenshot%202025-11-08%20at%207.37.36%E2%80%AFPM.png)

*Figure: Screenshot of Statistics structure.*

When editing a Structure, new variables can be added.

![Screenshot of updating a Statistics example.](../media/Screenshot%202025-11-08%20at%207.39.06%E2%80%AFPM.png)

*Figure: Screenshot of updating a Statistics example.*

When using numerical values, ranges can also be defined.

![Screenshot of values with ranges.](../media/Screenshot%202025-11-08%20at%207.47.20%E2%80%AFPM.png)

*Figure: Screenshot of values with ranges.*

## *What is "Save Game"?*

One of the common ways to use a structure is as a save file. We can define the names and types of values we want and then create a structure for each "file" for a player.

For more information, [see the page on the **Save Game** and **Load Game** functionality.](https://dev.epicgames.com/documentation/en-us/unreal-engine/saving-and-loading-your-game-in-unreal-engine)

## Using Character Statistics

Assume there is a structure named Statistics with the following variables:

- Health (0 to 100)
- Mana (0 to 100)

Once a Structure is defined, it can be used as a data type in other Blueprints.

![Screenshot of the use of a "Statistics" data structure.](../media/Screenshot%202025-11-08%20at%207.54.14%E2%80%AFPM.png)

*Figure: Screenshot of the use of a "Statistics" data structure.*
