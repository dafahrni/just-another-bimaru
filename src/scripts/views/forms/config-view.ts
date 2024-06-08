export class ConfigView {
  config: HTMLElement;

  constructor() {
    const config = document.getElementById("config");
    if (!config) throw new Error("Config node is missing in HTML.");

    this.config = config;

    this.setupHtml();
    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    //const configItems = this.config.querySelectorAll("li");
    //configItems.forEach((configItem, index) => {
    //  configItem.addEventListener("click", () => {
    //    this.handleConfigItemClick(index);
    //  });
    //});
  }

  handleConfigItemClick(index: number) {
    //const configItems = this.config.querySelectorAll("li");
    //if (configItems[index].classList.contains("disabled")) {
    //  return;
    //}

    switch (index) {
      case 0:
        // TODO
        //this.restartGame();
        break;
      case 1:
        // TODO
        //alert("Edit Game clicked!");
        break;
      case 2:
        // TODO
        //alert("Sound off clicked!");
        break;
      case 3:
        // TODO
        break;
      case 4:
      default:
        // TODO
        //alert("Further Options clicked!");
        break;
    }
  }

  setupHtml() {
    this.config.innerHTML = `
      <ul>
        <li>
          <div>
            <label for="gridSize">Grid Size:</label>
            <button id="decreaseButton">-</button>
            <input type="number" id="gridSize" min="8" max="12" value="10" readonly />
            <button id="increaseButton">+</button><br />
          </div>
        </li>
        <li class="disabled">
          <div>
            <label for="rowTargets">Row Targets:</label>
            <button id="decreaseButton">-</button>
            <input type="number" id="rowTargets" min="0" max="8" value="0" readonly />
            <button id="increaseButton">+</button><br />
          </div>
        </li>
        <li class="disabled">
          <div>
            <label for="colTargets">Col Targets:</label>
            <button id="decreaseButton">-</button>
            <input type="number" id="colTargets" min="0" max="8" value="0" readonly />
            <button id="increaseButton">+</button><br />
          </div>
        </li>
        <li class="disabled">
          <div>
            <label>Ship Amount:</label>
            <span id="shipAmount">Default value</span>
          </div>
        </li>
      </ul>
    `;
  }
}
