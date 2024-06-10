import { LocalStore } from "./local-store.js";
export class StoreBase {
    constructor(storageKey) {
        this.store = new LocalStore(storageKey);
    }
    add(model) {
        this.store.saveItem(this.store.keyFrom(this.length), this.mapToEntity(model));
    }
    get(index) {
        if (index < 0 || index >= this.length)
            throw new Error("Index out of bounds!");
        const key = this.store.keyFrom(index);
        const item = this.store.getItem(key);
        if (!item)
            throw new Error("Item not found!");
        return this.mapFromEntity(item);
    }
    getAll() {
        const records = this.store.getAllItems();
        let result = {};
        for (let i = 0; i < this.length; i++) {
            const key = this.store.keyFrom(i);
            result[key] = this.mapFromEntity(records[i]);
        }
        return result;
    }
    get length() {
        const records = this.store.getAllItems();
        return Object.keys(records).length;
    }
    remove(index) {
        const key = this.store.keyFrom(index);
        this.store.deleteItem(key);
    }
    removeAll() {
        this.store.clearAllItems();
    }
}
//# sourceMappingURL=store-base.js.map