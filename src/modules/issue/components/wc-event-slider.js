import {css, html, LitElement} from "lit-element";
import './wc-event-slider-item';
import {classMap} from "lit-html/directives/class-map";

export class WcEventSlider extends LitElement {
    static get is() {
        return 'wc-event-slider';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .item {
                position: absolute;
                opacity: 0;
                
                will-change: opacity;
                transition: 0.4s;
            }
            
            .item-visible {
                opacity: 1;
            }
        `;
    }

    render() {
        // language=html
        return html`
            ${this.events.map((event, index) => html`
                <wc-event-slider-item
                        class="item ${classMap({'item-visible': index === this.index})}"
                        .event="${event}">
                </wc-event-slider-item>
            `)}
        `;
    }

    static get properties() {
        return {
            events: {
                type: Array,
            },
            index: {
                type: Number,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.events = [];
        this.index = 0;
    }

    next() {
        if (this.index < this.events.length - 1) {
            this.index++;
        }
    }

    prev() {
        if (this.index > 0) {
            this.index--;
        }
    }
}

customElements.define(WcEventSlider.is, WcEventSlider);