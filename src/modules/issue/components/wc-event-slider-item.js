import {LitElement, css, html} from "lit-element";
import {ifDefined} from "lit-html/directives/if-defined";
import '../../../components/wc-font';
import '../../../components/wc-date';

export class WcEventSliderItem extends LitElement {
    static get is() {
        return 'wc-event-slider-item';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <img src="${ifDefined(this.event.imageUrl)}" alt="">

            <wc-font type="regular">
                <wc-date timestamp="${this.event.timestamp}"></wc-date>
            </wc-font>

            <wc-font type="regular">
                ${this.event.title.en}
            </wc-font>
            
            <wc-font type="regular">
                ${this.event.imageAuthor.en}
            </wc-font>
        `;
    }

    static get properties() {
        return {
            event: {
                type: Object,
            },
        };
    }
}

customElements.define(WcEventSliderItem.is, WcEventSliderItem);
