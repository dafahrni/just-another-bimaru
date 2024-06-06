
export interface ICell {
  index: number;
  symbol: string;
}

export class CellEntity implements ICell {
  index: number;
  symbol: string;

  constructor(index: number, symbol: string) {
    this.index = index;
    this.symbol = symbol;
  }
}

