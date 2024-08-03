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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebinarSchema = exports.Webinar = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Webinar = class Webinar {
};
exports.Webinar = Webinar;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Webinar.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Webinar.prototype, "paymentUrl", void 0);
exports.Webinar = Webinar = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Webinar);
exports.WebinarSchema = mongoose_1.SchemaFactory.createForClass(Webinar);
//# sourceMappingURL=webinar.schema.js.map