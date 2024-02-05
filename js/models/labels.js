export class Labels {
  constructor(colLabels, rowLabels) {
    this.colLabels = colLabels;
    this.rowLabels = rowLabels;
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
