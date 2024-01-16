export class ElementBuilder {
    constructor(elementType) {
      this._child = document.createElement(elementType);
    }
  
    setId(elementId) {
      this._child.id = elementId;
      return this;
    }
  
    setClass(elementClass) {
      this._child.classList.add(elementClass);
      return this;
    }
  
    setText(text) {
      this._child.textContent = text;
      return this;
    }
  
    addListener(eventName, callback) {
      this._child.addEventListener(eventName, callback);
      return this;
    }
  
    appendTo(parent) {
      parent.appendChild(this._child);
      return this;
    }
  
    setContent(element) {
      const firstChild = this._child.firstChild;
      if (firstChild) {
        this._child.replaceChild(firstChild, element);
      } else {
        this._child.appendChild(element);
      }
      return this;
    }
  
    getResult() {
      return this._child;
    }
  }
