"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(createPostDto, files, response) {
        return this.postService.create(createPostDto, files, response);
    }
    getAllPostList(userId, postListDto, response) {
        return this.postService.getAllPostList(userId, postListDto, response);
    }
    likeUnlikePost(likeDto, response) {
        return this.postService.likeUnlikePost(likeDto, response);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.memoryStorage)(),
    })),
    (0, swagger_1.ApiBody)({ type: create_post_dto_1.CreatePostDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('all-post-list/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.PostListDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPostList", null);
__decorate([
    (0, common_1.Post)('like-unlike'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.LikeDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "likeUnlikePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map