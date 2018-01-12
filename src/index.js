import '../assets/css/style.css';
import Game from './game';

const game = new Game(1, 1, 10, document.getElementById('app'));

game.setup();
