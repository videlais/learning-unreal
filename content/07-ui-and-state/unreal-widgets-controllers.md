# Unreal: Widgets: Controllers

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

In cases where an actor might move or otherwise take input of some kind, Unreal needs to know where this input is coming from internally. Should it expect input from swipes? Keyboard? Physical game controllers? In other words, what is “controlling” some actor? In Unreal, this a type of controller.

In Unreal, anything controlled is based somehow on a *controller*. For example, if a player is pressing a button and an actor is moving as a result, that’s a controller. If an enemy character is moving around on the screen, that’s also a controller.

**A controller answers the question: "Where is input coming from?"** There is always at least one controller, but it can be cast into different types depending on what is currently going on in a level.

## Player Controller or AI Controller

While the class **Controller** is generic on purpose, it is a parent of two sub-classes used in design within Unreal and Blueprints: Player Controller and AI Controller. In all cases where the player is pressing buttons in some way to influence how a character is moving onscreen, that is the use of Player Controller. In other cases where an enemy is dynamically moving around, that is the use of the AI Controller.

## We need to know it exists, but we don’t do much with it

Only in very special cases do designers ever interact with controllers. In most cases, we use nodes like "Get Player Controller" because we need to let Unreal know where input is coming from for an action such as switching input modes. Beyond that, we rarely, if anything, interact with it.
