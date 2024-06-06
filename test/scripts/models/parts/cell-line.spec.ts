import { expect } from "chai";
import { CellLine } from "../../../../src/scripts/models/parts/cell-line.js";

describe("CellLine", () => {
  describe("#getCurrentAmount()", () => {
    it("should return 0 after creation", () => {
      let line = CellLine.from(2, 3);

      expect(line.getCurrentAmount()).to.be.equal(0);
    });
  });

  describe("#parse()", () => {
    it("should create expected line", () => {
      let text = "3 | . . . ~ . .";

      let line = CellLine.parse(text);

      expect(line.asText()).to.be.equal(text);
    });
  });

  describe("#findSlots()", () => {
    it("should return expected slots", () => {
      let text = "3 | . . . ~ . .";
      let line = CellLine.parse(text);

      let slots = line.findSlots();

      expect(slots.length).to.be.equal(2);
      expect(slots[0].size).to.be.equal(3);
      expect(slots[1].size).to.be.equal(2);
    });
  });

  describe("#findSlots()", () => {
    it("should return expected slots", () => {
      let text = "3 | . . . s . .";
      let line = CellLine.parse(text);

      let slots = line.findSlots();
       
      expect(slots.length).to.be.equal(1);
      expect(slots[0].size).to.be.equal(6);
    });
  });
});
