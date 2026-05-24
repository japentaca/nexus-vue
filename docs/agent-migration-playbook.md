# Agent Migration Playbook: NexusUI Classic to Vue

This guide defines a repeatable process for AI agents to migrate legacy NexusUI web projects (plain HTML/JS) into Vue projects using `@japentaca/nexus-vue`.

For strict execution with checklists and delivery format, use `docs/agent-migration-sop.md`.

## Goal

Convert a legacy UI that uses `new Nexus.*(...)` into Vue components from this library, while preserving behavior and event flow.

## Inputs Required

Before editing code, collect:

1. Legacy files where Nexus instances are created.
2. All constructors used (`Nexus.Dial`, `Nexus.Slider`, etc.).
3. Per-instance options (`size`, `min`, `max`, `mode`, etc.).
4. Event handlers (`on('change')`, `on('step')`, `on('click')`, `on('release')`).
5. Imperative calls (`turnOn`, `turnOff`, `toggleKey`, `setAllSliders`, etc.).

## Component Mapping

Use this mapping first:

- `Nexus.Button` -> `Button`
- `Nexus.Toggle` -> `Toggle`
- `Nexus.Dial` -> `Dial`
- `Nexus.Slider` -> `Slider`
- `Nexus.Number` -> `Number`
- `Nexus.TextButton` -> `TextButton`
- `Nexus.Position` -> `Position`
- `Nexus.Pan` -> `Pan`
- `Nexus.Pan2D` -> `Pan2D`
- `Nexus.Envelope` -> `Envelope`
- `Nexus.Matrix` -> `Matrix`
- `Nexus.Sequencer` -> `Sequencer`
- `Nexus.Select` -> `Select`
- `Nexus.Radio` or `Nexus.RadioButton` -> `Radio`
- `Nexus.Multislider` -> `Multislider`
- `Nexus.Piano` -> `Piano`
- `Nexus.Meter` -> `Meter`
- `Nexus.Oscilloscope` -> `Oscilloscope`
- `Nexus.Spectrogram` -> `Spectrogram`
- `Nexus.Tilt` -> `Tilt`

Reference details: `docs/components.md`.

## Migration Rules

1. Do not instantiate `new Nexus.*` directly in migrated feature components.
2. Replace direct event listeners with Vue events:
   - `on('change', fn)` -> `@change="fn"`
   - `on('step', fn)` -> `@step="fn"`
3. For numeric controls (`Dial`, `Slider`, `Number`), prefer `v-model` or `:modelValue` + `@update:modelValue`.
4. Preserve previous ranges and options (`min`, `max`, `step`, `mode`, `interaction`, etc.).
5. Keep wrapper usage declarative; use imperative refs only when required.
6. When imperative behavior is required, use component refs and exposed methods.

## Step-by-Step Agent Workflow

### 1) Audit Legacy Usage

- Build an inventory table with one row per Nexus instance:
  - source file
  - constructor name
  - target wrapper
  - options
  - events
  - imperative methods

### 2) Create Vue Migration Plan

- Define target Vue component boundaries.
- Define reactive state shape for all migrated controls.
- Define event-to-action mapping in Vue methods/composables.

### 3) Port Markup

- Replace legacy mount containers with wrapper tags.
- Add explicit props for each preserved option.
- Wire emitted events to Vue handlers.

### 4) Port Behavior

- Move old callback logic into Vue methods.
- Move shared mutable state into refs/reactive/composables.
- Add `v-model` where bidirectional numeric control is needed.

### 5) Remove Legacy Nexus Bootstrapping

- Delete `new Nexus.*` blocks from migrated feature areas.
- Delete obsolete DOM query code that existed only for legacy mount points.

### 6) Validate

- Run build: `npm run build`.
- Run smoke tests: `npm run test:smoke`.
- Add/adjust smoke tests when user journeys changed.

## Definition of Done

A migration task is done only when:

1. No direct `new Nexus.*` remains in migrated feature code.
2. Legacy behavior is preserved for options and events.
3. Build passes.
4. Smoke tests pass.
5. README/docs are updated if API usage changed.

## Common Pitfalls

1. Losing legacy option values during component replacement.
2. Migrating event names incorrectly (`step` vs `change`).
3. Re-introducing imperative global DOM wiring.
4. Not testing keyboard/mouse interaction parity for controls.

## Prompt Template For Agents

Use this template when assigning migration work to an agent:

```
Migrate legacy NexusUI usage in [target files] to @japentaca/nexus-vue wrappers.

Requirements:
1) Preserve all options and event behavior.
2) Replace direct new Nexus.* instantiation with Vue wrapper components.
3) Use modelValue pattern for Dial/Slider/Number when two-way binding exists.
4) Keep changes scoped to migrated feature only.
5) Run npm run build and npm run test:smoke.
6) Report:
   - migrated constructors and target wrappers
   - behavior parity checks
   - any non-migrated leftovers
```
