import AnimatorModel from "../model/animator.model";
import { Observer } from "../utils/observable";

interface AnimatorViewSpecifier {
    startAndStopRotationEvent: Observer[];
}

class AnimatorView {
    private mainElement: HTMLElement;

    constructor(
        private model: AnimatorModel,
        private specifier: AnimatorViewSpecifier,
    ) {
        this.model.subscribe(() => this.updateTransform());
    }

    initListeners(): void {
        this.mainElement.addEventListener('click', this.handleStartAndStopRotation);
    }

    initElement(element: HTMLElement): void {
        this.mainElement = element;
    }

    private updateTransform(): void {
        this.mainElement.style.transform = `rotate(${this.model.angle}rad)`;
    }

    private handleStartAndStopRotation = (): void => {
        this.specifier.startAndStopRotationEvent.forEach(event => event());
    }
}

export default AnimatorView;