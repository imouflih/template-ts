import AnimatorController from "../controller/animator.controller";
import AnimatorModel from "../model/animator.model";
import AnimatorView from "../view/animator.view";

class AnimatorWrapper {
    private model: AnimatorModel;
    private view: AnimatorView;
    private controller: AnimatorController;

    constructor(private element: HTMLElement) {
        this.model = new AnimatorModel();
        this.controller = new AnimatorController(this.model);
        this.view = new AnimatorView(this.model, {
            startAndStopRotationEvent: [this.controller.startAndStopRotation],
        });
    }

    init() {
        this.view.initElement(this.element);
        this.view.initListeners();
    }
}

export default AnimatorWrapper;
