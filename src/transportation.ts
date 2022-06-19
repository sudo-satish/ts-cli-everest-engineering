#!/usr/bin/env node
import { CourierServiceTransportCLI } from "./cli/CourierServiceTransportCLI";

const courierServiceCLI = new CourierServiceTransportCLI();
courierServiceCLI.start();