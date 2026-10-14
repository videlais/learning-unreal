# Unreal: Landscape: Creating Landscape Materials

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

Landscape Materials are materials for blending texture (image) layers to create more visually complex terrains such as dirt, grass, and snow. Unlike standard materials that apply a single texture, landscape materials support layer blending for realistic, varied terrain.

They are a special type of material with multiple *layers*. They use textures-as-materials and normal maps.

To be able to "paint" with a landscape material, you need both the thing to paint (material) and its normal map (how light interacts with it). You will also define multiple layers and combine this data.

**It is *strongly* recommended to create a new landscape material.**

## Create a New Landscape Material

### Step 1: Select the Textures

1.  Determine ahead of time which textures (NOT materials) you want to use.
2.  Record or otherwise remember which textures AND their normal maps. **You must have a normal map per texture you want to use.**

### Step 2: Create the Material

1.  In Content Browser, click on "Add".
2.  Search for "Material".
3.  Select Material.

### Step 3: Add a *Landscape Layer Blend* Node

1.  Right-click in the material graph.
2.  Search for Landscape Layer Blend.
3.  Add the node.

![Search for "Landscape Layer Blend"](../media/Screenshot%202025-11-16%20at%206.19.01%E2%80%AFPM.png)

*Figure: Search for "Landscape Layer Blend"*

### Step 4: Configure Layers in the Blend Node

1.  Select the Landscape Layer Blend node.
2.  In Details panel, find Layers array.
3.  For every texture to be created, click + (Plus) to add layers.
4.  Add layers for each surface type (typically 3-4 to start). For example, use a naming scheme like the following:
    - Layer 0: Grass
    - Layer 1: Dirt
    - Layer 2: Rock
    - Layer 3: Snow (optional)

For each layer:

- Layer Name: Give it a descriptive name (Grass, Dirt, Rock, etc.)
- Blend Type: Choose how this layer blends:
  - LB Weight Blend: Standard blending (most common)
  - LB Alpha Blend: Alpha-based blending
  - LB Height Blend: Blends based on height values (more realistic)

![Screenshot highlighting the input pins matching the array of layer names.](../media/Screenshot%202025-11-16%20at%206.26.18%E2%80%AFPM.png)

*Figure: Screenshot highlighting the input pins matching the array of layer names.*

### Step 5: Create Texture Samples for Texture + Normal Map

For each layer, you'll need textures. Let's create a layer:

- Add texture samples to the graph. (Right-click → Texture Sample (for base color texture).

![Search for Texture Sample.](../media/Screenshot%202025-11-16%20at%206.23.38%E2%80%AFPM.png)

*Figure: Search for Texture Sample.*

- Select the texture sample.
- In its Details, select the texture to use.

![Screenshot highlighting texture selection for sample.](../media/Screenshot%202025-11-16%20at%206.30.52%E2%80%AFPM.png)*Figure: Screenshot highlighting texture selection for sample.*

- Add another Texture Sample for its Normal Map.
- Select the Normal Map matching the previous Texture Sample.

![Screenshot showing two Texture Samples.](../media/Screenshot%202025-11-16%20at%206.40.00%E2%80%AFPM.png)

*Figure: Screenshot showing two Texture Samples.*

### Step 6: Connect Texture Samples to Initial Layer Blend

- Take the RGB output from each texture and connect it to the layer input of the Layer Blend.
- Take the output pin of the Layer Blend and connect it to the Base Color output.

![Screenshot showing connected Texture Sample to Layer Blend and output Base Color.](../media/Screenshot%202025-11-16%20at%206.43.19%E2%80%AFPM.png)

*Figure: Screenshot showing connected Texture Sample to Layer Blend and output Base Color.*

### Step 7: Blend Normal Maps

- Select the Landscape Layer Blend.
- In Windows, use CTRL + C to copy. (On Mac, use Command + C.)
- Paste a copy of the Layer Blend.

![Screenshot showing two Landscape Layer Blend nodes.](../media/Screenshot%202025-11-16%20at%206.48.18%E2%80%AFPM.png)

*Figure: Screenshot showing two Landscape Layer Blend nodes.*

- From each normal map Texture Sample, connect it to the same input pin.
- Connect the output pin to the Normal output.

![Screenshot showing connected Texture Sample and Normal Map nodes.](../media/Screenshot%202025-11-16%20at%206.52.20%E2%80%AFPM.png)

*Figure: Screenshot showing connected Texture Sample and Normal Map nodes.*

## Step 8: Save the material

The preview of the material will show it as full black. This is because the Texture Samples are blending together.

![Screenshot showing the "Apply" and "Save" options.](../media/Screenshot%202025-11-16%20at%206.54.11%E2%80%AFPM.png)

Figure: Screenshot showing the "Apply" and "Save" options.
