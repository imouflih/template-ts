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
    changeModeEvent: Observer[];
    increaseTimeEvent: Observer[];
    toggleLightEvent: Observer[];
    resetTimeEvent: Observer[];
    changeHour12Event: Observer[];
}

class WatchView {
    private mainElement: HTMLElement;
    private timeDisplay: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;
    private resetButton: HTMLElement;

    constructor(
        private model: WatchModel,
        private specifier: WatchViewSpecifier
    ) { }

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
        this.model.subscribe(this.renderTime);
        this.model.subscribe(this.renderLight);

        this.modeButton.addEventListener("click", this.handleModeClick);
        this.increaseButton.addEventListener(
            "click",
            this.handleIncreaseClick
        );
        this.lightButton.addEventListener(
            "click",
            this.handleLightClick
        );
        this.resetButton.addEventListener(
            "click",
            this.handleResetClick
        );
        this.timeDisplay.addEventListener(
            "dblclick",
            this.handleHour12Change
        );
    }

    private renderTime = () => {
        const time = this.model.currentTime;
        let hours = String(
            (time.getHours() + this.model.timeZone + 24) % 24
        ).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");

        let amPm = "";

        if (this.model.hour12) {
            amPm = +hours >= 12 ? "PM" : "AM";
            hours = String(+hours === 12 ? 12 : +hours % 12).padStart(2, "0");
        }

        if (this.model.mode === "edit-hour") {
            this.timeDisplay.innerHTML = `<span class="blink">${hours}</span>:${minutes}:${seconds} ${amPm}`;
        } else if (this.model.mode === "edit-minute") {
            this.timeDisplay.innerHTML = `${hours}:<span class="blink">${minutes}</span>:${seconds} ${amPm}`;
        } else {
            this.timeDisplay.innerHTML = `${hours}:${minutes}:${seconds} ${amPm}`;
        }
    }

    private renderLight = () => {
        if (this.model.lightOn) {
            this.timeDisplay.classList.add("light-on");
        } else {
            this.timeDisplay.classList.remove("light-on");
        }
    }

    private handleModeClick = () => {
        this.specifier.changeModeEvent.forEach(event => event());
    }

    private handleIncreaseClick = () => {
        this.specifier.increaseTimeEvent.forEach(event => event());
    }

    private handleLightClick = () => {
        this.specifier.toggleLightEvent.forEach(event => event());
    }

    private handleResetClick = () => {
        this.specifier.resetTimeEvent.forEach(event => event());
    }

    private handleHour12Change = () => {
        this.specifier.changeHour12Event.forEach(event => event());
    }
}

export default WatchView;
