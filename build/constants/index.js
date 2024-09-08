"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_REGEX = exports.DEFAULT_QUERIES = void 0;
exports.DEFAULT_QUERIES = {
    pageSize: 10,
    pageIndex: 1,
};
exports.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
