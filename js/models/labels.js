export class Labels {
  static default() {
    const rowShipCount = [5, 1, 3, 1, 4, 1, 2, 3];
    const colShipCount = [2, 3, 2, 3, 4, 2, 2, 2];
    return new Labels(rowShipCount, colShipCount);
  }

  constructor(rowLabels, colLabels) {
    this.rowLabels = rowLabels;
    this.colLabels = colLabels;
  }

  ofCols() {
    return this.colLabels;
  }

  ofRows() {
    return this.rowLabels;
  }

  ofCol(x) {
    return this.colLabels[x];
  }

  ofRow(y) {
    return this.rowLabels[y];
  }

  get sizeX() {
    return this.colLabels.length;
  }

  get sizeY() {
    return this.rowLabels.length;
  }
}
