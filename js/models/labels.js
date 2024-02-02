class Labels {
  constructor(colLabels, rowLabels) {
    this.colLabels = colLabels;
    this.rowLabels = rowLabels;
  }

  ofColums() {
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

  getSizeX() {
    return this.colLabels.length;
  }

  getSizeY() {
    return this.rowLabels.length;
  }
}
