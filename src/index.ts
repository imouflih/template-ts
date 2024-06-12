import './index.css';
import HeaderView from './view/header.view';
import WatchWrapper from './watch.wrapper';

document.addEventListener('DOMContentLoaded', () => {
    const watchContainer = document.getElementById('container');
    const addWatchContainer = document.getElementById('add-watch-container');

    const addWatchController = (timeZoneValue: number = 0) => {
        new WatchWrapper(watchContainer, timeZoneValue).init();
    };

    const header = new HeaderView({
        addWatchEvent: [addWatchController]
    })

    header.createElements(addWatchContainer);
    header.initListeners();
});