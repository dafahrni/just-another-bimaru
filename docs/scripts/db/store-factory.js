import { ConfigStore } from "./config-store.js";
import { FieldStore } from "./field-store.js";
export class StoreFactory {
    constructor() {
        this.fields = new FieldStore();
        this.configs = new ConfigStore();
    }
    get fieldRepo() {
        return this.fields;
    }
    get configRepo() {
        return this.configs;
    }
}
//# sourceMappingURL=store-factory.js.map