class node {
  constructor(position,parent) {
    this.currentPosition = position; 
    this.moves = [];
    this.parent = parent;
  }
}

class possibleMoves {
  constructor(position) {
    this.currentPosition = position;
    this.moves = [];
    this.parent = null;
  }

  showPath(target) {
    let shortest = this.path(target);
    let parent = shortest.parent;
    let printMoves = [shortest.currentPosition];
    while (parent != null) {
      printMoves.push(parent.currentPosition);
      parent = parent.parent;
    }
    console.log(`You made it in ${printMoves.length - 1} Moves! Here's your path`)
    for (let i = printMoves.length-1 ; i >= 0; i--) {
      console.log(`[${printMoves[i][0]},${printMoves[i][1]}]`);
    }
  }

  path(target,current = this) {
    let moves = this.moveList(current.currentPosition);
    let queue = [];
    queue.push(current);

    while (queue.length != 0) {
      let temp = queue.shift();

      if (temp.currentPosition[0] == target[0] && temp.currentPosition[1] == target[1]) return temp;
      moves = this.moveList(temp.currentPosition);

      if (moves.length != 0) {
        temp.moves = this.buildLevel(moves,temp);
        queue = queue.concat(temp.moves);
      }
    }
  }

  buildLevel(array,parent) {
    let arrayReturned = [];
    for (let i = 0 ; i < array.length; i++) {
      arrayReturned.push( new node(array[i],parent))
    }
    return arrayReturned
  }

  makeMove (position,x,y) {
    let yAxis = position[0] + y;
    let xAxis = position[1] + x;
    if (yAxis > 7 || yAxis < 0 ||xAxis > 7 || xAxis < 0)  return null
    return [yAxis,xAxis]
  }

  moveList (position) {
    let moveArray = [];
    moveArray.push(this.makeMove(position,2,1))
    moveArray.push(this.makeMove(position,2,-1))
    moveArray.push(this.makeMove(position,-2,1))
    moveArray.push(this.makeMove(position,-2,-1))
    moveArray.push(this.makeMove(position,1,2))
    moveArray.push(this.makeMove(position,1,-2))
    moveArray.push(this.makeMove(position,-1,2))
    moveArray.push(this.makeMove(position,-1,-2))
    return moveArray.filter((move)=> move != null );
  }

}

class gameBoard {
  constructor() {
    this.board = this.newGameBoard()
  }
  newGameBoard () {
    let gameboard = new Array(8);
    for (let i = 0; i < 8; i++) {
      gameboard[i] = new Array(8);
      gameboard[i].fill(0)
    }
    return gameboard
  }

  findKnight (gameboard = this.board) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8 ; j++) {
        if (gameboard[i][j] == 'K') return [i,j];
      }
    }
  }

  knightMoves (target) {
    if (target[0] > 7 || target[0] < 0) return
    if (target[1] > 7 || target[1] < 0) return

    let current = this.findKnight(this.board);

    if (current == undefined) return this.board[target[0]][target[1]] = 'K';   

    if (target[0] != current [0] && target[1] != current[1]) {
      let simulation = new possibleMoves(current);
      simulation.showPath(target);
    }
    
    this.board[current[0]][current[1]] = 0;
    this.board[target[0]][target[1]] = 'K';
  }

}

const knightMoves = (current,target) => {
  let simulation = new possibleMoves(current);
  simulation.showPath(target);
}

let test = new gameBoard;

test.knightMoves([4,4]);

test.findKnight();

test.knightMoves([0,0]);

knightMoves([3,6],[0,3]);