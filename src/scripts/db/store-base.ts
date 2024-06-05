import { IRepo, IDict } from "../models/repos/repo.js";
import { LocalStore } from "./local-store.js";

export class StoreBase<M, E> implements IRepo<M> {
  store: LocalStore<E>;

  constructor(storageKey: string) {
    this.store = new LocalStore<E>(storageKey);
  }

  add(model: M) {
    this.store.saveItem(
      this.store.keyFrom(this.length),
      this.mapToEntity(model)
    );
  }

  get(index: number): M {
    if (index < 0 || index >= this.length)
      throw new Error("Index out of bounds!");

    const key = this.store.keyFrom(index);
    const item = this.store.getItem(key);
    if (!item) throw new Error("Item not found!");

    return this.mapFromEntity(item);
  }

  getAll(): IDict<M> {
    const records = this.store.getAllItems();
    let result: IDict<M> = {};
    for (let i = 0; i < this.length; i++) {
      const key = this.store.keyFrom(i);
      result[key] = this.mapFromEntity(records[i]);
    }
    return result;
  }

  get length(): number {
    const records = this.store.getAllItems();
    return Object.keys(records).length;
  }

  remove(index: number): void {
    const key = this.store.keyFrom(index);
    this.store.deleteItem(key);
  }

  removeAll(): void {
    this.store.clearAllItems();
  }

  mapToEntity(model: M): E {
    throw new Error("Method not implemented.");
  }

  mapFromEntity(entity: E): M {
    throw new Error("Method not implemented.");
  }
}
