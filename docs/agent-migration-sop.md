# SOP: NexusUI Classic to Vue Migration

This SOP is a strict, checklist-based process for agents migrating legacy NexusUI projects into Vue using `@japentaca/nexus-vue`.

## Scope

Use this SOP when replacing legacy `new Nexus.*` UI bootstrapping in classic web projects.

## Preconditions

- [ ] Migration target files are identified.
- [ ] Existing behavior is understood enough to preserve it.
- [ ] Wrapper API reference reviewed in `docs/components.md`.
- [ ] Playbook reviewed in `docs/agent-migration-playbook.md`.

## Step 1: Intake Inventory

Complete this table before code changes:

| Legacy File | Constructor | Target Wrapper | Options | Events | Imperative Calls |
|---|---|---|---|---|---|
| example.js | Nexus.Dial | Dial | size,min,max,step | change | none |

Checklist:

- [ ] All constructors listed.
- [ ] All options captured.
- [ ] All events captured.
- [ ] All imperative calls captured.

## Step 2: Migration Plan

Define migration boundaries and state strategy:

- [ ] Vue component(s) that will host migrated controls.
- [ ] Reactive state model for migrated values.
- [ ] Event routing plan (change/step/click/release).
- [ ] Any required component refs for imperative methods.

## Step 3: Implementation Rules

Mandatory rules:

- [ ] No direct `new Nexus.*` in migrated feature code.
- [ ] Use wrappers from `@japentaca/nexus-vue`.
- [ ] Preserve all options (`size`, `min`, `max`, `step`, `mode`, `interaction`, etc.).
- [ ] Preserve event behavior (`change`, `step`, and others where applicable).
- [ ] For `Dial`, `Slider`, `Number`, use `v-model` or `modelValue` pattern when two-way binding exists.
- [ ] Keep migration scoped to target feature; do not refactor unrelated areas.

## Step 4: Validation

Run and record results:

- [ ] `npm run build` passes.
- [ ] `npm run test:smoke` passes.
- [ ] No direct `new Nexus.*` remains in migrated feature scope.
- [ ] UI behavior parity manually spot-checked.

## Step 5: Delivery Report

Use this exact report format in PR/task output:

```
Migration Summary
- Target: [feature/module]
- Legacy constructors migrated: [list]
- Wrappers used: [list]

Parity Checks
- Options preserved: [yes/no + notes]
- Events preserved: [yes/no + notes]
- Imperative behavior preserved: [yes/no + notes]

Validation
- Build: [pass/fail]
- Smoke: [pass/fail]
- Leftovers: [none/list]

Risks
- [brief list]
```

## Definition of Done

- [ ] Behavior parity achieved for migrated scope.
- [ ] Build and smoke tests pass.
- [ ] Migration summary report delivered.
- [ ] Any leftover legacy Nexus code explicitly listed.
