# Signal Garden: beginner coursebook

Target: Unreal 5.8.3. The two synthetic Blueprint examples passed native checks, but a complete coursebook playthrough is still pending. Concepts are presented independently of precise menu positions; see the [verification scope](compatibility.md) before claiming a version-specific workflow.

Use the [reading path](README.md) alongside these labs. Preserve a separate checkpoint after each stage. Do not open the only copy of an older project in a newer engine.

## How to study

1. Read the outcome and prerequisites.
2. Predict what will happen before pressing Play.
3. Complete the smallest working example.
4. Compare your result with the observable check.
5. Change one thing and explain its effect.
6. Save a checkpoint and note any unresolved problems.

Use a **Blueprint Games project with a playable First Person or Third Person template** for the cumulative lab. The archive also includes Blank-template demonstrations; those are separate exercises, not a reason to switch the cumulative project midway.

Keep template-dependent assumptions explicit. Before interaction work, confirm which pawn is possessed, which camera is active and which input mapping context the template installs.

<a id="stage-1"></a>
## Stage 1: Orientation and project safety

**Prerequisites:** None beyond a machine meeting the chosen editor version's requirements.

**Outcome:** Create, save, close and reopen a project; distinguish a project, level, Actor and asset.

**Why:** Many apparent scripting failures are actually the wrong map, unsaved changes or the wrong project.

### Lab

1. Confirm the installed engine version in the editor and record it.
2. Create `SignalGarden` using the Blueprint template described above. Avoid optional asset packs for now.
3. Identify the viewport, Outliner, Details panel and Content Browser.
4. Save a working level with a distinct name, such as `L_SignalGarden`.
5. Play, stop, save all changed assets, close the editor and reopen the saved level.
6. Make a checkpoint copy while the editor is closed. Store it outside the active project directory.

**Expected result:** You reopen the intended level and can control the template player.

**Recovery:** If the wrong map opens, locate the saved level asset and open it explicitly. If controls fail, confirm the active GameMode and possessed pawn before changing input settings.

**Independent exercise:** Explain which files would be lost if you saved a level but not a modified Blueprint.

<a id="stage-2"></a>
## Stage 2: Actors, components and blockouts

**Prerequisites:** Stage 1.

**Outcome:** Build a readable route from primitive meshes and explain Actor/component ownership.

### Lab

1. Place a floor and two visibly different landmarks.
2. Adjust translation, rotation and scale one at a time. State the units and axes you are using.
3. Leave a clear route for the player; test it rather than judging only from the editor viewport.
4. Create an Actor Blueprint called `BP_SignalPad`.
5. Add a visible static mesh component and a Box Collision component. Make the collision box extend above the visible pad.
6. Place an instance in the level; identify the difference between editing the Blueprint defaults and editing that instance.
7. Save a checkpoint.

**Expected result:** The player can navigate the blockout and recognize the pad.

**Coordinate reminder:** Unreal's usual distance unit is the centimeter; rotation is expressed in degrees, and Z is up. Scale is a multiplier, not a distance. Start with simple known dimensions rather than changing every transform field at once.

**Recovery:** If the player is blocked unexpectedly, inspect collision shape and responses. If the pad is invisible, check the component's assigned mesh and its transform.

**Independent exercise:** Add a second instance and change only its scale. Explain what remains shared.

**Self-study checkpoint:** Save a working blockout and record the Blueprint behavior you can demonstrate.

<a id="stage-3"></a>
## Stage 3: Blueprint fundamentals and debugging

**Prerequisites:** Stage 2.

**Outcome:** Explain execution versus data flow and prove that an Actor's BeginPlay graph ran.

Read the [corrected foundation lesson](blueprint-foundations.md).

### Lab

1. Open `BP_SignalPad` and its Event Graph.
2. Connect Event BeginPlay's execution output to Print String's execution input.
3. Set a distinctive message: `Signal pad ready`. Enable printing to the Output Log.
4. Compile, save and Play with one placed pad.
5. Locate the message in the Output Log.
6. Add a second pad and predict how many messages will appear.
7. Inspect a breakpoint or execution highlighting while running, then remove the breakpoint.

**Expected result:** Each active pad instance runs its own BeginPlay path.

**Recovery:** If no message appears, verify that an instance is present in the played level, the execution wire is connected and the Blueprint compiled. Do not confuse editor preview with gameplay.

**Independent exercise:** Change the message per instance using an instance-editable String variable. Explain why setting a variable does not itself execute Print String.

**Important:** BeginPlay also applies to actors spawned during play. Do not rely on a universal order among different Actors' BeginPlay events.

<a id="stage-4"></a>
## Stage 4: Events, references and interaction

**Prerequisites:** Stage 3; basic Boolean values and Branch.

**Outcome:** Filter an overlap using the correct Actor reference and distinguish overlaps from hit events.

