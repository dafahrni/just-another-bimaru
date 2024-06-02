export interface IDict<T> {
  [key: string]: T;
}

export interface IRepo<T> {
  add(item: T): void;
  get(index: number): T;
  getAll(): IDict<T>;
  get length(): number;
  remove(index: number): void;
  removeAll(): void;
}

export class Repo<T> implements IRepo<T> {
  private allItems: IDict<T>;
  private prefix: string;

  constructor(prefix: string, items?: IDict<T>) {
    this.allItems = items ? items : {};
    this.prefix = prefix; 
  }

  add(item: T): void {
    const index = this.length;
    const key = this.keyFrom(index);
    this.allItems[key] = item;
  }

  get(index: number): T {
    const key = this.keyFrom(index);
    return this.allItems[key];
  }

  getAll(): IDict<T> {
    return this.allItems;
  }

  get length(): number {
    return Object.keys(this.allItems).length;
  }

  remove(index: number): void {
    const key = this.keyFrom(index);
    delete this.allItems[key];
  }

  removeAll(): void {
    this.allItems = {};
  }

  keyFrom(index: number) {
    return `${this.prefix}_${index}`;
  }
}
