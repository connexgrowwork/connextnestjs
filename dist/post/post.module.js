"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const post_schema_1 = require("./schema/post.schema");
const comment_schema_1 = require("../comment/schema/comment.schema");
const notification_schema_1 = require("../user/schema/notification.schema");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Post', schema: post_schema_1.PostSchema },
                { name: 'Comment', schema: comment_schema_1.CommentSchema },
                { name: 'Notification', schema: notification_schema_1.NotificationSchema },
            ])],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map