### Lab

1. Give the visitor Actor the **Actor Tag** `visitor`. For a template character, set it on the character Blueprint's Actor defaults, not on a mesh component.
2. Configure the pad's Box Collision to overlap the intended pawn channel and enable Generate Overlap Events. Confirm that the visitor's relevant collision component also participates in overlaps.
3. Use the Box component's Begin Overlap event. Its `Other Actor` is the Actor entering the region.
4. Connect the event execution pin to Branch.
5. Connect Other Actor to Actor Has Tag's Target. Set Tag to `visitor`.
6. Connect Actor Has Tag's Boolean return value to Branch's Condition.
7. Connect True to Print String with `Visitor detected`.
8. Walk into the box, leave and re-enter. Test an untagged Actor as a negative case.

**Expected result:** Tagged overlaps print the message; untagged overlaps do not.

**Recovery:** If every object passes, inspect the condition and Target connection. If nothing fires, examine collision responses and overlap-event settings on both sides. Multiple components can generate multiple overlap notifications; do not assume one event per logical visitor.

**Independent exercise:** Add a distinct False-path message temporarily, then explain both test cases.

**Next concepts:** Direct references are appropriate for a small known relationship. Use interfaces or dispatchers when several independent objects must communicate. Avoid replacing all communication with repeated world searches.

**Input bridge:** Before adding a key-based interaction, identify the active Enhanced Input Action and Mapping Context. First prove the input event reaches the possessed player; only then connect it to interaction logic.

<a id="stage-5"></a>
## Stage 5: Assets, materials and audio feedback

**Prerequisites:** Stage 4.

**Outcome:** Add clear visual and audio feedback without making external asset packs essential.

### Lab

1. Make a simple material for the pad with an obvious color.
2. Assign it to the pad mesh and test lighting from the player's viewpoint.
3. Record source and license for any imported model, texture or sound.
4. Add a short licensed sound to the successful interaction path.
5. Decide whether feedback should play at a world location or as non-spatial interface audio.
6. Test near/far audibility and prevent rapid accidental repetition where necessary.

**Expected result:** The player can identify a successful interaction without reading the Output Log.

**Recovery:** If an imported model is the wrong size, inspect import scale and world units. If audio is silent, test the asset directly, then inspect volume, attenuation and the chosen playback node.

**Independent exercise:** Disable the sound and check whether the visual feedback still communicates success.

<a id="stage-6"></a>
## Stage 6: Reusable logic and flow control

**Prerequisites:** Stages 3-5.

**Outcome:** Encapsulate repeated work and use bounded, understandable control flow.

### Lab

1. Create a non-latent function such as `DescribeSignal` that returns a message from a supplied value.
2. Use a Custom Event for an action sequence that may later involve timed behavior.
3. Add a one-time or cooldown guard to the pad's successful response.
4. For a timed reset, use an appropriate timer/event mechanism and store a handle when cancellation is needed.
5. Test repeated entry during the cooldown and after the reset.
6. Make a small array of messages; inspect its indices before reading an element.

**Expected result:** Repeated entry does not trigger uncontrolled feedback, and the guard resets predictably.

**Recovery:** If the reset never occurs, check the scheduled event, object lifetime and timer settings. If a loop hangs, stop and redesign it; a While Loop is not a way to wait for the next frame.

**Independent exercise:** Use a bounded For Loop to print three numbered messages. Explain why a long-running loop can block gameplay.

**Further reading:** Functions, macros, events, arrays, structs and data tables remain in the reading path. Their contexts and constraints are not interchangeable. Do not place latent nodes in an ordinary function.

**Function/event correction:** A function is not inherently private: a callable public Blueprint function can be invoked through a valid reference from another Blueprint. An event does not automatically run asynchronously. Event-driven execution may continue immediately; latent operations introduce waiting where their context permits it. An ordinary function can return values, while a Custom Event is not a replacement for a function's return-value contract.

<a id="stage-7"></a>
## Stage 7: Widgets, HUDs and menus

**Prerequisites:** Stage 6 and understanding object references.

**Outcome:** Display game state and distinguish widget creation, ownership and presentation.

### Lab

1. Create a Widget Blueprint named `WBP_SignalHUD` with a Text element.
2. Create the widget once from an appropriate player-owned context; supply the Owning Player.
3. Keep the returned widget reference and add it to the viewport.
4. Create a public update function on the widget that accepts a count and updates the Text element.
5. Increment a counter on successful pad interactions and call the widget update through a valid reference.
6. Initialize the display before the first interaction.
7. Add a separate menu experiment; explicitly set input mode, cursor visibility and focus when showing or hiding it.

**Expected result:** The initial count is visible, each accepted interaction updates it once, and closing a menu restores player control.

**Recovery:** If the display stays unchanged, check the stored widget reference and the event path. If the mouse or keyboard appears stuck, inspect input mode and focus instead of adding another widget.

