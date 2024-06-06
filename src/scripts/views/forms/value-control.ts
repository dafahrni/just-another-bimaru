class ValueControl {

    inputElement: HTMLInputElement;
    decreaseButton: HTMLButtonElement;
    increaseButton: HTMLButtonElement;

    constructor(inputId: string, decreaseButtonId: string, increaseButtonId: string) {
        this.inputElement = document.getElementById(inputId) as HTMLInputElement;
        this.decreaseButton = document.getElementById(decreaseButtonId) as HTMLButtonElement;
        this.increaseButton = document.getElementById(increaseButtonId) as HTMLButtonElement;

        this.decreaseButton.addEventListener("click", this.decreaseValue.bind(this));
        this.increaseButton.addEventListener("click", this.increaseValue.bind(this));
    }

    get value(): number {
        return parseInt(this.inputElement.value);
    }

    set value(value: string) {
        this.inputElement.value = `${value}`;
    }

    registerForInputChanges(type: string, listener: EventListenerOrEventListenerObject) {
        this.inputElement.addEventListener(type, listener);
    }

    decreaseValue() {
        let currentValue = parseInt(this.inputElement.value);
        if (currentValue > parseInt(this.inputElement.min)) {
            currentValue--;
            this.inputElement.value = String(currentValue);
            this.dispatchEvent();
        }
    }

    increaseValue() {
        let currentValue = parseInt(this.inputElement.value);
        if (currentValue < parseInt(this.inputElement.max)) {
            currentValue++;
            this.inputElement.value = String(currentValue);
            this.dispatchEvent();
        }
    }

    dispatchEvent() {
        const event = new Event("input", { bubbles: true });
        this.inputElement.dispatchEvent(event);
    }
}
