"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getRoutes_js_1 = require("./routes/getRoutes.js");
const metadata_generator_1 = __importDefault(require("./metadata-generator/generate/metadata-generator"));
// 2022-09-29-CMF: To generate metadata files . . .
(0, metadata_generator_1.default)().catch((err) => console.log(err));
// 2022-02-14-CMF: Mini-API entry point
const app = (0, express_1.default)();
app.use('/api', getRoutes_js_1.router);
app.listen(8081);
