import '../assets/css/style.css';
import Game from './game';
import Timer from './timer';

const gameTypes = {
  easy: {
    rows: 9,
    cols: 9,
    mines: 10
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40
  },
  hard: {
    rows: 16,
    cols: 30,
    mines: 99
  }
}

const timer = new Timer(document.getElementById('timer'));

const game = new Game(
  gameTypes.hard.rows,
  gameTypes.hard.cols,
  gameTypes.hard.mines,
  timer,
  document.getElementById('app'),
  document.getElementById('mines-left')
);

game.setup();
