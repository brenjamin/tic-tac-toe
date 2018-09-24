var tictactoe = new TicTacToe();
var wins = [
  ["0", "1", "2"],
  ["0", "4", "8"],
  ["0", "3", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["2", "4", "6"],
  ["2", "5", "8"],
  ["1", "4", "7"]
];

var corners = ["0", "2", "6", "8"];
var edges = ["1", "3", "5", "7"];
var center = "4";


function contains(arr, item) {
  
  return arr.indexOf(item) > -1;
  
}

function TicTacToe() {
  var self = this;
  this.userCells = [];
  this.computerCells = [];
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.availableCells = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  this.waiting = false;
  this.move = 1;
  this.availableCorners = ["0", "2", "6", "8"];
  this.availableEdges = ["1", "3", "5", "7"];

  this.assignLetter = function(input) {
    this.user = input;
    this.computer = this.user === "X" ? "O" : "X";
    if (this.computer == "X") {
      this.waiting = true;
    }
  };

  this.addUserInput = function(cell) {
    this.waiting = true;
    this.board[cell] = this.user;
    $("#box" + cell).html(this.user);
    this.updateAvailableCells(cell);
    this.updateCornersAndEdges(cell);
    this.userCells.push(cell);

    var gameOver = this.isGameOver();

    console.log("User has just moved and gameover is " + gameOver);

    this.move++;

    if (gameOver) {
      $("#winner").html("Game Over! " + this.user + " wins!");
      $("#winner").show();
      $("#reset").show();
      this.availableCells = [];
    } else {
      if (this.availableCells.length != 0) {
        
        this.computerMoves();
      }
    }
  };

  this.computerMoves = function() {
    
    setTimeout(function() {
      var cell = self.getBestMove();

      self.computerCells.push(cell);

      var box = "#box" + cell;
      self.board[cell] = self.computer;
      $(box).html(self.computer);
      self.updateAvailableCells(cell);
      
      var gameOver = self.isGameOver();
      console.log("Computer has just moved and gameover is " + gameOver);
      self.move++;

      if (gameOver) {
        $("#winner").html("Game Over! " + self.computer + " wins!");
        $("#winner").show();
        $("#reset").show();
        self.available = [];
      }
      
      else {

        self.waiting = false;
      }
    }, 1000);
  };

  this.updateAvailableCells = function(cell) {
    var index = this.availableCells.indexOf(cell);
    this.availableCells.splice(index, 1);
  };

  this.isAvailable = function(cell) {
    return this.availableCells.indexOf(cell) > -1;
  };

  this.isGameOver = function() {
    if (
      this.board[0] === this.board[1] &&
      this.board[1] === this.board[2] &&
      this.board[0] != ""
    ) {
      return true;
    } else if (
      this.board[0] === this.board[3] &&
      this.board[3] === this.board[6] &&
      this.board[0] != ""
    ) {
      return true;
    } else if (
      this.board[0] === this.board[4] &&
      this.board[4] === this.board[8] &&
      this.board[0] != ""
    ) {
      return true;
    } else if (
      this.board[1] === this.board[4] &&
      this.board[4] === this.board[7] &&
      this.board[1] != ""
    ) {
      return true;
    } else if (
      this.board[2] === this.board[5] &&
      this.board[5] === this.board[8] &&
      this.board[2] != ""
    ) {
      return true;
    } else if (
      this.board[2] === this.board[4] &&
      this.board[4] === this.board[6] &&
      this.board[2] != ""
    ) {
      return true;
    } else if (
      this.board[3] === this.board[4] &&
      this.board[4] === this.board[5] &&
      this.board[3] != ""
    ) {
      return true;
    } else if (
      this.board[6] === this.board[7] &&
      this.board[7] === this.board[8] &&
      this.board[6] != ""
    ) {
      return true;
    } else if (this.availableCells.length === 0) {
      $("#winner").html("It's a draw!");
      $("#winner").show();
      $("#reset").show();
      return false;
    } else {
      return false;
    }
  };

  this.clearBoard = function() {
    var el;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.availableCells = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.userCells = [];
    this.computerCells = [];
    this.move = 1;
    this.availableCorners = ["0", "2", "6", "8"];
    this.availableEdges = ["1", "3", "5", "7"];

    //clear board
    for (var i = 0; i < 9; i++) {
      el = "#box" + i;
      $(el).html("");
    }
  };

  this.reset = function() {
    this.clearBoard();
    $("#startup").show();
    $("#board").hide();
    $("#reset").hide();
    $("#winner").hide();
    this.waiting = false;
  };

  this.getBestMove = function() {
    console.log("Move number " + this.move);
    var computerWins = this.hasWin("computer");
    var userWins = this.hasWin("user");
    console.log("Computer has a win is " + computerWins[0]);
    console.log("User has a win is " + userWins[0]);

    // if move number is 4 or greater - if a win is possible
    if (this.move > 3) {
      // if computer has win, choose winning block
      if (computerWins[0]) {
        return computerWins[1];
      } else if (userWins[0]) {
        // if user has win, block user

        console.log("User will win at cell " + userWins[1]);
        return userWins[1];
      }
    }

    // if move number is less than 4 or there is no win
    return this.bestMove(this.move);
  };

  this.hasWin = function(player) {
    var count;
    var condition;
    var remainder;
    var marksArray;

    if (player === "user") {
      marksArray = this.userCells;
      console.log("The player's marks are at boxes " + marksArray);
    } else {
      marksArray = this.computerCells;
      console.log("The computers's marks are at boxes " + marksArray);
    }
    // for each win condition

    for (var i = 0; i < wins.length; i++) {
      count = 0;
      condition = wins[i];
      remainder = wins[i].slice();

      // check if user move matches at least 2 of 3 boxes of a win condition
      for (var j = 0; j < marksArray.length; j++) {
        var ind = condition.indexOf(marksArray[j]);
        var matches = ind > -1;

        if (matches) {
          count += 1;
          var index = remainder.indexOf(marksArray[j]);
          remainder.splice(index, 1);
        }
      }

      var leftOver = remainder[0];

      // var numberIsAvailable = this.available.indexOf((remainder[0]+1)
      if (count === 2 && this.availableCells.indexOf(leftOver) > -1) {
        console.log("Winning move is at box number " + leftOver);

        return [true, remainder[0]];
      }
    }
    return [false];
  };

  this.bestMove = function(moveNumber) {
    switch (moveNumber) {
      case 1:
        return this.getCornerSquare();
      case 2:
        if (this.userCells[0] != "4") {
          return "4";
        } else {
          return this.getCornerSquare();
        }
      case 3:
        var userFirst = this.userCells[0];
        if (userFirst === "4") {
          return this.getCaddyCorner(this.computerCells[0]);
        } else if (corners.indexOf(userFirst) > -1) {
          return this.getCornerSquare();
        } else if (edges.indexOf(userFirst) > -1) {
          return "4";
        }

      case 4:
        console.log("Caddy Corner Xs is " + this.caddyCornerXs());
        console.log("Edge and Corner is " + this.edgeAndCorner());
        console.log("Two Edges is " + this.twoEdges());
        if (this.edgeAndCorner()) {
          var cornerX;

          for (var i = 0; i < corners.length; i++) {
            console.log("Testing corner number " + corners[i]);
            if (this.userCells.indexOf(corners[i]) > -1) {
              cornerX = corners[i];
              console.log("The Xed corner is number " + cornerX);
              return this.getCaddyCorner(cornerX);
            }
          }
        } else if (this.twoEdges()) {
          return this.cornerBetween();
        } else if (this.caddyCornerXs()) {
          return this.getEdgeSquare();
        } else {
          console.log("Returning Corner Square");
          return this.getCornerSquare();
        }

      case 5:
        if (this.availableCorners.length == 1) {
          return this.getCornerSquare();
        } else {
          for (var i = 0; i < this.availableCorners.length; i++) {
            if (this.availableCorners[i] == "0") {
              if (
                this.userCells.indexOf("1") == -1 &&
                this.userCells.indexOf("3") == -1
              ) {
                var corner = this.availableCorners[i];
                this.availableCorners.slice(i, 1);
                return corner;
              }
            } else if (this.availableCorners[i] == "2") {
              if (
                this.userCells.indexOf("1") == -1 &&
                this.userCells.indexOf("5") == -1
              ) {
                var corner = this.availableCorners[i];
                this.availableCorners.slice(i, 1);
                return corner;
              }
            } else if (this.availableCorners[i] == "6") {
              if (
                this.userCells.indexOf("4") == -1 &&
                this.userCells.indexOf("7") == -1
              ) {
                var corner = this.availableCorners[i];
                this.availableCorners.slice(i, 1);
                return corner;
              }
            } else if (this.availableCorners[i] == "8") {
              if (
                this.userCells.indexOf("5") == -1 &&
                this.userCells.indexOf("7") == -1
              ) {
                var corner = this.availableCorners[i];
                this.availableCorners.slice(i, 1);
                return corner;
              }
            }
          }
        }
      case 6:
        // two edges, 3rd o move needs to be one of two corners, with one adjacent x
        if (this.twoEdges()) {
          var index = Math.floor(Math.random() * 2);
          
          if (this.userCells.indexOf("1") > -1 && this.userCells.indexOf("3") > -1) {
            if (this.userCells.indexOf("5") > -1) {
              return ["6","8"][index];
            }
            else if (this.userCells.indexOf("7")) {
              return ["2","8"][index]
            }
          }
          
          else if (this.userCells.indexOf("5") > -1 && this.userCells.indexOf("7") > -1) {
            if (this.userCells.indexOf("1") > -1) {
              return ["0", "6"][index];
            }
            
            else if (this.userCells.indexOf("3")) {
              return ["0", "2"][index];
            }
          }
        }
      default: {
        var index = Math.floor(
          Math.random() * (this.availableCells.length - 1)
        );
        return this.availableCells[index];
      }
    }
  };

  this.updateCornersAndEdges = function(input) {
    if (contains(this.availableEdges, input)) {
      var index = this.availableEdges.indexOf(input);
      this.availableEdges.splice(index, 1);
    }
    
    else if (contains(this.availableCorners, input)) {
      var index = this.availableCorners.indexOf(input);
      this.availableCorners.splice(index, 1);
    }
    
    
    
    
  }
  
  this.getCornerSquare = function() {
    console.log("Before, available corner squares are " + this.availableCorners);
    var index = Math.floor(Math.random() * (this.availableCorners.length - 1));
    var corner = this.availableCorners[index];
    this.availableCorners.splice(index, 1);
    console.log("After, available corner squares are " + this.availableCorners);
    console.log("Returning corner number " + corner);
    return corner;
  };

  this.getEdgeSquare = function() {
    console.log("Edge array is " + this.availableEdges);
    var index = Math.floor(Math.random() * (this.availableEdges.length - 1));
    var edge = this.availableEdges[index];
    this.availableEdges.splice(index, 1);
    return edge;
  };

  this.getCaddyCorner = function(corner) {
    switch (corner) {
      case "0":
        return "8";
      case "2":
        return "6";
      case "6":
        return "2";
      case "8":
        return "0";
    }
  };

  this.edgeAndCorner = function(arr) {
    var one = this.userCells[0];
    var two = this.userCells[1];

    if (edges.indexOf(one) > -1 && corners.indexOf(two) > -1) {
      return true;
    } else if (edges.indexOf(two) > -1 && corners.indexOf(one) > -1) {
      return true;
    } else {
      return false;
    }
  };

  this.twoEdges = function() {
    if (
      edges.indexOf(this.userCells[0]) > -1 &&
      edges.indexOf(this.userCells[1]) > -1
    ) {
      return true;
    }

    return false;
  };

  this.caddyCornerXs = function() {
    if (this.getCaddyCorner(this.userCells[0]) == this.userCells[1]) {
      return true;
    }

    return false;
  };

  this.cornerBetween = function() {
    if (this.userCells.indexOf("1") > -1 && this.userCells.indexOf("3") > -1) {
      return "0";
    } else if (
      this.userCells.indexOf("1") > -1 &&
      this.userCells.indexOf("5") > -1
    ) {
      return "2";
    } else if (
      this.userCells.indexOf("3") > -1 &&
      this.userCells.indexOf("7") > -1
    ) {
      return "6";
    } else if (
      this.userCells.indexOf("5") > -1 &&
      this.userCells.indexOf("7") > -1
    ) {
      return "8";
    } else {
      console.log("Returning Edge Square ftw");
      return this.getEdgeSquare();
    }
  };
  
  
}

$("td").on("click", function() {
  //if box not filled
  // get id

  var cell = this.id.slice(-1);

  if (tictactoe.isAvailable(cell) && !tictactoe.waiting) {
    tictactoe.addUserInput(cell);
  }
});

$(".button").on("click", function() {
  //get selection
  //pass selection to tic tac toe object and start game
  var selection = $(this).html();
  tictactoe.assignLetter(selection);

  if (selection === "O") {
    tictactoe.computerMoves();
  }

  $("#startup").hide();
  $("#board").show();
});

$("#reset").on("click", function() {
  tictactoe.reset();
});

function getRandom(range) {
  var num = Math.floor(Math.random() * range);
  return num;
}



