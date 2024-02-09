import { FieldFactory } from "../../../js/models/board/field-factory.js";
import { expect } from "chai";

describe("Field", () => {
  
  const fieldText =
    "3 | < □ > \n" +
    "0 | . . . \n" +
    "1 | ^ . . \n" +
    "2 | v . o \n" +
    "    3 1 2";

  describe("#symbolsToTheEastAre()", () => {
    it("should return true when invoked with <□>", () => {
      let testee = FieldFactory.parse(fieldText);
      let cell = testee.getCell(0, 0);

      let result = testee.symbolsToTheEastAre(cell, "<□>");

      expect(result).to.be.true;
    });
  });

  describe("#symbolsToTheSouthAre()", () => {
    it("should return true when invoked with ^v", () => {
      let testee = FieldFactory.parse(fieldText);
      let cell = testee.getCell(0, 2);

      let result = testee.symbolsToTheSouthAre(cell, "^v");

      expect(result).to.be.true;
    });
  });

  describe("#getSlotsOfSize()", () => {
    it("should return expected amount of slots", () => {
      let testee = FieldFactory.parse(
        "3 | . ~ . . . . . . . . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "7 | . ~ . . . . . ~ . . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . ~ ^ ~ . . . . . . \n" +
        "1 | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | ^ ~ ~ ~ . . . . . . \n" +
        "1 | s ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . ~ . . . . ~ o ~ . \n" +
        "    4 0 4 2 1 4 1 2 1 1"
      );

      let slots = testee.getSlotsOfSize(4);

      expect(slots.length).to.be.equal(2);
    });
  });

  describe("#getSlotsOfSize()", () => {
    it.skip("should return expected amount of slots", () => {
      let testee = FieldFactory.parse(
        "4 | ~ ~ . . ~ . . . . . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . . . . . \n" +
        "1 | ~ ~ . . ~ . . ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "1 | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ . . . \n" +
        "1 | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    1 0 3 1 0 7 1 1 5 1 "
      );

      let slots = testee.getSlotsOfSize(4);

      expect(slots.length).to.be.equal(4);
    });
  });
});
