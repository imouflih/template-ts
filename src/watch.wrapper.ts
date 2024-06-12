import WatchController from "./controller/watch.controller";
import WatchModel from "./model/watch.model";
import WatchView from "./view/watch.view";

class WatchWrapper {
    private model: WatchModel;
    private view: WatchView;
    private controller: WatchController;

    constructor(private container: HTMLElement, private timeZone: number = 0) {
        this.model = new WatchModel();
        this.controller = new WatchController(this.model);
        this.view = new WatchView(this.model, {
            changeModeEvent: [this.controller.changeMode],
            increaseTimeEvent: [this.controller.increaseTime],
            toggleLightEvent: [this.controller.toggleLight],
            resetTimeEvent: [this.controller.resetTime],
            changeHour12Event: [this.controller.changeHour12],
        });
    }

    init() {
        this.view.createElements(this.container);
        this.view.initListeners();

        this.controller.setTimeZone(this.timeZone);
        this.controller.startTimer();
    }
}

export default WatchWrapper;
