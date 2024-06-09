import { expect } from "chai";
import { DtoFactory } from "../../../src/scripts/controllers/dtos/dto-factory.js";
import { MessageFactory } from "../../../src/scripts/messaging/message-factory.js";
import { MessageType } from "../../../src/scripts/messaging/message-type.js";
import { NewGame } from "../../../src/scripts/messaging/cmds/new-game.js";
import { GameModel } from "../../../src/scripts/models/game-model.js";
import { Broker } from "../../../src/scripts/messaging/broker.js";

describe("Broker", () => {

  describe("#publish()", () => {
    it("should place message into queue", () => {
      const model = new GameModel();
      const dto = DtoFactory.mapGame(model);
      const msg = MessageFactory.newGame(dto, false);
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

