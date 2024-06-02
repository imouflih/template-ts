import WatchModel from "../model/watch.model";
import { Observer } from "../utils/observable";

class WatchController {
    constructor(private model: WatchModel) { }

    changeMode: Observer = () => {
        const mode = this.model.mode;
        if (mode === "view") {
            this.model.mode = "edit-hour";
        } else if (mode === "edit-hour") {
            this.model.mode = "edit-minute";
        } else {
            this.model.mode = "view";
        }
    };

    increaseTime: Observer = () => {
        const currentTime = this.model.currentTime;
        if (this.model.mode === "edit-hour") {
            currentTime.setHours(currentTime.getHours() + 1);
        } else if (this.model.mode === "edit-minute") {
            currentTime.setMinutes(currentTime.getMinutes() + 1);
        }
        this.model.currentTime = currentTime;
    };

    toggleLight: Observer = () => {
        this.model.lightOn = !this.model.lightOn;
    };

    resetTime: Observer = () => {
        const timeOffSet = new Date().getTimezoneOffset() * 60 * 1000;
        this.model.currentTime = new Date(new Date().getTime() + timeOffSet);
    };

    updateTime() {
        const currentTime = this.model.currentTime;
        currentTime.setSeconds(currentTime.getSeconds() + 1);
        this.model.currentTime = currentTime;
    }

    startTimer() {
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    setTimeZone(timeZone: number) {
        this.model.timeZone = timeZone;
    }

    changeHour12: Observer = () => {
        this.model.hour12 = !this.model.hour12;
    };
}

export default WatchController;
