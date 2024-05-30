export class ElementBuilder {
    
  private child: HTMLElement;

    constructor(elementType: string) {
      this.child = document.createElement(elementType);
    }
  
    setId(elementId: string) {
      this.child.id = elementId;
      return this;
    }
  
    setClass(elementClass: string) {
      this.child.classList.add(elementClass);
      return this;
    }

    setAttribut(name: string, value: any) {
      this.child.setAttribute(name, value);
      return this;
    }
  
    setText(text: string | null) {
      this.child.textContent = text;
      return this;
    }
  
    addListener(eventName: string, callback: { (): void; (this: HTMLElement, ev: any): any; }) {
      this.child.addEventListener(eventName, callback);
      return this;
    }
  
    appendTo(parent: any) {
      parent.appendChild(this.child);
      return this;
    }
  
    setContent(element: any) {
      const firstChild = this.child.firstChild;
      if (firstChild) {
        this.child.replaceChild(firstChild, element);
      } else {
        this.child.appendChild(element);
      }
      return this;
    }
  
    getResult() {
      return this.child;
    }
  }
