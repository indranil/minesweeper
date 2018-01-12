const grid = function(x=1, y=1) {
  if (x === 0 || y === 0) {
    return null;
  }
  
  let fields = new Array(x);
  for (let i=0; i<fields.length; i++) {
    fields[i] = new Array(y);
  }
  
  return fields;
}

const drawGrid = function(grid, dom) {
  for (let i=0; i<grid.length; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j=0; j<grid[i].length; j++) {
      let box = document.createElement('div');
      box.classList.add('box');
      box.addEventListener('click', e => {
        console.log(e.which);
        grid[i][j].reveal();
      });
      box.addEventListener('contextmenu', e => {
        e.preventDefault();
        console.log(e.which);
      })
      row.appendChild(box);
    }
    dom.appendChild(row);
  }
}

export { grid };
