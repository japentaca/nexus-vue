# Nexus Vue

Vue 3 wrappers for NexusUI interfaces, packaged as a reusable library.

## Package Registry

This package is configured for GitHub Packages:

- Package name: `@japentaca/nexus-vue`
- Registry: `https://npm.pkg.github.com`

## Install (Consumer Project)

1. Create or update `.npmrc` in your consumer project:

```ini
@japentaca:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Install dependencies:

```bash
npm install @japentaca/nexus-vue vue nexusui
```

## Basic Usage

```js
import { createApp } from 'vue'
import App from './App.vue'
import '@japentaca/nexus-vue/style.css'

createApp(App).mount('#app')
```

```vue
<script setup>
import { Button, Dial, Slider } from '@japentaca/nexus-vue'

function onChange(value) {
  console.log(value)
}
</script>

<template>
  <Button @change="onChange" />
  <Dial @change="onChange" :size="[140, 140]" />
  <Slider @change="onChange" :size="[180, 40]" />
</template>
```

## Exported Components

- Button
- Dial
- Envelope
- Matrix
- Meter
- Multislider
- Number
- Oscilloscope
- Pan
- Pan2D
- Piano
- Position
- Radio
- Select
- Sequencer
- Slider
- Spectrogram
- TextButton
- Tilt
- Toggle
- SegmentDisplay

Detailed props/events reference: `docs/components.md`.

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run build
npm run test:smoke
```

## Release to GitHub Packages

1. Update `version` in `package.json`.
2. Update `CHANGELOG.md`.
3. Create and push a tag:

```bash
git tag v1.0.1
git push origin v1.0.1
```

4. GitHub Actions workflow `.github/workflows/publish.yml` publishes automatically.

For prereleases (for example `1.0.1-rc.1`), push a prerelease tag like `v1.0.1-rc.1`. The workflow publishes it with the `rc` dist-tag.

## License

MIT