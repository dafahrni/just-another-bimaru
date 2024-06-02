import { IDict, IRepo } from "../models/repos/repo.js";

export class LocalStore<T> {
  private storageKey: string;

  constructor(storageKey: string, items?: IDict<T>) {
    this.storageKey = storageKey;
    if (!items) return;
    const length = Object.keys(items).length;
    for (let i = 0; i < length; i++) {
      const key = this.keyFrom(i);
      this.saveItem(key, items[i]);
    }
  }

  keyFrom(index: number) {
    return `${this.storageKey}_${index}`;
  }

  saveItem(key: string, item: T): void {
    const items = this.getAllItems();
    items[key] = item;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItem(key: string): T | null {
    const items = this.getAllItems();
    return items[key] || null;
  }

  getAllItems(): Record<string, T> {
    const itemsString = localStorage.getItem(this.storageKey);
    return itemsString ? JSON.parse(itemsString) : {};
  }

  numberOfItems(): number {
    const items = this.getAllItems();
    return Object.keys(items).length;
  }

  deleteItem(key: string): void {
    const items = this.getAllItems();
    delete items[key];
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clearAllItems(): void {
    localStorage.removeItem(this.storageKey);
  }
}
