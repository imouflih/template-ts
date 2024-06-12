import { Observer } from "../utils/observable";

const HEADER_TEMPLATE = `
<select id="time-zone-selector"></select>
<button id="add-watch-button">Add new watch</button>
`;

interface WatchViewSpecifier {
    addWatchEvent: Observer[];
}

class HeaderView {
    private timeZoneValue: number;
    private mainElement: HTMLElement;
    private timeZoneSelector: HTMLElement;
    private addWatchButton: HTMLElement;
    constructor(private specifier: WatchViewSpecifier) {
        this.timeZoneValue = 0;
    }

    createElements(container: HTMLElement) {
        this.mainElement = document.createElement("div");
        this.mainElement.innerHTML = HEADER_TEMPLATE;
        container.appendChild(this.mainElement);

        this.timeZoneSelector = this.mainElement.querySelector("#time-zone-selector");
        this.addWatchButton = this.mainElement.querySelector("#add-watch-button");

        for (let i = -11; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = `GMT ${i >= 0 ? '+' : ''}${i}`;
            this.timeZoneSelector.appendChild(option);
            if (i === 0) {
                option.selected = true;
            }
        }
    }

    initListeners() {
        this.timeZoneSelector.addEventListener('change', (e) => {
            this.timeZoneValue = +(e.target as HTMLSelectElement).value;
        });

        this.addWatchButton.addEventListener('click', () => this.handleAddWatch(this.timeZoneValue));
    }

    private handleAddWatch = (timeZoneValue: number) => {
        this.specifier.addWatchEvent.forEach(event => event(timeZoneValue));
    }
}

export default HeaderView;
