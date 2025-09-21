# Converting Nexus-Vue to an NPM Package

Follow these steps to convert this Vue.js project into a publishable NPM package.

## 1. Update package.json
- Remove `"private": true`
- Add the following fields:
  ```json
  "main": "dist/nexus-vue.umd.js",
  "module": "dist/nexus-vue.es.js",
  "types": "dist/index.d.ts",  // if using TypeScript
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/nexus-vue.es.js",
      "require": "./dist/nexus-vue.umd.js"
    }
  }
  ```
- Ensure version is set (e.g., "1.0.0")
- Add keywords, description, author, license, repository

## 2. Create an Export File
Create `src/index.js` (or `src/index.ts` if using TypeScript) to export all components:
```javascript
export { default as Button } from './components/nexus/Button.vue'
export { default as Dial } from './components/nexus/Dial.vue'
// ... export all other components
```

## 3. Update vite.config.js
Modify the config to build a library:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'NexusVue',
      fileName: (format) => `nexus-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

## 4. Add TypeScript Support (Optional)
If using TypeScript:
- Rename `src/index.js` to `src/index.ts`
- Add type declarations for components
- Update package.json with "types" field

## 5. Build the Package
Run `npm run build` to generate the dist/ folder.

## 6. Test Locally (Optional)
Install the package locally: `npm pack` then `npm install ./nexus-vue-1.0.0.tgz`

## 7. Publish to NPM
- Login to NPM: `npm login`
- Publish: `npm publish`
- Ensure you have an NPM account and the package name is unique

## Notes
- This assumes Vue 3 and NexusUI are peer dependencies
- Update README.md with installation and usage instructions
- Consider adding a demo or documentation