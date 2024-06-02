import Observable from "../utils/observable";

type Mode = "view" | "edit-hour" | "edit-minute";

class WatchModel extends Observable {
    private _currentTime: Date = new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000
    );
    private _mode: Mode = "view";
    private _lightOn: boolean = false;
    private _timeZone: number = 0;
    private _hour12: boolean = false;

    constructor() {
        super();
    }

    get currentTime(): Date {
        return this._currentTime;
    }

    set currentTime(time: Date) {
        this._currentTime = time;
        this.notify();
    }

    get mode(): Mode {
        return this._mode;
    }

    set mode(mode: Mode) {
        this._mode = mode;
        this.notify();
    }

    get lightOn(): boolean {
        return this._lightOn;
    }

    set lightOn(light: boolean) {
        this._lightOn = light;
        this.notify();
    }

    get timeZone(): number {
        return this._timeZone;
    }

    set timeZone(timeZone: number) {
        this._timeZone = timeZone;
        this.notify();
    }

    get hour12(): boolean {
        return this._hour12;
    }

    set hour12(hour12: boolean) {
        this._hour12 = hour12;
        this.notify();
    }
}

export default WatchModel;
