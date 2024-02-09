import { FieldBase } from "./field-base.js";

export class Field extends FieldBase {

  constructor(labels) {
    super(labels);
  }
  
  setEmptyCellsOfAllFullLinesToWater() {
    // iterate rows
    for (let y = 0; y < this.sizeY; y++) {
      let line = this.getRow(y);
      if (line.isFull() && line.hasEmptyCells()) {
        line.changeEmptyToWater();
      }
    }

    // iterate columns
    for (let x = 0; x < this.sizeX; x++) {
      let line = this.getCol(x);
      if (line.isFull() && line.hasEmptyCells()) {
        line.changeEmptyToWater();
      }
    }
  }

  symbolsToTheEastAre(cell, symbols) {
    let easternSymbols = this.symbolsToTheEast(cell, symbols.length);
    return easternSymbols == symbols;
  }

  symbolsToTheSouthAre(cell, symbols) {
    let southernSymbols = this.symbolsToTheSouth(cell, symbols.length);
    return southernSymbols == symbols;
  }

  symbolsToTheEast(cell, quantity) {
    const x = cell.getX();
    const y = cell.getY();
    let symbols = "" + cell.asSymbol();
    for (let i = 1; i < quantity; i++) {
      const nextCell = this.getCell(x + i, y);
      symbols += nextCell.asSymbol();
    }
    return symbols;
  }

  symbolsToTheSouth(cell, quantity) {
    const x = cell.getX();
    const y = cell.getY();
    let symbols = "" + cell.asSymbol();
    for (let i = 1; i < quantity; i++) {
      const nextCell = this.getCell(x, y + i);
      symbols += nextCell.asSymbol();
    }
    return symbols;
  }

  getSlotsOfSize(size) {
    let slots = [];
    let slotsNoneWater = this.getSlotsOfAllNoneWaterCells(size);
    slotsNoneWater.forEach((slot) => {
      const newSlots = slot.split(size);
      slots = [...slots, ...newSlots];
    });
    return slots;
  }

  getSlotsOfAllNoneWaterCells(size) {
    let slots = [];
    for (let y = 0; y < this.sizeY; y++) {
      let row = this.getRow(y);
      if (row.getAmountLeft() >= size) 
        slots = [...slots, ...row.findSlots()];
    }
    for (let x = 0; x < this.sizeX; x++) {
      let col = this.getCol(x);
      if (col.getAmountLeft() >= size)
        slots = [...slots, ...col.findSlots()];
    }
    return slots;
  }
}
