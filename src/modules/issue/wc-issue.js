import {LitElement, html, css} from "lit-element";
import '../../components/wc-timeline';

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
        `;
    }

    render() {
        // language=html
        return html`
            <div class="illustration">
                
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
        this._getTimeline.prev();
    }

    next() {
        this._getTimeline.next();
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

            setTimeout(() => this._isTransitioning = false, 300);
        });
    }

    get _getTimeline() {
        return this.shadowRoot.getElementById('timeline');
    }
}

customElements.define(WcIssue.is, WcIssue);

const events = [
    {
        timestamp: 1099674757000,
        title: {
            en: 'The rose revolution',
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
