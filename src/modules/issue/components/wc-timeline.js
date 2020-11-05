import {LitElement, html, css} from "lit-element";
import {styleMap} from "lit-html/directives/style-map";
import {classMap} from "lit-html/directives/class-map";
import '../../../components/wc-tooltip';
import '../../../components/wc-date';

export class WcTimeline extends LitElement {
    static get is() {
        return 'wc-timeline';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
            }
            
            .row {
                height: var(--space-tiny);
                background-color: var(--color-black-10);
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
            }
            
            .row:after {
                display: block;
                content: '';
                height: 100%;
                width: var(--progress);
                background: var(--color-black-40);

                will-change: width;
                transition: 0.3s;
            }
            
            .event {
                cursor: pointer;
                background: var(--color-solid-shade-10);
                height: var(--space-small);
                width: var(--space-small);
                border-radius: var(--radius-circle);
                box-shadow: var(--shadow-10);
                
                will-change: box-shadow, transform;
                transition: box-shadow 0.3s, transform 0.3s;
            }
            
            .event:hover {
                transform: scale(1.1);
                box-shadow: var(--shadow-20);
            }
            
            .event:active {
                transform: scale(1.1);
                box-shadow: var(--shadow-10);
            }

            .event--active {
                transform: scale(1.2);
            }
            
            .event-tooltip {
                position: absolute;
                transform: translateX(-50%);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="row" style="--progress: ${this._progress};">
                ${this._events.map((event, index) => html`
                    <wc-tooltip class="event-tooltip" style="${styleMap({left: event._left})}">
                        <wc-date slot="tooltip" timestamp="${event.timestamp}"></wc-date>
                        <div class="event ${classMap({'event--active': index === this.index})}"></div>
                    </wc-tooltip>
                `)}
            </div>
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
            _events: {
                type: Array,
            },
            _progress: {
                type: String,
            },
        };
    }

    constructor() {
        super();
        this.events = [];
        this.index = 0;
        this._events = [];
        this._progress = '0%';
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has('events')) {
            this._events = this._formatEvents(this.events);
        }

        if (_changedProperties.has('index')) {
            this._progress = this._getProgress(this._events, this.index);
        }
    }

    next() {
        if (this.index < this._events.length - 1) {
            this.index++;
        }
    }

    prev() {
        if (this.index > 0) {
            this.index--;
        }
    }

    _formatEvents(events) {
        const {minDate, maxDate} = this._getMinMaxDates(events);

        return events.map(event => ({
            ...event,
            _left: this._getEventLeft(minDate, maxDate, event.timestamp),
        })).sort((a, b) => a.timestamp - b.timestamp);
    }

    _getProgress(events, index) {
        const {minDate, maxDate} = this._getMinMaxDates(events);
        const currDate = events[index] ? events[index].timestamp : NaN;

        return this._getEventLeft(minDate, maxDate, currDate);
    }

    _getEventLeft(minDate, maxDate, curr) {
        const length = maxDate - minDate;
        return `${Math.floor((curr - minDate) / length * 100)}%`;
    }

    _getMinMaxDates(events) {
        const timestamps = events.map(event => event.timestamp);
        const minDate = Math.min(...timestamps);
        const maxDate = Math.max(...timestamps);

        return {minDate, maxDate};
    }
}

customElements.define(WcTimeline.is, WcTimeline);
