/**
 * Denkacomponents.js
 * The DenkaTech components library
 */
class DenkaTitle extends HTMLElement {
    // internal component styling
    static css = `
        :host {            
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 700;
            
            font-size: 2.5em;
            
            color: rgb(14, 129, 81);
            margin: 50px;
        }

        .margins {
            margin-top:50px;
            margin-bottom:20px;
        }
    `;

    static get observedAttributes() {
        return ["title-text"];
      }

    // Always call the constructor for custom components
    constructor() {
        super();
        // Activate the shadow DOM
        this.attachShadow({mode: "open"});

        // Set the style
        const style = document.createElement("style");
        style.innerHTML = DenkaTitle.css;
        // Add the class
        const titletext = document.createElement("div");
        titletext.classList.add("title-text")
        titletext.classList.add("margins")

        // Get the caption attribute
        titletext.innerText = this.my_caption;
        
        this.shadowRoot.append(style,titletext);
    }

    /* getters and setters */
    get my_caption() {        
        const capt = this.getAttribute("caption");
        return capt;
    }

    set my_caption(value) {
        this.setAttribute("title-text") = value ;
      }

}

customElements.define("denka-title", DenkaTitle);