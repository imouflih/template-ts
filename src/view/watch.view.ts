import WatchModel from "../model/watch.model";
import { Observer } from "../utils/observable";

const WATCH_TEMPLATE = `
<div id="watch">
    <div id="time-display"></div>
    <button id="mode-button" class="button mode-button" data-text="Mode"></button>
    <button id="increase-button" class="button increase-button" data-text="Increase"></button>
    <button id="light-button" class="button light-button" data-text="Light"></button>
    <button id="reset-button" class="button reset-button" data-text="Reset"></button>
</div>
`;

export interface WatchViewSpecifier {
    changeModeEvent: Observer;
    increaseTimeEvent: Observer;
    toggleLightEvent: Observer;
    resetTimeEvent: Observer;
    changeHour12Event: Observer;
}

class WatchView {
    private mainElement: HTMLElement;
    private timeDisplay: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;
    private resetButton: HTMLElement;

    constructor(private model: WatchModel, private specifier: WatchViewSpecifier) { }

    createElements(container: HTMLElement) {
        this.mainElement = document.createElement("div");
        this.mainElement.classList.add("watch-container");
        this.mainElement.innerHTML = WATCH_TEMPLATE;
        container.appendChild(this.mainElement);

        this.timeDisplay = this.mainElement.querySelector("#time-display");
        this.modeButton = this.mainElement.querySelector("#mode-button");
        this.increaseButton = this.mainElement.querySelector("#increase-button");
        this.lightButton = this.mainElement.querySelector("#light-button");
        this.resetButton = this.mainElement.querySelector("#reset-button");
    }

    initListeners() {
        this.model.subscribe(this.renderTime.bind(this));
        this.model.subscribe(this.renderLight.bind(this));

        this.modeButton.addEventListener("click", this.handleModeClick.bind(this));
        this.increaseButton.addEventListener("click", this.handleIncreaseClick.bind(this));
        this.lightButton.addEventListener("click", this.handleLightClick.bind(this));
        this.resetButton.addEventListener("click", this.handleResetClick.bind(this));
        this.timeDisplay.addEventListener("dblclick", this.handleHour12Change.bind(this));
    }

    private renderTime() {
        const time = this.model.currentTime;
        let hours = String((time.getHours() + this.model.timeZone + 24) % 24).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");

        let amPm = "";

        if (this.model.hour12) {
            hours = String(Number(hours) % 12).padStart(2, "0");
            amPm = time.getHours() >= 12 ? "PM" : "AM";
        }

        if (this.model.mode === "edit-hour") {
            this.timeDisplay.innerHTML = `<span class="blink">${hours}</span>:${minutes}:${seconds} ${amPm}`;
        } else if (this.model.mode === "edit-minute") {
            this.timeDisplay.innerHTML = `${hours}:<span class="blink">${minutes}</span>:${seconds} ${amPm}`;
        } else {
            this.timeDisplay.innerHTML = `${hours}:${minutes}:${seconds} ${amPm}`;
        }
    }

    private renderLight() {
        if (this.model.lightOn) {
            this.timeDisplay.classList.add("light-on");
        } else {
            this.timeDisplay.classList.remove("light-on");
        }
    }

    private handleModeClick() {
        this.specifier.changeModeEvent();
    }

    private handleIncreaseClick() {
        this.specifier.increaseTimeEvent();
    }

    private handleLightClick() {
        this.specifier.toggleLightEvent();
    }

    private handleResetClick() {
        this.specifier.resetTimeEvent();
    }

    private handleHour12Change(e: Event) {
        this.specifier.changeHour12Event((e.target as HTMLSelectElement).value);
    }
}

export default WatchView;
