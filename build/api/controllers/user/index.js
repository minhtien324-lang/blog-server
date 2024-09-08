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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.removeUser = exports.updateUser = exports.register = void 0;
const axios_1 = require("axios");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const message_1 = require("../../../constants/message");
const services_1 = require("../../services");
const helper_1 = require("./helper");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield helper_1.userSchema.safeParseAsync(req.body);
        if (!valid.success) {
            const error = {};
            valid.error.errors.forEach(e => (error[e.path[0]] = e.message));
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error });
            return;
        }
        const { email, password } = req.body;
        const hash = bcrypt_1.default.hashSync(password, 10);
        yield services_1.UserServices.createUser({ email, password: hash });
        res.status(axios_1.HttpStatusCode.Created).json({ message: message_1.USER_CREATED });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error: error.message });
        }
        console.log(error);
    }
});
exports.register = register;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const valid = yield helper_1.userSchema.safeParseAsync(req.body);
        if (!valid.success) {
            const error = {};
            valid.error.errors.forEach(e => (error[e.path[0]] = e.message));
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error });
            return;
        }
        const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
        const hash = bcrypt_1.default.hashSync(password, 10);
        yield services_1.UserServices.updateUser(Number(id), Object.assign({ password: hash }, rest));
        res.status(axios_1.HttpStatusCode.Ok).json({ message: message_1.USER_UPDATED });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error: error.message });
        }
        console.log(error);
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield services_1.UserServices.deleteUser(Number(id));
        res.status(axios_1.HttpStatusCode.Ok).json({ message: message_1.USER_REMOVED });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error: error.message });
        }
        console.log(error);
    }
});
exports.removeUser = removeUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield services_1.UserServices.getUser(email);
        if (!user) {
            res
                .status(axios_1.HttpStatusCode.Unauthorized)
                .json({ error: message_1.WRONG_ACCOUNT_INFO });
            return;
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            res
                .status(axios_1.HttpStatusCode.Unauthorized)
                .json({ error: message_1.WRONG_ACCOUNT_INFO });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '10d' });
        const { name, avatar, id } = user;
        res
            .status(axios_1.HttpStatusCode.Ok)
            .json({ accessToken, user: { id, name, email, avatar } });
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error: error.message });
        }
        console.log(error);
    }
});
exports.login = login;
