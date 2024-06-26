export class Labels {
  colLabels: number[];
  rowLabels: number[];

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
    if (index < 0 || index >= this.rows) return;

    let target = this.rowLabels[index];
    this.rowLabels[index] = target < 9 ? target + 1 : 0;
  }

  increaseColTarget(index: number) {
    if (index < 0 || index >= this.cols) return;

    let target = this.colLabels[index];
    this.colLabels[index] = target < 9 ? target + 1 : 0;
  }
  
  setRowTarget(index: number, target: number) {
    if (index < 0 || index >= this.rows) return;
    if (target < 0 || target > 9) return;

    this.rowLabels[index] = target;
  }

  setColTarget(index: number, target: number) {
    if (index < 0 || index >= this.cols) return;
    if (target < 0 || target > 9) return;

    this.colLabels[index] = target;
  }
}
