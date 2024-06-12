import './index.css';
import WatchWrapper from './watch.wrapper';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const timeZoneSelector = document.getElementById('time-zone-selector');
    const addWatchButton = document.getElementById('add-watch-button');

    let timeZone = 0;

    for (let i = -11; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = `GMT ${i >= 0 ? '+' : ''}${i}`;
        timeZoneSelector.appendChild(option);
        if (i === 0) {
            option.selected = true;
        }
    }

    const addWatch = (gmt: number = 0) => {
        new WatchWrapper(container, gmt).init();
    };

    timeZoneSelector.addEventListener('change', (e) => {
        timeZone = +(e.target as HTMLSelectElement).value;
    });

    addWatchButton.addEventListener('click', () => {
        addWatch(timeZone);
    });
});


