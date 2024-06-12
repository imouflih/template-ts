import AnimatorModel from "../model/animator.model";

class AnimatorController {
    constructor(private model: AnimatorModel) { }

    startAndStopRotation = (): void => {
        if (this.model.isRotating) {
            this.stopRotation();
        } else {
            this.startRotation();
        }
    }

    private startRotation(): void {
        this.model.isRotating = true;
        const animate = () => {
            if (this.model.isRotating) {
                this.model.angle += 0.01;
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    private stopRotation(): void {
        this.model.isRotating = false;
    }
}

export default AnimatorController;