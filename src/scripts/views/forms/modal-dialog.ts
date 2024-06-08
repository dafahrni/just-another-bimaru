import { ModalBuilder } from "./modal-builder.js";
import { ModalConfig } from "./modal-config.js";

export class ModalDialog {
  notification: any = null;
  overlay: any = null;
  text: any = null;
  amount: any = null;
  field: any = null;
  ok: any = null;
  cancel: any = null;

  hasCancel: boolean = false;
  confirmed: boolean = false;
  minValue: number = 6;
  maxValue: number = 12;
  choosenValue: number = this.minValue;

  timeout: any = null;
  action: any = null;

  constructor() {
    this.setupHtml();
  }

  showInfo(message: string, action: () => void) {
    const config = new ModalConfig();
    config.message = message;
    config.action = action;

    this.show(config);
  }

  confirmAction(message: string, action: () => void) {
    const config = new ModalConfig();
    config.message = message;
    config.action = action;
    config.hasCancel = true;

    this.show(config);
  }

  requestAmount(message: string, action: () => void) {
    const config = new ModalConfig();
    config.message = message;
    config.action = action;
    config.hasAmount = true;

    this.setValue(this.minValue);
    this.show(config);
  }

  getValue() {
    return this.choosenValue;
  }

  show(config: ModalConfig) {
    // reset
    this.text.textContent = config.message;
    this.action = config?.action;
    this.hasCancel = config.hasCancel;
    this.confirmed = false;

    // display of modal box
    this.notification.style.display = "block";
    this.overlay.style.display = "block";
    this.amount.style.display = config.hasAmount ? "flex" : "none";
    this.cancel.style.display = this.hasCancel ? "block" : "none";
    this.ok.focus();

    if (!this.action || !config.hasTimeout) return;

    this.timeout = setTimeout(() => this.hideNotification(), 5000);
  }

  setValue(value: number) {
    this.choosenValue =
      value < this.minValue || value > this.maxValue ? this.minValue : value;
    this.field.value = `${this.choosenValue}`;
  }

  increaseValue() {
    this.setValue(this.choosenValue + 1);
  }

  decreaseValue() {
    this.setValue(this.choosenValue - 1);
  }

  confirmAndHide() {
    this.setConfirmed(true);
    this.hideNotification();
  }

  rejectAndHide() {
    this.setConfirmed(false);
    this.hideNotification();
  }

  setConfirmed(confirmed: boolean) {
    this.confirmed = confirmed;
  }

  hideNotification() {
    this.notification.style.display = "none";
    this.overlay.style.display = "none";

    // perform action after hiding of notification
    if (
      this.action &&
      (!this.hasCancel || (this.hasCancel && this.confirmed))
    ) {
      this.action();
    } else {
      console.info("As action is undefined, nothing is performed.");
    }

    clearTimeout(this.timeout);
  }

  setupHtml() {
    const board = document.getElementById("board");
    this.overlay = new ModalBuilder("div")
      .setId("overlay")
      .setClass("overlay")
      .appendTo(board)
      .getResult();
    this.notification = new ModalBuilder("div")
      .setId("notification")
      .setClass("modal")
      .appendTo(board)
      .getResult();
    this.text = new ModalBuilder("p")
      .setId("message")
      .appendTo(this.notification)
      .getResult();
    const ac = new ModalBuilder("div")
      .setClass("amount-control")
      .appendTo(this.notification)
      .getResult();
    new ModalBuilder("button")
      .setText("-")
      .appendTo(ac)
      .addListener("click", this.decreaseValue.bind(this))
      .getResult();
    this.field = new ModalBuilder("input")
      .setAttribut("readonly", true)
      .appendTo(ac)
      .getResult();
    new ModalBuilder("button")
      .setText("+")
      .appendTo(ac)
      .addListener("click", this.increaseValue.bind(this))
      .getResult();
    const bc = new ModalBuilder("div")
      .setClass("button-container")
      .appendTo(this.notification)
      .getResult();
    this.ok = new ModalBuilder("button")
      .setText("OK")
      .appendTo(bc)
      .addListener("click", this.confirmAndHide.bind(this))
      .getResult();
    this.cancel = new ModalBuilder("button")
      .setText("Cancel")
      .appendTo(bc)
      .addListener("click", this.rejectAndHide.bind(this))
      .getResult();
    this.amount = ac;
  }
}
