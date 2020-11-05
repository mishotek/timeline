import {LitElement, html, css} from "lit-element";

export class WcDate extends LitElement {
    static get is() {
        return 'wc-date';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;
            }
        `;
    }

    render() {
        // language=html
        return html`${this._date}`;
    }

    static get properties() {
        return {
            timestamp: {
                type: Number,
                reflect: true,
            },
        }
    }

    get _date() {
        const date = new Date(this.timestamp);
        const day = this._addZero(date.getDate());
        const month = this._addZero(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    _addZero(num, size = 2) {
        return `${num}`.padStart(size, '0');
    }
}

customElements.define(WcDate.is, WcDate);
