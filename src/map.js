import Box from './box';

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

const populateGrid = function() {
  alert('hi');
}

export { populateGrid, grid };
