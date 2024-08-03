"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWebinarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_webinar_dto_1 = require("./create-webinar.dto");
class UpdateWebinarDto extends (0, swagger_1.PartialType)(create_webinar_dto_1.CreateWebinarDto) {
}
exports.UpdateWebinarDto = UpdateWebinarDto;
//# sourceMappingURL=update-webinar.dto.js.map