**Independent exercise:** Compare an event-driven update with a property binding. Explain when either might be appropriate; do not assume all bindings are invalid.

**State boundary:** A GameInstance survives ordinary level transitions; placed level Actors do not. Choose ownership from lifetime requirements, not because a variable is called "global."

<a id="stage-8"></a>
## Stage 8: Characters, animation, traces and AI

**Prerequisites:** Stages 4, 6 and 7. Work in small checkpoint experiments before combining features.

**Outcome:** Build a tested interaction loop with explicit detection and movement failure cases.

### Lab A: Trace-based interaction

1. Confirm the possessed character and active input mapping.
2. On a deliberate interaction event, obtain the camera's world location and forward direction.
3. Define End as Start plus Forward Vector multiplied by a clearly named interaction distance.
4. Run a Line Trace by Channel using an appropriate channel; ignore the owning player where required.
5. Temporarily enable trace debug drawing.
6. Check the hit result before accessing Hit Actor. Filter it with a known interface or Actor Tag.
7. Test a valid target, an invalid target and no hit.

**Expected result:** Only a valid hit within range triggers the interaction.

**Recovery:** If the trace points incorrectly, inspect world versus local space. If it hits the player, check ignored Actors. If it passes through the pad, inspect its trace-channel collision response.

### Lab B: Animation

1. Use a character and skeleton known to be compatible.
2. Confirm the Animation Blueprint is assigned to the intended mesh.
3. Update movement state from a valid character reference.
4. Use speed and suitable transition conditions to move between idle and locomotion.
5. Test start, stop and any airborne state your example uses.

**Expected result:** Animation follows actual movement rather than a disconnected test value.

### Lab C: Navigation

1. Create a separate AI-controlled character experiment.
2. Add navigation coverage over a simple walkable area and inspect the generated navigation.
3. Verify possession and the selected AI Controller.
4. Request a move to a reachable destination.
5. Handle success and failure visibly; test an unreachable destination too.

**Expected result:** The AI moves only when possession and navigation are valid, and a failed request is observable.

**Independent exercise:** Describe why trace detection, animation and AI navigation are separate systems even when they influence the same character.

**Optional extension:** Revisit the archive's sockets, attack and damage lessons only after input and detection work. Never infer a complete damage system from a graph screenshot alone.

<a id="stage-9"></a>
## Stage 9: Landscapes, foliage and World Partition

**Prerequisites:** A working small gameplay loop; Stage 8.

**Outcome:** Expand the environment without losing the ability to test and diagnose it.

### Lab

1. Preserve the small working map as a regression test.
2. Create a separate environment experiment with deliberately modest landscape dimensions.
3. Test one landscape material layer before introducing several.
4. Add sparse foliage; inspect collision and player readability.
5. Investigate World Partition in a suitable separate map before migrating the working map.
6. Document map setup, streaming settings and any always-loaded requirements.
7. Test behavior from the actual player start, not only from an editor camera.

**Expected result:** The expanded space remains navigable and the interaction works where expected.

**Recovery:** If painting fails, check material/layer setup. If content disappears unexpectedly, distinguish editor loading from runtime streaming and inspect the Actor's loading settings.

**Independent exercise:** Explain when a small course project does not need World Partition.

<a id="stage-10"></a>
## Stage 10: Optimization, packaging and portfolio

**Prerequisites:** Stages 1-9 or an intentionally smaller completed project.

**Outcome:** Measure a bottleneck, produce a testable deliverable and explain your contribution.

### Lab

1. Define a target device and an observable performance goal before optimizing.
2. Reproduce a slow or expensive scene and record relevant profiling measurements.
3. Change one suspected cause; compare measurements under the same conditions.
4. Confirm correct startup map and packaged asset references.
5. Check the exact engine version's platform toolchain requirements.
6. Create a development package and run it outside the editor.
7. Test input, interaction, HUD, audio, restart and exit.
8. Prepare a short portfolio description: goal, your work, evidence, limitations and asset credits.
9. Archive the final source separately from the packaged build.

**Expected result:** Someone else can launch the deliverable and understand its purpose without your editor session.

**Recovery:** If a packaged build differs from Play in Editor, inspect logs, startup maps, asset cooking and platform dependencies. Do not label a ZIP of source files as a packaged playable build.

**Independent exercise:** Present one before/after measurement and one remaining limitation. A candid limitation is stronger evidence than an unsupported optimization claim.

## Completion checklist

- [ ] Each completed stage has a saved checkpoint.
- [ ] The interaction has positive and negative tests.
- [ ] Graph instructions include dependencies, not only pictures.
- [ ] Asset source and license information is recorded.
- [ ] Editor/version-specific checks are recorded before claiming Unreal 5.8 compatibility.
- [ ] Publication has received separate rights and privacy approval.
