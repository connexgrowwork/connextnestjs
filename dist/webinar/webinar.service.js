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
exports.WebinarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const webinar_schema_1 = require("./schema/webinar.schema");
const AWS = require('aws-sdk');
let WebinarService = class WebinarService {
    constructor(webinarModel) {
        this.webinarModel = webinarModel;
    }
    async create(createWebinarDto, file, response) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        const s3 = new AWS.S3();
        if (file.length) {
            const uploadParams = {
                Bucket: process.env.BucketName,
                Key: `webinar/${Date.now()}_${file[0].originalname}`,
                Body: file[0].buffer,
                ContentType: file[0].mimetype,
            };
            const data = await s3.upload(uploadParams).promise();
            const saveWebinar = await this.webinarModel.create({
                fullName: createWebinarDto.name || '',
                image: data.Location || '',
                description: createWebinarDto.description || '',
                startDate: createWebinarDto.startDate || '',
                endDate: createWebinarDto.endDate || '',
                paymentUrl: createWebinarDto.paymentUrl || '',
            });
            return response.json({
                status: true,
                message: 'Webinar created successfully',
            });
        }
    }
    async findAll(response) {
        const finList = await this.webinarModel.find({ isActive: 0 });
        return response.send({
            status: true,
            data: finList,
        });
    }
    async deleteWebinar(webinarId, response) {
        const remove = await this.webinarModel.updateOne({ _id: webinarId }, {
            isActive: 1,
        });
        return response.send({
            status: true,
            message: 'Webinar deleted successfully',
        });
    }
};
exports.WebinarService = WebinarService;
exports.WebinarService = WebinarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(webinar_schema_1.Webinar.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WebinarService);
//# sourceMappingURL=webinar.service.js.map