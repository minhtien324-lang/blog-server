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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.getPosts = void 0;
const services_1 = require("../../services");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.PostServices.getPosts(req.query);
        res.status(200).json(data);
    }
    catch (error) {
        return error;
    }
});
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.PostServices.getPost(Number(req.params.id));
        res.status(200).json(data);
    }
    catch (error) {
        return error;
    }
});
exports.getPost = getPost;
