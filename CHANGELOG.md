# Changelog

All notable changes to this project are documented in this file.

## [1.0.1] - 2026-05-23
- Hardened all Nexus wrappers to use local mount refs per instance instead of global selectors.
- Added instance cleanup on unmount across wrappers to prevent leaks.
- Added `modelValue` support in Dial, Slider, and Number while preserving existing `change` behavior.
- Upgraded dependencies to latest compatible versions (Vite 8, VueUse 14, Playwright 1.60).
- Added GitHub Actions CI matrix (Node 20/22) and publish workflow aligned for GitHub Packages.
- Added smoke tests with Playwright and component API reference documentation.

## [1.0.0] - 2026-05-23
- Added Vue wrappers for NexusUI interfaces and SegmentDisplay.
- Added library build outputs (ESM and UMD).
- Added scoped package metadata for GitHub Packages publishing.
- Added CI workflow and Playwright smoke test scaffolding.
