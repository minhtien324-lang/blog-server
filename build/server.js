"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./api/routes"));
const db_1 = __importDefault(require("./db"));
db_1.default.initialize()
    .then(() => {
    console.log('Connect to database successfully!');
    const app = (0, express_1.default)();
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use('/api', routes_1.default);
    app.use((_req, res, _next) => {
        const error = new Error('Not found');
        return res.status(404).json({
            message: error.message,
        });
    });
    const httpServer = http_1.default.createServer(app);
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => console.log(`The server is running at http://localhost:${PORT}`));
})
    .catch(e => console.error('Connect to database failed: ', e));
