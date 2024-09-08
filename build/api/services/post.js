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
const typeorm_1 = require("typeorm");
const db_1 = __importDefault(require("../../db"));
const models_1 = require("../models");
class PostServices {
    static getPosts(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = (queries === null || queries === void 0 ? void 0 : queries.search) || '';
                const pageSize = (queries === null || queries === void 0 ? void 0 : queries.pageSize) || 10;
                const pageIndex = (queries === null || queries === void 0 ? void 0 : queries.pageIndex) || 1;
                const [data, total] = yield db_1.default.getRepository(models_1.Post).findAndCount({
                    where: {
                        title: (0, typeorm_1.Like)(`%${search}%`),
                    },
                    take: pageSize,
                    skip: (pageIndex - 1) * pageSize,
                });
                return {
                    items: data,
                    pageIndex,
                    pageSize,
                    totalItems: total,
                    totalPages: Math.ceil(total / pageSize),
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.default
                    .getRepository(models_1.Post)
                    .createQueryBuilder('post')
                    .leftJoinAndSelect('post.contents', 'content')
                    .leftJoinAndSelect('post.comments', 'comment')
                    .where('post.id = :id', { id })
                    .orderBy('content.position')
                    .getOne();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PostServices;
