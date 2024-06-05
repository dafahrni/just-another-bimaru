import { FieldBase } from "../models/board/field-base.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { GameDefinition } from "../models/board/game-definition.js";
import { IRepo } from "../models/repos/repo.js";
import { ConfigStore } from "./config-store.js";
import { FieldStore } from "./field-store.js";

export class StoreFactory {
    fields: IRepo<FieldBase>;
    configs: IRepo<GameDefinition>;

    constructor() {
        this.fields = new FieldStore();
        this.configs = new ConfigStore();
    }

    get fieldRepo(): IRepo<FieldBase> {
        return this.fields;
    }

    get configRepo(): IRepo<GameDefinition> {
        return this.configs;
    }
}