import '../assets/css/style.css';
import Game from './game';

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

const game = new Game(
  gameTypes.hard.rows,
  gameTypes.hard.cols,
  gameTypes.hard.mines,
  document.getElementById('app')
);

game.setup();
