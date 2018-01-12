export const game = {
  mines: 10,
  rows: 9,
  columns: 9
};

// init!
const state = {
  minesLeft: game.mines,
}

export function getState(key) {
  return state[key];
}

export function changeState(key, value) {
  state[key] = value;
}
