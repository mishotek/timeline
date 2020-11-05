import {LitElement, html, css} from "lit-element";
import './src/modules/issue/wc-issue';

export class WcApp extends LitElement {
    static get is() {
        return 'wc-app';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <wc-issue style="height: 100vh"></wc-issue>
        `;
    }
}

customElements.define(WcApp.is, WcApp);
