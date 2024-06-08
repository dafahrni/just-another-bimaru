export class ConfigView {
  config: HTMLElement;

  constructor() {
    const config = document.getElementById("config");
    if (!config) throw new Error("Node 'config' is missing in HTML.");

    this.config = config;

    this.setupHtml();
  }

  setupHtml() {
    this.config.innerHTML = `
      <ul>
        <li>
          <div id="grid-size"></div>
        </li>
        <li class="disabled">
          <div id="target-value"></div>
        </li>
        <li class="disabled">
          <div id="ship-selection"></div>
        </li>
      </ul>
    `;
  }
}
