# Unreal 5.8 compatibility

The local installation reports **Unreal Engine 5.8.3**, release changelist **58210709**, compatible changelist **55116800**.

## Scope

The public edition targets Unreal 5.8. Browser/site checks verify deployment and rendering, not Unreal execution. The reproducible [engine checks](../examples/unreal/README.md) test the two supplied synthetic Blueprint fixtures separately.

## Verified in the installed engine

On 14 October 2026 (UTC), the native checks passed in Unreal **5.8.3 on macOS**:

| Fixture | Native import | Compile | Engine export/reimport | Execution checks |
| --- | --- | --- | --- | --- |
| BeginPlay -> Print String | 2 nodes, 1 link | 0 errors, 0 warnings | Compiled again | Two Actor instances printed |
| Actor overlap -> tag query -> Branch | 4 nodes, 4 links | 0 errors, 0 warnings | Compiled again | Actor Tag accepted; untagged and Component Tag rejected |

The importer refreshes nodes to supply missing engine defaults before compilation. The browser-generated minimal text is not a complete authoritative engine export.

[Native results and source hashes](unreal-verification.json) record the exact checked code. Validation rejects stale evidence after a fixture or commandlet change. [Browser results](browser-verification.json) separately record rendering, editing/export, responsive framing and zero remote requests.

**The entire course is not certified.** Its 164 legacy lessons include UI, animation, AI, landscapes, World Partition and packaging workflows that require individual editor reproduction. Older screenshots are marked as legacy; they have not been represented as 5.8 captures.

## Missing evidence

- The original five project ZIPs were removed. They cannot be opened, upgraded, compiled or packaged here.
- The cumulative Signal Garden coursebook still needs a complete interactive playthrough in a playable template.
- Synthetic graph import/compile checks do not establish collision setup, actual overlap generation, viewport input or packaged gameplay.
- Platform packaging, third-party plugin compatibility and asset migration remain separate gates.

## Certification checklist

For each legacy lesson, reproduce its instructions in 5.8.3, record project/template and dependencies, compile and save changed Blueprints, exercise positive/negative cases, and capture updated screenshots only when needed. For shipping lessons, package and launch on the stated target platform.

Keep unchecked lessons pending. Do not infer certification from an installed engine, matching node names, successful browser parsing or a changed project version string.
