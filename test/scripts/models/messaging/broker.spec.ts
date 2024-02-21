import { expect } from "chai";
import { DtoFactory } from "../../../../src/scripts/models/dtos/dto-factory.js";
import { Message, MessageType, NewGame } from "../../../../src/scripts/models/messaging/message.js";
import { GameModel } from "../../../../src/scripts/models/game-model.js";
import { Broker } from "../../../../src/scripts/models/messaging/broker.js";

describe("Broker", () => {

  describe("#publish()", () => {
    it("should place message into queue", () => {
      const model = new GameModel();
      const dto = DtoFactory.mapGame(model);
      const msg = Message.newGame(dto);
      const testee = Broker.get();

      testee.publish(msg);

      const msgReceived = testee.consume(MessageType.NewGame);
      const dtoReceived = (msgReceived as NewGame).dto; 
      expect(dtoReceived.labels).to.be.equal(dto.labels);
      expect(dtoReceived.size).to.be.equal(dto.size);
      expect(dtoReceived.values).to.be.equal(dto.values);
    });
  });
});

