"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../../constants");
const message_1 = require("../../../constants/message");
const db_1 = __importDefault(require("../../../db"));
const models_1 = require("../../models");
exports.userSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email()
        .refine((email) => __awaiter(void 0, void 0, void 0, function* () {
        const current = yield db_1.default.getRepository(models_1.User).findOneBy({ email });
        return !current;
    }), { message: message_1.EMAIL_ALREADY_EXISTS }),
    password: zod_1.z.string().regex(new RegExp(constants_1.PASSWORD_REGEX), message_1.PASSWORD_FAIL),
    avatar: zod_1.z.string().url().optional(),
});
