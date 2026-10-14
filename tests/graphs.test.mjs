import { test, expect } from 'bun:test';
import { graphText, examples } from '../examples/graphs.mjs';

test('fixtures have declared counts, unique pins and valid link targets', () => {
  for (const key of Object.keys(examples)) {
    const text = graphText(key);
    expect((text.match(/^Begin Object/gm) ?? []).length).toBe(examples[key].nodes);
    const pins = [...text.matchAll(/PinId=([A-F0-9]{32})/g)].map(match => match[1]);
    expect(new Set(pins).size).toBe(pins.length);
    const targets = [...text.matchAll(/K2Node_\w+ ([A-F0-9]{32})/g)].map(match => match[1]);
    expect(targets.length / 2).toBe(examples[key].links);
    for (const target of targets) expect(pins).toContain(target);
  }
});

test('form values cannot inject new objects into serialized graph text', () => {
  const text = graphText('beginplay', { message: 'Hello "visitor"\nBegin Object' });
  expect(text).toContain('Hello \\"visitor\\"\\nBegin Object');
  expect((text.match(/^Begin Object/gm) ?? []).length).toBe(2);
});

test('invalid graph and oversized inputs fail explicitly', () => {
  expect(() => graphText('unknown')).toThrow('Unknown example');
  expect(() => graphText('overlap', { tag: 'x'.repeat(65) })).toThrow('at most');
  expect(() => graphText('beginplay', { message: null })).toThrow('Message');
});
