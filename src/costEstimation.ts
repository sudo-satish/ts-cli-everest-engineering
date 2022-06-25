#!/usr/bin/env node
import { CostEstimationCLI } from "./cli/CostEstimationCLI";

const costEstimationCLI = new CostEstimationCLI();
costEstimationCLI.start();
