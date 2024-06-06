import { expect } from "chai";
import { CellValue } from "../../../../src/scripts/models/parts/cell-value.js";
import { DtoFactory } from "../../../../src/scripts/controllers/dtos/dto-factory.js";
import { Labels } from "../../../../src/scripts/models/parts/labels.js";

describe("DtoFactory", () => {

  describe("#mapValue()", () => {
    it("should return expected dto", () => {
      const symbol = ">";
      const value = CellValue.from(symbol);

      const dto = DtoFactory.mapValue(value.getSymbol());
      
      expect(dto.symbol).to.be.equal(symbol);
    });
  });

  describe("#mapSize()", () => {
    it("should return expected dto", () => {
      const labels = new Labels([1, 2, 1], [0, 3, 0, 1]);

      const dto = DtoFactory.mapSize(labels);
      
      expect(dto.cols).to.be.equal(3);
      expect(dto.rows).to.be.equal(4);
    });
  });
});
