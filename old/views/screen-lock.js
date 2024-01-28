export class ScreenLock {
    constructor() {
      this._button = document.getElementById("screen-lock-button");
      this._button.addEventListener("click", () => this._handleButtonClick());
      this._isActivated = false;
      this._updateText();
      window.addEventListener('orientationchange', () => this._updateText());
    }
  
    get isActivated() {
      return this._isActivated;
    }
  
    get isSupported() {
      return this._screenOrientation !== null;
    }
  
    showButton() {
      this._button.hidden = false;
    }
  
    hideButton() {
      this._button.hidden = true;
    }
  
    _handleButtonClick() {
      if (this.isActivated) {
        this._deactivate();
      } else {
        this._activate();
      }
      this._updateText();
    }
  
    _activate() {
      if (this._screenOrientation && this._screenOrientation.lock) {
        this._screenOrientation.lock(this._screenOrientation?.type);
      }
      this._isActivated = true;
    }
  
    _deactivate() {
      if (this._screenOrientation && this._screenOrientation.unlock) {
        this._screenOrientation.unlock();
      }
      this._isActivated = false;
    }
  
    _updateText() {
      if (this.isActivated) {
        this._button.textContent = "UNLOCK";
      } else {
        this._button.textContent = `LOCK ${
          this._screenOrientation?.type.split("-")[0]
        }`;
      }
    }
  
    get _screenOrientation() {
      return screen.orientation || screen.mozOrientation || screen.msOrientation;
    }
  }
