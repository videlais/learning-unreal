const zero = '00000000000000000000000000000000';
const guid = number => number.toString(16).toUpperCase().padStart(32, '0');
const quote = value => `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\n', '\\n').replaceAll('\r', '')}"`;

function pin(id, name, category, { output = false, object = 'None', linked = [], value, hidden = false, friendly } = {}) {
  const fields = [
    `PinId=${guid(id)}`, `PinName=${quote(name)}`,
    ...(friendly ? [`PinFriendlyName=${quote(friendly)}`] : []),
    ...(output ? ['Direction="EGPD_Output"'] : []),
    `PinType.PinCategory=${quote(category)}`, `PinType.PinSubCategory=${quote(category === 'real' ? 'float' : '')}`,
    `PinType.PinSubCategoryObject=${object}`, 'PinType.PinSubCategoryMemberReference=()',
    'PinType.PinValueType=()', 'PinType.ContainerType=None', 'PinType.bIsReference=False',
    'PinType.bIsConst=False', 'PinType.bIsWeakPointer=False', 'PinType.bIsUObjectWrapper=False',
    'PinType.bSerializeAsSinglePrecisionFloat=False',
    ...(linked.length ? [`LinkedTo=(${linked.map(([node, target]) => `${node} ${guid(target)},`).join('')})`] : []),
    ...(value !== undefined ? [`DefaultValue=${quote(value)}`] : []),
    `PersistentGuid=${zero}`, `bHidden=${hidden ? 'True' : 'False'}`, 'bNotConnectable=False',
    'bDefaultValueIsReadOnly=False', 'bDefaultValueIsIgnored=False', 'bAdvancedView=False', 'bOrphanedPin=False',
  ];
  return `   CustomProperties Pin (${fields.join(',')},)`;
}

function node(type, name, x, y, id, properties, pins) {
  return [
    `Begin Object Class=/Script/BlueprintGraph.${type} Name=${quote(name)}`,
    ...properties.map(property => `   ${property}`),
    `   NodePosX=${x}`, `   NodePosY=${y}`, `   NodeGuid=${guid(id)}`,
    ...pins, 'End Object',
  ].join('\n');
}

const actorClass = `/Script/CoreUObject.Class'"/Script/Engine.Actor"'`;
function printNode(name, x, inputId, textId, linked, message) {
  return node('K2Node_CallFunction', name, x, 0, inputId + 1000, [
    'FunctionReference=(MemberParent=/Script/CoreUObject.Class\'"/Script/Engine.KismetSystemLibrary"\',MemberName="PrintString")',
    'AdvancedPinDisplay=Hidden',
  ], [
    pin(inputId, 'execute', 'exec', { linked }),
    pin(inputId + 100, 'then', 'exec', { output: true }),
    pin(textId, 'InString', 'string', { value: message }),
    pin(textId + 1, 'bPrintToScreen', 'bool', { value: 'true' }),
    pin(textId + 2, 'bPrintToLog', 'bool', { value: 'true' }),
    pin(textId + 3, 'Duration', 'real', { value: '2.0' }),
  ]);
}

export const examples = {
  beginplay: {
    title: 'BeginPlay to Print String',
    nodes: 2, links: 1,
    description: 'Each placed Actor instance announces that it has begun play. Later-spawned Actors also have their own BeginPlay.',
    expected: 'In Unreal, each active instance prints the chosen message when its BeginPlay path runs.',
    source: '../content/03-blueprint-fundamentals/unreal-blueprints-reacting-to-the-beginning-of-play-beginplay.md',
    screenshot: '../content/media/UnrealEditor_Biyhv0DM5Z.png',
    dependencies: 'Actor Blueprint Event Graph. No project-specific variable or asset is required. Do not add a duplicate BeginPlay event to a graph that already has one.',
  },
  overlap: {
    title: 'Actor overlap, tag query and Branch',
    nodes: 4, links: 4,
    description: 'White execution wires reach Branch; the Other Actor reference and Boolean tag result supply data. Print String is an intentional teaching extension beyond the original crop.',
    expected: 'In Unreal, overlapping Actors with the chosen Actor Tag take the True path. Overlap settings must be configured on the relevant components.',
    source: '../content/04-events-and-interaction/unreal-example-branch-on-collision-actor-has-tag.md',
    screenshot: '../content/media/UnrealEditor_ASwXZEyLsr.png',
    dependencies: 'Actor Blueprint Event Graph; a placed instance with overlapping collision; Generate Overlap Events and compatible responses on both participants. The tag belongs to the other Actor, not merely a component.',
  },
};

export function graphText(example, { message = 'Signal pad ready', tag = 'ball' } = {}) {
  if (!examples[example]) throw new Error(`Unknown example: ${example}`);
  if (typeof message !== 'string' || typeof tag !== 'string' || message.length > 200 || tag.length > 64) {
    throw new Error('Message must be at most 200 characters and tag at most 64 characters.');
  }
  if (example === 'beginplay') return [
    node('K2Node_Event', 'K2Node_Event_0', 0, 0, 100, [
      `EventReference=(MemberParent=${actorClass},MemberName="ReceiveBeginPlay")`,
      'bOverrideFunction=True',
    ], [pin(1, 'then', 'exec', { output: true, linked: [['K2Node_CallFunction_0', 2]] })]),
    printNode('K2Node_CallFunction_0', 360, 2, 4, [['K2Node_Event_0', 1]], message),
  ].join('\n') + '\n';
  return [
    node('K2Node_Event', 'K2Node_Event_0', 0, 0, 100, [
      `EventReference=(MemberParent=${actorClass},MemberName="ReceiveActorBeginOverlap")`,
      'bOverrideFunction=True',
    ], [
      pin(1, 'then', 'exec', { output: true, linked: [['K2Node_IfThenElse_0', 5]] }),
      pin(2, 'OtherActor', 'object', { output: true, object: actorClass, linked: [['K2Node_CallFunction_0', 3]] }),
    ]),
    node('K2Node_CallFunction', 'K2Node_CallFunction_0', 320, 180, 200, [
      'bIsPureFunc=True', 'bIsConstFunc=True',
      `FunctionReference=(MemberParent=${actorClass},MemberName="ActorHasTag")`,
    ], [
      pin(3, 'self', 'object', { friendly: 'Target', object: actorClass, linked: [['K2Node_Event_0', 2]] }),
      pin(4, 'ReturnValue', 'bool', { output: true, linked: [['K2Node_IfThenElse_0', 6]] }),
      pin(10, 'Tag', 'name', { value: tag }),
    ]),
    node('K2Node_IfThenElse', 'K2Node_IfThenElse_0', 660, 0, 300, [], [
      pin(5, 'execute', 'exec', { linked: [['K2Node_Event_0', 1]] }),
      pin(6, 'Condition', 'bool', { linked: [['K2Node_CallFunction_0', 4]] }),
      pin(7, 'then', 'exec', { friendly: 'True', output: true, linked: [['K2Node_CallFunction_1', 8]] }),
      pin(9, 'else', 'exec', { friendly: 'False', output: true }),
    ]),
    printNode('K2Node_CallFunction_1', 980, 8, 20, [['K2Node_IfThenElse_0', 7]], message),
  ].join('\n') + '\n';
}
