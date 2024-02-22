import { $ } from './modules/common.js';

// Expand the navbar when the menu button is clicked
$('#menu-button').onclick = () => $('nav').classList.toggle('expand')
