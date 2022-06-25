#!/usr/bin/env node
import { TimeEstimationCLI } from "./cli/TimeEstimationCLI";

const timeEstimationCLI = new TimeEstimationCLI();
timeEstimationCLI.start();