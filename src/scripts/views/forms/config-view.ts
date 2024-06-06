export class ConfigView {
  constructor() {
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
}
