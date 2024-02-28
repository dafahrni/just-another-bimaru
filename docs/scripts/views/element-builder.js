export class ElementBuilder {
    constructor(elementType) {
        this.child = document.createElement(elementType);
    }
    setId(elementId) {
        this.child.id = elementId;
        return this;
    }
    setClass(elementClass) {
        this.child.classList.add(elementClass);
        return this;
    }
    setText(text) {
        this.child.textContent = text;
        return this;
    }
    addListener(eventName, callback) {
        this.child.addEventListener(eventName, callback);
        return this;
    }
    appendTo(parent) {
        parent.appendChild(this.child);
        return this;
    }
    setContent(element) {
        const firstChild = this.child.firstChild;
        if (firstChild) {
            this.child.replaceChild(firstChild, element);
        }
        else {
            this.child.appendChild(element);
        }
        return this;
    }
    getResult() {
        return this.child;
    }
}
//# sourceMappingURL=element-builder.js.map