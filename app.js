import {LitElement, html, css} from "lit-element";

export class WcApp extends LitElement {
    static get is() {
        return 'wc-app';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                color: red;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <p>Hello world!</p>
        `;
    }
}

customElements.define(WcApp.is, WcApp);
