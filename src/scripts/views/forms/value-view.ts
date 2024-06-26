import { ValueConfig } from "./value-config.js";
import { Broker } from "../../messaging/broker.js";

export class ValueView {
  broker: Broker = Broker.get();
  valueControl: Element;
  input: HTMLInputElement;
  decBtn: Element;
  incBtn: Element;
  notifyValueChanged: any;

  constructor(cfg: ValueConfig) {
    const value = document.getElementById(`${cfg.id}`);
    if (!value) throw new Error(`Node '${cfg.id}' is missing in HTML.`);

    this.valueControl = value;
    this.setupHtml(cfg);

    const input = document.getElementById(`${cfg.id}-value`) as HTMLInputElement;
    const decBtn = document.querySelector(`#${cfg.id} .dec-btn`);
    const incBtn = document.querySelector(`#${cfg.id} .inc-btn`);
    if (!input) throw new Error(`Node '${cfg.id}-value' is missing in HTML.`);
    if (!decBtn) throw new Error(`Node '${cfg.id}-value .dec-btn' is missing in HTML.`);
    if (!incBtn) throw new Error(`Node '${cfg.id}-value .inc-btn' is missing in HTML.`);

    this.input = input;
    this.decBtn = decBtn;
    this.incBtn = incBtn;

    this.decBtn.addEventListener("click", this.decreaseValue.bind(this));
    this.incBtn.addEventListener("click", this.increaseValue.bind(this));
  }

  get selectedValue(): number {
    return parseInt(this.input.value);
  }

  set selectedValue(value: number) {
    this.input.value = `${value}`;
  }

  registerForValueChanges(handler: any) {
    this.notifyValueChanged = handler;
  }

  decreaseValue() {
    let currentValue = parseInt(this.input.value);
    if (currentValue > parseInt(this.input.min)) {
      currentValue--;
      this.input.value = String(currentValue);
      this.dispatchEvent();
    }
  }

  increaseValue() {
    let currentValue = parseInt(this.input.value);
    if (currentValue < parseInt(this.input.max)) {
      currentValue++;
      this.input.value = String(currentValue);
      this.dispatchEvent();
    }
  }

  dispatchEvent() {
    if (this.notifyValueChanged) {
      this.notifyValueChanged(this.input.value);
    }
  }

  setupHtml(cfg: ValueConfig) {
    this.valueControl.innerHTML = `
      <label for="${cfg.id}-value">${cfg.labelText}</label>
      <button class="dec-btn">-</button>
      <input type="number" id="${cfg.id}-value" min="${cfg.min}" max="${cfg.max}" value="${cfg.val}" readonly />
      <button class="inc-btn">+</button><br />
    `;
  }
}
