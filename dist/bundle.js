/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default(9, 9, 10, document.getElementById('app'));

game.setup();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box = __webpack_require__(2);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(rows, cols, mines, domElement) {
    _classCallCheck(this, Game);

    this.rows = rows;
    this.cols = cols;
    this.numMines = mines;
    this.domElement = domElement;

    this.grid;

    this.state = {
      tilesLeft: this.rows * this.cols - this.numMines,
      minesLeft: this.numMines
    };

    this.validate();
  }

  _createClass(Game, [{
    key: 'setState',
    value: function setState(key, value) {
      this.state[key] = value;
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (this.rows * this.cols < this.numMines) {
        this.numMines = this.rows * this.cols - 1;
      }
    }
  }, {
    key: 'setup',
    value: function setup() {
      this.setupGrid();
      this.plantMines();
      this.drawGrid();
    }
  }, {
    key: 'setupGrid',
    value: function setupGrid() {
      this.grid = new Array(this.rows);
      for (var i = 0; i < this.rows; i++) {
        this.grid[i] = new Array(this.cols);
        for (var j = 0; j < this.cols; j++) {
          this.grid[i][j] = new _box2.default(i, j);
        }
      }
    }
  }, {
    key: 'plantMines',
    value: function plantMines() {
      for (var k = 0; k < this.numMines; k++) {
        var x = Math.floor(Math.random() * this.rows);
        var y = Math.floor(Math.random() * this.cols);
        while (this.grid[x][y].isBomb()) {
          x = Math.floor(Math.random() * this.rows);
          y = Math.floor(Math.random() * this.cols);
        }
        this.grid[x][y].setAsBomb();

        // increment the adjacent boxes' adjacent mine count
        var adjacentBoxes = this.getAdjacentBoxes(x, y);
        adjacentBoxes.forEach(function (box) {
          box.incrementAdjacent();
        });
      }
    }
  }, {
    key: 'drawGrid',
    value: function drawGrid() {
      var _this = this;

      var _loop = function _loop(i) {
        var row = document.createElement('div');
        row.classList.add('row');

        var _loop2 = function _loop2(j) {
          var box = _this.grid[i][j];
          box.domElement.classList.add('box');
          box.domElement.addEventListener('click', function (e) {
            box.reveal();
            if (box.isBomb()) {
              alert('boom');
              _this.gameOver();
            } else if (box.isEmptyAround()) {
              _this.flowReveal(i, j);
            }
          });
          box.domElement.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            box.flag();
          });
          row.appendChild(box.domElement);
        };

        for (var j = 0; j < _this.grid[i].length; j++) {
          _loop2(j);
        }
        _this.domElement.appendChild(row);
      };

      for (var i = 0; i < this.grid.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'getAdjacentBoxes',
    value: function getAdjacentBoxes(x, y) {
      var boxes = [];
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          var _row = x + i;
          var col = y + j;
          if (i === 0 && j === 0 || _row < 0 || _row >= this.rows || col < 0 || col >= this.cols) {
            continue;
          }
          boxes.push(this.grid[_row][col]);
        }
      }
      return boxes;
    }
  }, {
    key: 'flowReveal',
    value: function flowReveal(x, y) {
      var toBeRevealed = [];

      toBeRevealed.push(this.grid[x][y]);

      while (toBeRevealed.length > 0) {
        var currentBox = toBeRevealed.pop();
        var adjBoxes = this.getAdjacentBoxes(currentBox.x, currentBox.y);

        adjBoxes.forEach(function (box) {
          if (box.isEmptyAround() && box.revealed === false) {
            toBeRevealed.push(box);
          }
          box.reveal();
        });
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      console.log('game over!');
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// bomb is -1
// not bomb is 1

var Box = function () {
  function Box(x, y) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var revealed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Box);

    this.x = x;
    this.y = y;
    this.type = type;
    this.revealed = revealed;
    this.adjacent = 0;
    this.flagged = false;
    this.domElement = document.createElement('div');

    this.flag = this.flag.bind(this);
    this.reveal = this.reveal.bind(this);
  }

  _createClass(Box, [{
    key: 'setAsBomb',
    value: function setAsBomb() {
      this.type = -1;
      this.adjacent = null;
    }
  }, {
    key: 'incrementAdjacent',
    value: function incrementAdjacent() {
      if (!this.isBomb()) {
        this.adjacent += 1;
      }
    }
  }, {
    key: 'isBomb',
    value: function isBomb() {
      return this.type === -1;
    }
  }, {
    key: 'isEmptyAround',
    value: function isEmptyAround() {
      return this.adjacent === 0;
    }
  }, {
    key: 'flag',
    value: function flag() {
      if (!this.revealed) {
        this.flagged = !this.flagged;
        this.drawFlagged();
      }
    }
  }, {
    key: 'reveal',
    value: function reveal() {
      this.revealed = true;
      this.drawRevealed();
    }
  }, {
    key: 'drawFlagged',
    value: function drawFlagged() {
      this.domElement.innerText = this.flagged ? '🚩' : '';
    }
  }, {
    key: 'drawRevealed',
    value: function drawRevealed() {
      this.domElement.classList.add('revealed');
      var symbol = this.adjacent === 0 ? '' : this.adjacent;
      if (this.isBomb()) {
        this.domElement.classList.add('bomb');
        symbol = '💣';
      }
      this.domElement.innerText = symbol;
    }
  }]);

  return Box;
}();

exports.default = Box;

/***/ })
/******/ ]);