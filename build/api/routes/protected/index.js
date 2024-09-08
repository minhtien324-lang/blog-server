"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const message_1 = require("../../../constants/message");
const comment_1 = __importDefault(require("./comment"));
const auth = (req, res, next) => {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            res.status(axios_1.HttpStatusCode.Forbidden).json({ error: message_1.FORBIDDEN });
            return;
        }
        if (!jsonwebtoken_1.default.verify(accessToken, process.env.TOKEN_SECRET)) {
            res.status(axios_1.HttpStatusCode.Forbidden).json({ error: message_1.FORBIDDEN });
            return;
        }
        next();
    }
    catch (error) {
        throw error;
    }
};
const router = (0, express_1.Router)();
router.use(auth);
router.use(comment_1.default);
exports.default = router;
