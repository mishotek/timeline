import {LitElement, html, css} from "lit-element";
import './components/wc-timeline';
import './components/wc-event-slider';

export class WcIssue extends LitElement {
    static get is() {
        return 'wc-issue';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: grid;
                grid-template-rows: 1fr auto;
            }
            
            .timeline {
                padding: var(--space-base) var(--space-large);
                box-sizing: border-box;
            }
            
            .illustration {
                display: grid;
                place-items: center;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="illustration">
                <wc-event-slider id="slider" .events="${events}"></wc-event-slider>
            </div>
            
            <div class="timeline">
                <wc-timeline id="timeline" .events="${events}"></wc-timeline>
            </div>
        `;
    }

    static get properties() {
        return {
            _isTransitioning: {
                type: Boolean,
            },
        };
    }

    constructor() {
        super();
        this._isTransitioning = false;
        this._addScrollListener();
    }

    prev() {
        this._timeline.prev();
        this._slider.prev();
    }

    next() {
        this._timeline.next();
        this._slider.next();
    }

    _addScrollListener() {
        window.addEventListener('wheel', (event) => {
            if (this._isTransitioning) {
                return;
            }

            this._isTransitioning = true;

            const scrolledToTop = event.deltaY < 0;
            if (scrolledToTop) {
                this.prev();
            } else {
                this.next();
            }

            setTimeout(() => this._isTransitioning = false, 400);
        });
    }

    get _timeline() {
        return this.shadowRoot.getElementById('timeline');
    }

    get _slider() {
        return this.shadowRoot.getElementById('slider');
    }
}

customElements.define(WcIssue.is, WcIssue);

const events = [
    {
        timestamp: 1099674757000,
        title: {
            en: 'The Rose Revolution',
            ka: 'ვარდების რევოლუცია',
        },
        imageUrl: 'https://www.georgianjournal.ge/media/images/georgianews/2018/November/Politics/rose_revolution_2003_3.jpg',
        imageAuthor: {
            en: 'Giorgi Giorgadze',
            ka: 'გიორგი გიორგაძე',
        },
    },
    {
        timestamp: 1217783557000,
        title: {
            en: 'Abkhazia war',
            ka: 'აფხაზეთის ომი',
        },
        imageUrl: 'https://gdb.rferl.org/390137D0-A0A6-498B-AEA3-C51274691E45_cx0_cy10_cw0_w1200_r1.jpg',
        imageAuthor: {
            en: 'Giorgi Giorgadze',
            ka: 'გიორგი გიორგაძე',
        },
    },
    {
        timestamp: 1604164357000,
        title: {
            en: 'Elections 2020',
            ka: 'არჩევნები 2020',
        },
        imageUrl: 'https://civil.ge/wp-content/uploads/2019/03/2003elections.jpg',
        imageAuthor: {
            en: 'Giorgi Giorgadze',
            ka: 'გიორგი გიორგაძე',
        },
    },
];
