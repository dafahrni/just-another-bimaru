export class LocalStore {
    constructor(storageKey, items) {
        this.storageKey = storageKey;
        if (!items)
            return;
        const length = Object.keys(items).length;
        for (let i = 0; i < length; i++) {
            const key = this.keyFrom(i);
            this.saveItem(key, items[i]);
        }
    }
    keyFrom(index) {
        return `${this.storageKey}_${index}`;
    }
    saveItem(key, item) {
        const items = this.getAllItems();
        items[key] = item;
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    getItem(key) {
        const items = this.getAllItems();
        return items[key] || null;
    }
    getAllItems() {
        const itemsString = localStorage.getItem(this.storageKey);
        return itemsString ? JSON.parse(itemsString) : {};
    }
    numberOfItems() {
        const items = this.getAllItems();
        return Object.keys(items).length;
    }
    deleteItem(key) {
        const items = this.getAllItems();
        delete items[key];
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    clearAllItems() {
        localStorage.removeItem(this.storageKey);
    }
}
//# sourceMappingURL=local-store.js.map