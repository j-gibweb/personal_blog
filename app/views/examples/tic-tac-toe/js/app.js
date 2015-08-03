(function() {
  var app = angular.module('tic-tac-toe', []);

  app.directive('gameBoard', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/examples/tic-tac-toe/board.html',
      controller: function($sce) {
        this.winner;
        this.turn = 0;
        this.pieces = [];
        this.winners = [[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8], 
                        [2,4,6]];

        this.checkTurn = function() {
          var turn = this.turn; 
          this.turn++;
          return turn;
        };

        this.checkIfWinner = function() {
          var self = this;
          var pieces = this.pieces;
          this.winners.forEach(function(winner) {
            if (pieces[winner[0]].player) {
              if(
                pieces[winner[0]].player === pieces[winner[1]].player && 
                pieces[winner[0]].player === pieces[winner[2]].player &&
                pieces[winner[1]].player === pieces[winner[2]].player
                ) {
                self.announceWinner(pieces[winner[0]].player);
              } 
            }
          });
        };
        
        this.announceWinner = function(winner) {
          this.winner = winner;
        };

        for (var i = 0; i < 9; i++) {
          this.pieces.push(new Piece());
        }
      },
      controllerAs: 'game'
    };
  });

  var Piece = function() {
    var self = this;
    this.click = function($event, game) {
      var el = $event.currentTarget;
      if (game.checkTurn() % 2 === 0) {
        self.player = "x";
      } else {
        self.player = "o";
      }
      this.click = null;
      game.checkIfWinner();
    };
  }
})();
