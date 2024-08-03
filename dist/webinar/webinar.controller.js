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
exports.WebinarController = void 0;
const common_1 = require("@nestjs/common");
const webinar_service_1 = require("./webinar.service");
const create_webinar_dto_1 = require("./dto/create-webinar.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let WebinarController = class WebinarController {
    constructor(webinarService) {
        this.webinarService = webinarService;
    }
    create(createWebinarDto, files, response) {
        return this.webinarService.create(createWebinarDto, files, response);
    }
    findAll(response) {
        return this.webinarService.findAll(response);
    }
    deleteWebinar(webinarId, response) {
        return this.webinarService.deleteWebinar(webinarId, response);
    }
};
exports.WebinarController = WebinarController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.memoryStorage)(),
    })),
    (0, swagger_1.ApiBody)({ type: create_webinar_dto_1.CreateWebinarDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_webinar_dto_1.CreateWebinarDto, Object, Object]),
    __metadata("design:returntype", void 0)
], WebinarController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebinarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('delete/:webinarId'),
    __param(0, (0, common_1.Param)('webinarId')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebinarController.prototype, "deleteWebinar", null);
exports.WebinarController = WebinarController = __decorate([
    (0, swagger_1.ApiTags)('Webinar'),
    (0, common_1.Controller)('webinar'),
    __metadata("design:paramtypes", [webinar_service_1.WebinarService])
], WebinarController);
//# sourceMappingURL=webinar.controller.js.map