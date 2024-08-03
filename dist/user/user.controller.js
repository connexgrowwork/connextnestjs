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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto, response) {
        return this.userService.create(createUserDto, response);
    }
    socialLoginSignup(socialLoginDto, response) {
        return this.userService.socialLoginSignup(socialLoginDto, response);
    }
    profileUpdate(userId, profileDto, files, response) {
        return this.userService.profileUpdate(userId, profileDto, files, response);
    }
    getById(userId, response) {
        return this.userService.getById(userId, response);
    }
    userFollow(followUnFollowDTO, response) {
        return this.userService.userFollow(followUnFollowDTO, response);
    }
    userUnFollow(unFollowDTO, response) {
        return this.userService.userUnFollow(unFollowDTO, response);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('social-login-signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.SocialSignupLoginDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "socialLoginSignup", null);
__decorate([
    (0, common_1.Post)('profile-update/:userId'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.memoryStorage)(),
    })),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.ProfileDto }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.ProfileDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "profileUpdate", null);
__decorate([
    (0, common_1.Get)('get-user-data-by-id/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('follow-user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.FollowDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userFollow", null);
__decorate([
    (0, common_1.Post)('un-follow-user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UnFollowDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userUnFollow", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('USER'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map