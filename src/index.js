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

let timer = new Timer(document.getElementById('timer'));

let game = new Game(
  gameTypes.easy.rows,
  gameTypes.easy.cols,
  gameTypes.easy.mines,
  timer,
  document.getElementById('app'),
  document.getElementById('mines-left')
);

game.setup();

// Reset game
const newGame = document.getElementById('new_game');
reset.addEventListener('click', e => {
  if (window.confirm('Are you sure you want to reset this game?')) {
    game.reset();
  }
});

// let newGame = function(timerDom, appDom, score, gameType) {
//   let timer = new Timer(timerDom);
  
//   let game = new Game(
//     gameType.rows,
//     gameType.cols,
//     gameType.mines,
//     timer,
//     appDom,
//     score
//   );
  
//   game.setup();
// }
