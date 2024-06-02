export type Observer = (...args: unknown[]) => void;

class Observable {
    private observers: Array<Observer> = [];

    subscribe(observer: Observer) {
        this.observers.push(observer);
    }

    notify(...args: unknown[]) {
        this.observers.forEach(observer => observer(...args));
    }
}

export default Observable;
