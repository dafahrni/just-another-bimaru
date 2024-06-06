import { FieldBase } from "../models/board/field-base.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { Configuration } from "../models/board/configuration.js";
import { IRepo } from "../models/repos/repo.js";
import { ConfigStore } from "./config-store.js";
import { FieldStore } from "./field-store.js";

export class StoreFactory {
    fields: IRepo<FieldBase>;
    configs: IRepo<Configuration>;

    constructor() {
        this.fields = new FieldStore();
        this.configs = new ConfigStore();
    }

    get fieldRepo(): IRepo<FieldBase> {
        return this.fields;
    }

    get configRepo(): IRepo<Configuration> {
        return this.configs;
    }
}