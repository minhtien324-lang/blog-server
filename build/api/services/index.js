"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.PostServices = void 0;
const post_1 = __importDefault(require("./post"));
exports.PostServices = post_1.default;
const user_1 = __importDefault(require("./user"));
exports.UserServices = user_1.default;
