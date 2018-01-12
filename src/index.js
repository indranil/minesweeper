import '../assets/css/style.css';
import Game from './game';

const game = new Game(9, 9, 10, document.getElementById('app'));

game.setup();
