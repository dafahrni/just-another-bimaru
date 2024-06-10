import { FieldFactory } from "../models/board/field-factory.js";
import { StoreBase } from "./store-base.js";
export class FieldStore extends StoreBase {
    constructor() {
        super("field");
    }
    mapToEntity(field) {
        return { text: field.asText() };
    }
    mapFromEntity(field) {
        return FieldFactory.parse(field === null || field === void 0 ? void 0 : field.text);
    }
}
//# sourceMappingURL=field-store.js.map