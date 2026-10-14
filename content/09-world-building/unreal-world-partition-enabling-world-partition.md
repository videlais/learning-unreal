# Unreal: World Partition: Enabling World Partition

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

The World Partition is enabled through use of *Streaming*.

## Enabling World Partition

Open Window -\> World Settings.

![Screenshot of Window -\> World Settings.](../media/xbitb43Mnb.png)

*Figure: Screenshot of Window -\> World Settings.*

Enable Streaming.

![Screenshot of "Enable Streaming" in the World Settings.](../media/UnrealEditor_zwZOPLBdIz.png)

*Figure: Screenshot of "Enable Streaming" in the World Settings.*

## Showing Region

Enabling streaming in a world will remove all actors by unloading them.

![Screenshot showing unloaded actors.](../media/UnrealEditor_B0yzXWdmJe.png)

*Figure: Screenshot showing unloaded actors.*

The actors must be loaded by *region*.

When using the World Partition, actors will only be loaded when asked in the Editor. This keeps the memory usage lower in larger, open world spaces.

To see the actors, open the World Partition Editor.

Go to Window -\> Window -\> World Partition -\> World Partition Editor. (This will generally open next to Details.)

![Screenshot of World Partition Editor window.](../media/UnrealEditor_IKIP7qtwYs.png)

*Figure: Screenshot of World Partition Editor window.*

Click and drag a selection of the actors to add.

![Screenshot of selected actors.](../media/UnrealEditor_ExpqvhIzVZ.png)

*Figure: Screenshot of selected actors.*

Right-click and choose "Load region from selection."

![Screenshot showing the "Load Region From Selection" option.](../media/gVIlxQgNF3.png)

*Figure: Screenshot showing the "Load Region From Selection" option.*

This will load the actors into the world.

![Screenshot showing the loaded region in the World Partition.](../media/UnrealEditor_buziBVdJk2.png)

*Figure: Screenshot showing the loaded region in the World Partition.*
