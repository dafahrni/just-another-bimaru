import { ElementBuilder } from "./element-builder.js";

export class ModalDialog {

    notification: any;
    overlay: any;
    text: any;
    button: any;
    notificationTimeout: any;
    action: any;

    constructor() {
      this.notification = null;
      this.overlay = null;
      this.text = null;
      this.button = null;
      this.notificationTimeout = null;
      this.action = null;
      this.setupHtml();
    }
  
    showAlert(message: string, performAfterHiding: (() => void)) {
      // Nachricht und Aktion werden gesetzt
      this.text.textContent = message;
      this.action = performAfterHiding;
  
      // Anzeigen der Modal-Box
      this.notification.style.display = "block";
      this.overlay.style.display = "block";
  
      // Neues Timeout starten
      this.notificationTimeout = setTimeout(
        () => this.hideNotification(),
        5000
      );
    }
  
    hideNotification() {
      // Modal-Box wird ausgeblendet
      this.notification.style.display = "none";
      this.overlay.style.display = "none";
  
      // perform action after hiding of notification
      if (this.action) {
        this.action();
      } else {
        console.warn("As action is undefined, nothing is performed.");
      }
  
      // Timeout zurücksetzen
      clearTimeout(this.notificationTimeout);
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
  
      const bc = new ElementBuilder("div")
        .setClass("button-container")
        .appendTo(this.notification)
        .getResult();
  
      this.button = new ElementBuilder("button")
        .setId("confirm")
        .setText("OK")
        .appendTo(bc)
        .addListener("click", this.hideNotification.bind(this))
        .getResult();
    }
  }
  