import { ElementBuilder } from "./element-builder.js";
import { ModalConfig } from "./modal-config.js";

export class ModalDialog {

    private notification: any = null;
    private overlay: any = null;
    private text: any = null;
    private amount: any = null;
    private field: any = null;
    private ok: any = null;
    private cancel: any = null;

    private hasCancel: boolean = false;
    private confirmed: boolean = false;
    private minValue: number = 6;
    private maxValue: number = 12;
    private choosenValue: number = this.minValue;

    private timeout: any = null;
    private action: any = null;

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
  
      if (!this.action || !config.hasTimeout)
        return;

      this.timeout = setTimeout(
        () => this.hideNotification(),
        5000
      );
    }
  
    setValue(value: number) {
      this.choosenValue = value < this.minValue || value > this.maxValue
        ? this.minValue
        : value;
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
      if (this.action && (!this.hasCancel || this.hasCancel && this.confirmed)) {
        this.action();
      } else {
        console.info("As action is undefined, nothing is performed.");
      }
  
      clearTimeout(this.timeout);
    }
  
    setupHtml() {
      const root = document.getElementById("root");
      this.overlay = new ElementBuilder("div")
        .setId("overlay")
        .setClass("overlay")
        .appendTo(root)
        .getResult();
      this.notification = new ElementBuilder("div")
        .setId("notification")
        .setClass("modal")
        .appendTo(root)
        .getResult();
      this.text = new ElementBuilder("p")
        .setId("message")
        .appendTo(this.notification)
        .getResult();
      const ac = new ElementBuilder("div")
        .setClass("amount-control")
        .appendTo(this.notification)
        .getResult();
      new ElementBuilder("button")
        .setText("-")
        .appendTo(ac)
        .addListener("click", this.decreaseValue.bind(this))
        .getResult();
      this.field = new ElementBuilder("input")
        .setAttribut("readonly", true)
        .appendTo(ac)
        .getResult();
      new ElementBuilder("button")
        .setText("+")
        .appendTo(ac)
        .addListener("click", this.increaseValue.bind(this))
        .getResult();
      const bc = new ElementBuilder("div")
        .setClass("button-container")
        .appendTo(this.notification)
        .getResult();
      this.ok = new ElementBuilder("button")
        .setText("OK")
        .appendTo(bc)
        .addListener("click", this.confirmAndHide.bind(this))
        .getResult();
      this.cancel = new ElementBuilder("button")
        .setText("Cancel")
        .appendTo(bc)
        .addListener("click", this.rejectAndHide.bind(this))
        .getResult();
      this.amount = ac;
    }
  }
  