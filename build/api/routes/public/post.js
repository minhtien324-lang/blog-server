"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const endpoint_1 = require("../../../constants/endpoint");
const post_1 = require("../../controllers/post");
const router = (0, express_1.Router)();
router.get(endpoint_1.Endpoint.POSTS, post_1.getPosts);
router.get(endpoint_1.Endpoint.POST, post_1.getPost);
exports.default = router;
