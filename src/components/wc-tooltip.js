import {LitElement, html, css} from "lit-element";
import './wc-font';

export class WcTooltip extends LitElement {
    static get is() {
        return 'wc-tooltip';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                position: relative;
                justify-content: center;
            }
            
            :host(:hover) .tooltip {
                opacity: 1;
            }
            
            .tooltip {
                position: absolute;
                padding: var(--space-micro) var(--space-tiny);
                background: var(--color-black-50);
                color: var(--color-white-80);
                bottom: calc(100% + var(--space-tiny));
                border-radius: var(--radius-small);
                opacity: 0;
                pointer-events: none;
                
                will-change: opacity;
                transition: opacity 0.3s;
            }
        `;
    }

    render() {
        // language=html
        return html`                
            <div class="tooltip">
                <wc-font type="micro">
                    <slot name="tooltip"></slot>
                </wc-font>
            </div>
            <slot></slot>
        `;
    }
}

customElements.define(WcTooltip.is, WcTooltip);
