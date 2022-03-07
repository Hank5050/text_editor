import Editor from './editor';
import { Workbox } from 'workbox-window';
import '../css/style.css';
import './database';

const main = document.querySelector('#main');

main.innerHTML = '';

const loadSpinner = () => {

	const spinner = document.createElement('div');

	spinner.classList.add('spinner');

	spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;

	main.appendChild(spinner);

};

const editor = new Editor();

if (typeof editor === 'undefined') {

	loadSpinner();

}


if ('serviceWorker' in navigator) {

	const workboxSW = new Workbox('/service-worker.js');

	workboxSW.register();

	console.log('Success!');

} else {

	console.error('Something went wrong!');

}