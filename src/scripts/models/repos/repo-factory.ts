import { GameDefinition } from "../board/game-definition.js";
import { FieldBase } from "../board/field-base.js";
import { IRepo, Repo } from "./repo.js";
import { FieldFactory } from "../board/field-factory.js";

class ConfigRepo extends Repo<GameDefinition> {}
class FieldRepo extends Repo<FieldBase> {}

export interface IRepoFactory {
  configs: IRepo<GameDefinition>;
  fields: IRepo<FieldBase>;
}

export class RepoFactory implements IRepoFactory {
  configRepo: IRepo<GameDefinition>;
  fieldRepo: IRepo<FieldBase>;

  constructor(configs?: IRepo<GameDefinition>, fields?: IRepo<FieldBase>) {
    this.configRepo = configs ? configs : new ConfigRepo("config");
    this.fieldRepo = fields ? fields : new FieldRepo("field");
  }

  get configs(): IRepo<GameDefinition> {
    return this.configRepo;
  }

  get fields(): IRepo<FieldBase> {
    return this.fieldRepo;
  }

  initWithDefaultData() {
    if (this.fields.length <= 0) {
      this.fields.add(FieldFactory.createWith(GameDefinition.default(0)));
      this.fields.add(FieldFactory.createWith(GameDefinition.default(1)));
      this.fields.add(FieldFactory.createWith(GameDefinition.default(2)));
    }

    if (this.configs.length <= 0) {
      this.configs.add(GameDefinition.default(0));
      this.configs.add(GameDefinition.default(1));
      this.configs.add(GameDefinition.default(2));
    }
  }
}
