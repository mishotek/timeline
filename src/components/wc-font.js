import {css, html, LitElement} from "lit-element";

export class WcFont extends LitElement {
    static get is() {
        return 'wc-font';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;
                font-family: sans-serif;
            }

            :host([type=title-1]) {
                font-size: var(--font-size-title-1);
            }

            :host([type=title-2]) {
                font-size: var(--font-size-title-2);
            }

            :host([type=title-3]) {
                font-size: var(--font-size-title-3);
            }

            :host([type=large]) {
                font-size: var(--font-size-large);
            }

            :host([type=regular]) {
                font-size: var(--font-size-regular);
            }

            :host([type=small]) {
                font-size: var(--font-size-small);
            }

            :host([type=micro]) {
                font-size: var(--font-size-micro);
            }
        `;
    }

    static get properties() {
        return {
            // Type can be:
            // title-1
            // title-2
            // title-3
            // large
            // regular
            // small
            // micro
            type: {
                type: String,
                reflect: true,
            },
        };
    }

    render() {
        // language=html
        return html`<slot></slot>`;
    }
}

customElements.define(WcFont.is, WcFont);