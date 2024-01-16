import { ElementBuilder } from "./element-builder.js";

export class ModalDialog {
    constructor() {
      this._notification = null;
      this._overlay = null;
      this._text = null;
      this._button = null;
      this._notificationTimeout = null;
      this._action = null;
      this._setupHtml();
    }
  
    showAlert(message, performAfterHiding) {
      // Nachricht und Aktion werden gesetzt
      this._text.textContent = message;
      this._action = performAfterHiding;
  
      // Anzeigen der Modal-Box
      this._notification.style.display = "block";
      this._overlay.style.display = "block";
  
      // Neues Timeout starten
      this._notificationTimeout = setTimeout(
        () => this._hideNotification(),
        5000
      );
    }
  
    _hideNotification() {
      // Modal-Box wird ausgeblendet
      this._notification.style.display = "none";
      this._overlay.style.display = "none";
  
      // perform action after hiding of notification
      if (this._action) {
        this._action();
      } else {
        console.warn("As action is undefined, nothing is performed.");
      }
  
      // Timeout zurücksetzen
      clearTimeout(this._notificationTimeout);
    }
  
    _setupHtml() {
      const root = document.getElementById("root");
  
      this._overlay = new ElementBuilder("div")
        .setId("overlay")
        .setClass("overlay")
        .appendTo(root)
        .getResult();
  
      this._notification = new ElementBuilder("div")
        .setId("notification")
        .setClass("modal")
        .appendTo(root)
        .getResult();
  
      this._text = new ElementBuilder("p")
        .setId("message")
        .appendTo(this._notification)
        .getResult();
  
      const bc = new ElementBuilder("div")
        .setClass("button-container")
        .appendTo(this._notification)
        .getResult();
  
      this._button = new ElementBuilder("button")
        .setId("confirm")
        .setText("OK")
        .appendTo(bc)
        .addListener("click", this._hideNotification.bind(this))
        .getResult();
    }
  }
  