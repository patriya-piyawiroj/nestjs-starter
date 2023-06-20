"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateNoteDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { note: { required: true, type: () => String } };
    }
}
exports.CreateNoteDto = CreateNoteDto;
//# sourceMappingURL=create-note.dto.js.map