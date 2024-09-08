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
const db_1 = __importDefault(require("../../db"));
const models_1 = require("../models");
class CommentServices {
    static getComments(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = queries.postId;
            const pageSize = queries.pageSize || 10;
            const pageIndex = queries.pageIndex || 1;
            try {
                const data = yield db_1.default
                    .getRepository(models_1.Comment)
                    .createQueryBuilder()
                    .where('postId = :postId', { postId })
                    .getManyAndCount();
                return {
                    items: data,
                    pageIndex,
                    pageSize,
                    totalItems: data.length,
                    totalPages: Math.ceil(data.length / pageSize),
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createComment({ comment, post, user, username, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.default
                    .createQueryBuilder()
                    .insert()
                    .into(models_1.Comment)
                    .values({ comment, post, user, username })
                    .execute();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CommentServices;
