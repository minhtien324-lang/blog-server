"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const models_1 = require("./api/models");
const db = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [models_1.User, models_1.Post, models_1.Content, models_1.Comment],
    synchronize: true,
});
exports.default = db;
