export class SvgGenerator {
    constructor() {
      this._svgNamespace = "http://www.w3.org/2000/svg";
    }
  
    generateDefault(color = "black") {
      const svg = this._createSvg();
  
      const rectAttributes = {
        width: "10", height: "10",
        fill: color
      };
  
      const rect = this._createPart(rectAttributes, "rect");
      svg.appendChild(rect);
  
      return svg;
    }
  
    generateO(color) {
      const svg = this._createSvg();
  
      const circleAttributes = {
        cx: "50", cy: "50", r: "37",
        stroke: color,
        "stroke-width": "20",
        fill: "transparent"
      };
  
      const circle = this._createPart(circleAttributes, "circle");
      svg.appendChild(circle);
  
      return svg;
    }
  
    generateX(color) {
      const svg = this._createSvg();
  
      // Gemeinsame Vorlage für die Linienattribute
      const lineAttributesTemplate = {
        x1: "10", y1: "10",
        x2: "90", y2: "90",
        stroke: color,
        "stroke-width": "20",
      };
  
      // Erstellen der Linien mit der gemeinsamen Vorlage
      const line1 = this._createPart(lineAttributesTemplate, "line");
      const line2 = this._createPart(lineAttributesTemplate, "line");
  
      // Anpassen von spezifischen Attributen für line2
      this._setAttributes(line2, {
        x1: "90", y1: "10",
        x2: "10", y2: "90",
      });
  
      // Hinzufügen zum SVG-Element
      svg.appendChild(line1);
      svg.appendChild(line2);
  
      return svg;
    }
  
    _createSvg() {
      const svg = document.createElementNS(this._svgNamespace, "svg");
      this._setAttributes(svg, {
        xmlns: this._svgNamespace,
        viewBox: "0 0 100 100",
      });
      return svg;
    }
  
    _createPart(attributes, form) {
      const part = document.createElementNS(this._svgNamespace, form);
      this._setAttributes(part, attributes);
      return part;
    }
  
    _setAttributes(element, attributes) {
      for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          element.setAttribute(key, attributes[key]);
        }
      }
    }
  }
  