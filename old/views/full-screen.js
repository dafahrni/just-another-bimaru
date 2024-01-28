export class FullScreen {
    constructor() {
      this._button = document.getElementById("fullscreen-button");
      this._button.addEventListener("click", () => this._handleButtonClick());
      this._button.textContent = "FULL SCR";
      this._isActivated = false;
    }
  
    get isActivated() {
      return this._isActivated;
    }
  
    get isSupported() {
      const element = document.documentElement;
      return (
        element.requestFullscreen ||
        element.mozRequestFullScreen || // Firefox
        element.webkitRequestFullscreen || // Chrome, Safari und Opera
        element.msRequestFullscreen // Internet Explorer
      );
    }
  
    showButton() {
      this._button.hidden = false;
    }
  
    hideButton() {
      this._button.hidden = true;
    }
  
    _handleButtonClick() {
      if (this._isActivated) {
        this._deactivate();
      } else {
        this._activate();
      }
    }
  
    _activate() {
      // Funktion, um den Vollbildmodus zu aktivieren
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      this._button.textContent = "NORMAL";
      this._isActivated = true;
    }
  
    _deactivate() {
      // Funktion, um den Vollbildmodus zu deaktivieren
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this._button.textContent = "FULL SCR";
      this._isActivated = false;
    }
  }
