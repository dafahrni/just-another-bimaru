export class Labels {

  private colLabels: number[];
  private rowLabels: number[];

  static default() {
    const colShipCount = [2, 3, 2, 3, 4, 2, 2, 2];
    const rowShipCount = [5, 1, 3, 1, 4, 1, 2, 3];
    return new Labels(colShipCount, rowShipCount);
  }

  constructor(colLabels: number[], rowLabels: number[]) {
    this.colLabels = colLabels;
    this.rowLabels = rowLabels;
  }

  ofCols() {
    return this.colLabels;
  }

  ofRows() {
    return this.rowLabels;
  }

  ofCol(x: number) {
    return this.colLabels[x];
  }

  ofRow(y: number) {
    return this.rowLabels[y];
  }

  get sizeX() {
    return this.colLabels.length;
  }

  get sizeY() {
    return this.rowLabels.length;
  }
}
