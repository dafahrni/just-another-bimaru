export class ValueConfig {
    constructor(id, labelText, min, max, val = null) {
        this.id = id;
        this.labelText = labelText;
        this.min = min;
        this.max = max;
        this.val = val ? val : min;
    }
}
//# sourceMappingURL=value-config.js.map