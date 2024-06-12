import './index.css';
import HeaderView from './view/header.view';
import AnimatorWrapper from './wrappers/animator.wrapper';
import WatchWrapper from './wrappers/watch.wrapper';

document.addEventListener('DOMContentLoaded', () => {
    const watchContainer = document.getElementById('container');
    const addWatchContainer = document.getElementById('add-watch-container');

    new WatchWrapper(watchContainer, 2).init();
    new AnimatorWrapper(watchContainer).init();
});