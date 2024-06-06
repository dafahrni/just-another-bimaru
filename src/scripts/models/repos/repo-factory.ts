import { Configuration } from "../board/configuration.js";
import { FieldBase } from "../board/field-base.js";
import { IRepo, Repo } from "./repo.js";
import { FieldFactory } from "../board/field-factory.js";

class ConfigRepo extends Repo<Configuration> {}
class FieldRepo extends Repo<FieldBase> {}

export interface IRepoFactory {
  configs: IRepo<Configuration>;
  fields: IRepo<FieldBase>;
}

export class RepoFactory implements IRepoFactory {
  configRepo: IRepo<Configuration>;
  fieldRepo: IRepo<FieldBase>;

  constructor(configs?: IRepo<Configuration>, fields?: IRepo<FieldBase>) {
    this.configRepo = configs ? configs : new ConfigRepo("config");
    this.fieldRepo = fields ? fields : new FieldRepo("field");
  }

  get configs(): IRepo<Configuration> {
    return this.configRepo;
  }

  get fields(): IRepo<FieldBase> {
    return this.fieldRepo;
  }

  initWithDefaultData() {
    if (this.fields.length <= 0) {
      this.fields.add(FieldFactory.createWith(Configuration.default(0)));
      this.fields.add(FieldFactory.createWith(Configuration.default(1)));
      this.fields.add(FieldFactory.createWith(Configuration.default(2)));
    }

    if (this.configs.length <= 0) {
      this.configs.add(Configuration.default(0));
      this.configs.add(Configuration.default(1));
      this.configs.add(Configuration.default(2));
    }
  }
}
