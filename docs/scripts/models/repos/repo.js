export class Repo {
    constructor(prefix, items) {
        this.allItems = items ? items : {};
        this.prefix = prefix;
    }
    add(item) {
        const index = this.length;
        const key = this.keyFrom(index);
        this.allItems[key] = item;
    }
    get(index) {
        const key = this.keyFrom(index);
        return this.allItems[key];
    }
    getAll() {
        return this.allItems;
    }
    get length() {
        return Object.keys(this.allItems).length;
    }
    remove(index) {
        const key = this.keyFrom(index);
        delete this.allItems[key];
    }
    removeAll() {
        this.allItems = {};
    }
    keyFrom(index) {
        return `${this.prefix}_${index}`;
    }
}
//# sourceMappingURL=repo.js.map