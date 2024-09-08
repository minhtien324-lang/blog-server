"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const endpoint_1 = require("../../../constants/endpoint");
const comment_1 = require("../../controllers/comment");
const router = (0, express_1.Router)();
router.get(endpoint_1.Endpoint.COMMENT, comment_1.getComments);
router.post(endpoint_1.Endpoint.COMMENT, comment_1.addComment);
exports.default = router;
