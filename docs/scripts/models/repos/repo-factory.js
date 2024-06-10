import { Configuration } from "../board/configuration.js";
import { Repo } from "./repo.js";
import { FieldFactory } from "../board/field-factory.js";
class ConfigRepo extends Repo {
}
class FieldRepo extends Repo {
}
export class RepoFactory {
    constructor(configs, fields) {
        this.configRepo = configs ? configs : new ConfigRepo("config");
        this.fieldRepo = fields ? fields : new FieldRepo("field");
    }
    get configs() {
        return this.configRepo;
    }
    get fields() {
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
//# sourceMappingURL=repo-factory.js.map