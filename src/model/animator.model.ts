import Observable from "../utils/observable";

class AnimatorModel extends Observable {
    private _angle: number = 0;
    private _isRotating: boolean = false;

    constructor() {
        super();
    }

    get angle(): number {
        return this._angle;
    }

    set angle(angle: number) {
        this._angle = angle;
        this.notify();
    }

    get isRotating(): boolean {
        return this._isRotating;
    }

    set isRotating(isRotating: boolean) {
        this._isRotating = isRotating;
    }
}

export default AnimatorModel;