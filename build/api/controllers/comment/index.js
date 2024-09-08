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
exports.addComment = exports.getComments = void 0;
const services_1 = require("../../services");
const db_1 = __importDefault(require("../../../db"));
const models_1 = require("../../models");
const comment_1 = __importDefault(require("../../services/comment"));
const typeorm_1 = require("typeorm");
const axios_1 = require("axios");
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.PostServices.getPosts(req.query);
        res.status(200).json(data);
    }
    catch (error) {
        return error;
    }
});
exports.getComments = getComments;
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, userId } = req.body;
        const { postId } = req.params;
        const post = yield db_1.default
            .getRepository(models_1.Post)
            .findOneBy({ id: postId });
        const user = yield db_1.default
            .getRepository(models_1.User)
            .findOneBy({ id: userId });
        const newComment = {
            comment,
            post: post,
            user: user,
            username: user === null || user === void 0 ? void 0 : user.name,
        };
        yield comment_1.default.createComment(newComment);
        res.status(axios_1.HttpStatusCode.Created).json(newComment);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({ error: error.message });
        }
        console.log(error);
    }
});
exports.addComment = addComment;
