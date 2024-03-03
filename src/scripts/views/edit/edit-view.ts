class EditView {

    private gridSizeControl: ValueControl;
    private shipAmountSpan: HTMLSpanElement;
    private rowTargetsSelect: HTMLSelectElement;
    private colTargetsSelect: HTMLSelectElement;

    constructor() {
        this.gridSizeControl = new ValueControl("gridSize", "decreaseButton", "increaseButton");
        this.shipAmountSpan = document.getElementById("shipAmount") as HTMLSpanElement;
        this.rowTargetsSelect = document.getElementById("rowTargets") as HTMLSelectElement;
        this.colTargetsSelect = document.getElementById("colTargets") as HTMLSelectElement;

        this.shipAmountSpan.innerText = "Default value";

        this.gridSizeControl.registerForInputChanges("input", this.updateGridSize.bind(this));
    }

    private updateGridSize() {
        const gridSize = this.gridSizeControl.value;
        const currentRowTargets = this.rowTargetsSelect.options.length;
        const currentColTargets = this.colTargetsSelect.options.length;

        if (currentRowTargets > 0 || currentColTargets > 0) {
            const confirmation = confirm("Changing the grid size will clear the current targets. Do you want to proceed?");
            if (!confirmation) {
                // Revert gridSizeControl value back to previous value
                this.gridSizeControl.value = this.shipAmountSpan.innerText;
                return;
            }
        }

        this.shipAmountSpan.innerText = String(gridSize); // Set ship amount to grid size

        this.clearOptions(this.rowTargetsSelect);
        this.clearOptions(this.colTargetsSelect);

        for (let i = 0; i < gridSize; i++) {
            const rowOption = document.createElement("option");
            rowOption.text = String(i + 1);
            this.rowTargetsSelect.add(rowOption);

            const colOption = document.createElement("option");
            colOption.text = String(i + 1);
            this.colTargetsSelect.add(colOption);
        }
    }

    private clearOptions(selectElement: HTMLSelectElement) {
        while (selectElement.options.length > 0) {
            selectElement.remove(0);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const customEditView = new EditView();
});
