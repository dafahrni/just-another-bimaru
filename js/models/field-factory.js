import { Field } from "./field.js";
import { CellValue } from "./cell-value.js";
import { Labels } from "./labels.js";
import { GameDefinition } from "./game-definition.js";

export class FieldFactory {

  static parse(text) {
    let lines = text.replace(/ /g, "").split("\n");
    let sizeY = lines.length - 1;
    let lastLine = lines[sizeY];
    let sizeX = lastLine.length;
    let colLabels = Array(sizeX);
    let rowLabels = Array(sizeY);
    let labels = new Labels(colLabels, rowLabels);
    let field = new Field(labels);
    for (let x = 0; x < sizeX; x++) {
      colLabels[x] = parseInt("" + lastLine[x]);
    }
    for (let y = 0; y < sizeY; y++) {
      let row = lines[y];
      let line = row.split("|");
      rowLabels[y] = parseInt(line[0]);
      for (let x = 0; x < sizeX; x++) {
        let symbol = line[1][x];
        let value = CellValue.from(symbol);
        field.setCellValue(x, y, value);
      }
    }
    return field;
  }

  static default(index = 0) {
    const definition = GameDefinition.default(index)
    return FieldFactory.createWith(definition);
  }

  static createWith(definition = null) {
    definition = definition
      ? definition
      : GameDefinition.default();
    const field = new Field(definition.getLabels());
    field.setPredefinedCells(definition.getPredefinedCells());
    return field;
  }

  static from(sizeX, sizeY) {
    return new Field(new Labels(Array(sizeX).fill(0), Array(sizeY).fill(0)));
  }
}
