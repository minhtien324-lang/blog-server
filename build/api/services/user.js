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
const user_1 = __importDefault(require("../models/user"));
class UserServices {
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default
                    .createQueryBuilder()
                    .insert()
                    .into(user_1.default)
                    .values(Object.assign({ name: user.email, avatar: '' }, user))
                    .execute();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.default.getRepository(user_1.default).findOneBy({ email });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default
                    .createQueryBuilder()
                    .update(user_1.default)
                    .set(user)
                    .where('id = :id', { id })
                    .execute();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default
                    .createQueryBuilder()
                    .delete()
                    .from(user_1.default)
                    .where('id = :id', { id })
                    .execute();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserServices;
