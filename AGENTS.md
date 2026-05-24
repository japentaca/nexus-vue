# Agent Instructions For Nexus Migration

If you are an AI coding agent working in this repository, use this process for migration tasks:

1. Read `docs/agent-migration-sop.md` before editing code.
2. Use `docs/agent-migration-playbook.md` for deeper mapping and examples.
3. Convert legacy `new Nexus.*` usage to wrappers from `@japentaca/nexus-vue`.
4. Preserve options and event behavior.
5. Prefer declarative Vue bindings; avoid direct DOM bootstrapping for migrated areas.
6. Validate with:
   - `npm run build`
   - `npm run test:smoke`

Reference API details in `docs/components.md`.
