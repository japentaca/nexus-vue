# Contributing

## Setup
1. Install dependencies:
   npm install
2. Start dev server:
   npm run dev
3. Build the library:
   npm run build
4. Run smoke tests:
   npm run test:smoke

## Pull Requests
- Keep changes focused and small.
- Ensure build passes locally before opening a PR.
- Include a short description of behavioral changes.

## Release Process
1. Update package version in package.json.
2. Update CHANGELOG.md.
3. Create and push tag: vX.Y.Z
4. GitHub Actions publish workflow will publish to GitHub Packages.
