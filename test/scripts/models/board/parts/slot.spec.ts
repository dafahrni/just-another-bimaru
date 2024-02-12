import { expect } from "chai";
import { CellLine } from "../../../../../src/scripts/models/board/parts/cell-line.js";

describe("Slot", () => {
  describe("#split()", () => {
    it("should return 0 slots when size > target", () => {
      var text = "3 | . . . ~ . .";
      var line = CellLine.parse(text);
      var testee = line.findSlots()[0];

      var slots = testee.split(4);

      expect(slots.length).to.be.equal(0);
    });
  });
  describe("#split()", () => {
    it("should return 1 slot when size = target", () => {
      var text = "3 | . . . ~ . .";
      var line = CellLine.parse(text);
      var testee = line.findSlots()[0];

      var slots = testee.split(3);

      expect(slots.length).to.be.equal(1);
    });
  });
  describe("#split()", () => {
    it("should return several slots when size < target", () => {
      var text = "3 | . . . ~ . .";
      var line = CellLine.parse(text);
      var testee = line.findSlots()[0];

      var slots = testee.split(2);

      expect(slots.length).to.be.equal(2);
    });
  });
  describe("#split()", () => {
    it("should return several slots when size < target", () => {
      var text = "7 | ^ ~ . . . s □ s . ~";
      var line = CellLine.parse(text);
      var testee = line.findSlots(4)[0];

      var slots = testee.split(4);

      expect(slots.length).to.be.equal(2);
    });
  });
});
