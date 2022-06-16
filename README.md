# Delivery Module for Everest Engineering
## Steps to run the project
1. Build the project
2. Run with CLI

### Build the Project
```bash
npm run build
```

### Script to run the code
```bash
node lib/index.js --baseFare=100 --packages=3
```

Then when asked to enter the package details:
```bash
PKG1 5 5 OFR001
```


## How to install globally?
```bash
npm i -g .
```

Then,
```bash
everest --baseFare=100 --packages=1
```