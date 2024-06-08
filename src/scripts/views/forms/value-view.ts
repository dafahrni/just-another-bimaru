import { ValueConfig } from "./value-config";

export class ValueView {
  valueControl: Element;
  input: HTMLInputElement;
  decBtn: Element;
  incBtn: Element;

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

  get value(): number {
    return parseInt(this.input.value);
  }

  set value(value: string) {
    this.input.value = `${value}`;
  }

  registerForInputChanges(
    type: string,
    listener: EventListenerOrEventListenerObject
  ) {
    this.input.addEventListener(type, listener);
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
    const event = new Event("input", { bubbles: true });
    this.input.dispatchEvent(event);
  }

  setupHtml(cfg: ValueConfig) {
    this.valueControl.innerHTML = `
      <div>
        <label for="${cfg.id}-value">${cfg.labelText}</label>
        <button class="dec-btn">-</button>
        <input type="number" id="${cfg.id}-value" min="${cfg.min}" max="${cfg.max}" value="${cfg.val}" readonly />
        <button class="inc-btn">+</button><br />
      </div>
    `;
  }
}
