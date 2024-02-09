import { FieldFactory } from "../../js/models/field-factory.js";
import { expect } from "chai";

describe("FieldFactory", () => {

  const fieldText =
    "0 | . . . \n" +
    "3 | < □ > \n" +
    "0 | ~ . . \n" +
    "1 | . o . \n" +
    "    1 2 1";

  describe("#parse()", () => {
    it("should create expected field", () => {
      let expected = fieldText;

      let testee = FieldFactory.parse(expected);

      expect(testee.asText()).to.be.equal(expected);
    });
  });
});
