# Background

Kiki, a first-time entrepreneur from the city of Koriko has decided to open a small distance courier service to deliver packages, with her friend Tombo and cat Joji. Kiki has invested in N no. of vehicles and have driver partners to drive each vehicle & deliver packages.


# Delivery Module for Everest Engineering
## Steps to run the project
1. Build the project
2. Run with CLI

### Build the Project
```bash
npm run build
```

### Script to run the code for problem 1
```bash
node lib/costEstimation.js --baseFare=100 --packages=3
```

Then when asked to enter the package details:
```bash
PKG1 5 5 OFR001
```

### How to run the code for problem 2
```bash
node lib/timeEstimation.js --baseFare=100 --packages=5
```

## How to test?
```bash
npm test
```

## How to install globally?
```bash
npm i -g .
```

Then,
```bash
everest --baseFare=100 --packages=1
```