import { Broker } from "./broker";

export class BrokerFactory {

  private static instance: Broker;

  static get(): Broker {
      if (!BrokerFactory.instance) {
        BrokerFactory.instance = new Broker();
      }
      return BrokerFactory.instance;
  }
}
