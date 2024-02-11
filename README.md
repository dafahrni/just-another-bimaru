# Just another Bimaru

## Setup

- install [node.js](https://nodejs.org/en/download)
- execute `npm install`

## Build TS Files

- execute `npm run buildn`

## Run in VS Code

- go to marketplace and install *Live Server* extension
- right mouse click on `index.html` to open with *Live Server*

## Run Unit Tests

- execute `npm run test`

## Folder structue

project/
│
├── src/          - Source code directory
│   ├── index.html         - Main HTML file
│   ├── styles/            - CSS files
│   │   └── style.css
│   ├── scripts/           - TypeScript files
│   │   └── app.ts
│   └── assets/            - Assets directory
│
├── tests/        - Test directory
│   ├── unit/             - Unit tests
│   │   └── unit-test.ts
│   ├── integration/      - Integration tests
│   │   └── integration-test.ts
│   └── ...
│
├── dist/         - Output directory for transpiled code
│   ├── index.html         - Transpiled HTML file
│   ├── styles/            - Transpiled CSS files
│   │   └── style.css
│   ├── scripts/           - Transpiled JavaScript files
│   │   └── app.js
│   └── assets/            - Copied assets
│
├── node_modules/    - Installed npm packages
├── package.json      - Configuration file for npm
├── tsconfig.json     - Configuration file for TypeScript
└── README.md         - This file
