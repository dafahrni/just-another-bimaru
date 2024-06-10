export class ConfigView {
    constructor() {
        const config = document.getElementById("config");
        if (!config)
            throw new Error("Node 'config' is missing in HTML.");
        this.config = config;
        this.setupHtml();
    }
    setupHtml() {
        this.config.innerHTML = `
      <ul>
        <li class="disabled">
          <div id="grid-size"></div>
        </li>
        <li>
          <div id="target-value"></div>
        </li>
        <li>
          <div id="ship-selection"></div>
        </li>
      </ul>
    `;
    }
}
//# sourceMappingURL=config-view.js.map