#!/usr/bin/env node
import { CourierServiceCLI } from "./cli/CourierServiceCLI";

const courierServiceCLI = new CourierServiceCLI();
courierServiceCLI.start();
