# Unreal: Animations: Blend Spaces: Example: (1) New Animation Blueprint, Same Velocity

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

A Blend Space replaces a State Machine in the Animation Blueprint.

To use it, let's create a new Animation Blueprint.

## Create a new Animation Blueprint named *ComplexAnim*

In the Content Drawer, click on Add.

Create a new Animation Blueprint.

Name this Blueprint "ComplexAnim".

Double-click this file to open it.

Create a new variable named "Velocity" of the Float data type.

Click COMPILE.

## Get the Player Character from The **Try Get Pawn Owner**

Let's pull off the Return Value output pin of the Try Get Pawn Owner node.

From this, cast to the player character Blueprint. (In this example, it is Third Person.)

![Screenshot of Cast To from Try Get Pawn Owner.](../media/UnrealEditor_3JWHiyobp1.png)

*Figure: Screenshot of Cast To from Try Get Pawn Owner.*

Connect the output Exec pin of the Event Blueprint Update Animation to the input Exec pin of the Cast To node.

Once connected, the Anim Graph will show the flow between them.

![Screenshot of connected flow from event to Cast To node.](../media/UnrealEditor_57GGvVLDbd.png)

Figure: Screenshot of connected flow from event to Cast To node.

Pull off the "As..." output pin, search for "Get Velocity" under the Transformation section. (You may need to scroll down.)

![Screenshot highlighting the "Get Velocity" node.](../media/soDcE9SvKM.png)

*Figure: Screenshot highlighting the "Get Velocity" node.*

Drag and drop the Velocity variable onto the Event Graph.

Choose to Set Velocity.

![Screenshot of sequence in progress with Set Velocity variable node.](../media/UnrealEditor_hgoJQSZVYF.png)

*Figure: Screenshot of sequence in progress with Set Velocity variable node.*

There is one more node we need.

The *Get Velocity* node returns a Vector across the x-axis, y-axis, and z-axis. We don't want that. We want the *length*, or the combined values of all of them.

Pull off the Return Value output pin of the *Get Velocity* and search for *Vector Length*:

![Screenshot of the context search for "Vector Length".](../media/GQawqlqtbx.png)

*Figure: Screenshot of the context search for "Vector Length".*

This may seem strange, as we used Get Velocity and then linked this to Vector Length. The reason for this is because *Get Velocity* returns a vector (x, y, and z) based on the transformation. (Every actor has a Transform component containing its Location. Accessing anything having to do with transformation is connected to the *transform* component.) We need a single value.

By getting the length of the vector, it will perform the mathematics needed to create a single value based on the vector.

Pull off the return value of the Vector Length and then connect it to the Set Velocity node.

Pull off the output Exec pin of the Cast To node and connect it to the input Exec pin of the Set Velocity node.

![Screenshot of sequence from event to Set Velocity node.](../media/UnrealEditor_oe3GT44AKx.png)

*Figure: Screenshot of sequence from event to Set Velocity node.*
