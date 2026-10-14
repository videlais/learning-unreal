import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { root } from './site.mjs';
import { graphText } from '../examples/graphs.mjs';

const engine = process.env.UE_ROOT;
if (!engine) throw new Error('Set UE_ROOT to the installed Unreal 5.8 directory');
const version = await Bun.file(path.join(engine, 'Engine/Build/Build.version')).json();
if (version.MajorVersion !== 5 || version.MinorVersion !== 8) throw new Error('These checks require Unreal 5.8');
if (process.platform !== 'darwin') throw new Error('This runner currently supports macOS; see examples/unreal/README.md for other platforms');
const project = path.join(root, 'examples/unreal/SignalGarden/SignalGarden.uproject');
const fixtures = path.join(root, 'examples/unreal/SignalGarden/Saved/Verification');
const reportPath = path.join(root, 'content/unreal-verification.json');
const sourceFiles = [
  'examples/graphs.mjs',
  'examples/unreal/SignalGarden/SignalGarden.uproject',
  'examples/unreal/SignalGarden/Config/DefaultEngine.ini',
  'examples/unreal/SignalGarden/Source/SignalGardenEditor.Target.cs',
  'examples/unreal/SignalGarden/Plugins/Verification/Verification.uplugin',
  'examples/unreal/SignalGarden/Plugins/Verification/Source/Verification/Verification.Build.cs',
  'examples/unreal/SignalGarden/Plugins/Verification/Source/Verification/Private/LearningCheckCommandlet.cpp',
];
const sourceHashes = {};
for (const filename of sourceFiles) {
  sourceHashes[filename] = new Bun.CryptoHasher('sha256').update(await Bun.file(path.join(root, filename)).arrayBuffer()).digest('hex');
}
const report = {
  checkedAt: new Date().toISOString(), version, platform: process.platform, passed: false, stage: 'building',
  sourceHashes,
  scope: ['Native clipboard import', 'Blueprint compilation', 'Engine export/reimport compilation', 'Two Actor BeginPlay dispatches', 'Overlap event dispatch: tagged, untagged, Component Tag only'],
  exclusions: ['Physical collision generation', 'Interactive PIE', 'Packaging', 'Legacy lesson reproduction', 'Removed project archives'],
};
await Bun.write(reportPath, JSON.stringify(report, null, 2) + '\n');
await mkdir(fixtures, { recursive: true });
for (const key of ['beginplay', 'overlap']) {
  await Bun.write(path.join(fixtures, `${key}-candidate.txt`), graphText(key, { message: 'LEARNING_CHECK', tag: 'visitor' }));
}
const build = Bun.spawn([
  path.join(engine, 'Engine/Build/BatchFiles/Mac/Build.sh'), 'SignalGardenEditor', 'Mac', 'Development',
  `-Project=${project}`, '-NoHotReload',
], { stdout: 'inherit', stderr: 'inherit' });
const buildExitCode = await build.exited;
if (buildExitCode !== 0) {
  report.stage = 'build failed';
  report.buildExitCode = buildExitCode;
  await Bun.write(reportPath, JSON.stringify(report, null, 2) + '\n');
  throw new Error('Unreal verification plugin build failed');
}
report.stage = 'running';
await Bun.write(reportPath, JSON.stringify(report, null, 2) + '\n');
const run = Bun.spawn([
  path.join(engine, 'Engine/Binaries/Mac/UnrealEditor-Cmd'), project,
  '-run=LearningCheck', `-Fixtures=${fixtures}`, '-unattended', '-nullrhi', '-nosplash', '-stdout',
  `-abslog=${path.join(fixtures, 'engine.log')}`,
], { stdout: 'inherit', stderr: 'inherit' });
const exitCode = await run.exited;
const log = await Bun.file(path.join(fixtures, 'engine.log')).text();
report.exitCode = exitCode;
report.passed = exitCode === 0 && log.includes('LEARNING_UNREAL_CHECKS_PASSED') && !/Error:|Fatal error:/.test(log);
report.stage = report.passed ? 'complete' : 'execution failed';
report.evidence = log.split(/\r?\n/).filter(line => line.includes('LogLearningCheck:')).map(line => line.replace(/^.*LogLearningCheck: /, ''));
await Bun.write(reportPath, JSON.stringify(report, null, 2) + '\n');
if (!report.passed) throw new Error(`Unreal checks failed; inspect ${path.join(fixtures, 'engine.log')}`);
console.log(JSON.stringify(report, null, 2));
