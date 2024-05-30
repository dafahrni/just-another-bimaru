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

  get cols() {
    return this.colLabels.length;
  }

  get rows() {
    return this.rowLabels.length;
  }

  increaseRowTarget(index: number) {
    this.rowLabels[index] = index < this.rows
      ? this.rowLabels[index] + 1
      : 0;
  }

  increaseColTarget(index: number) {
    this.colLabels[index] = index < this.cols
      ? this.colLabels[index] + 1
      : 0;
  }
}
