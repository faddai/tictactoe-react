import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    constructor (props) {
      super(props);
  
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0
      };
    }
  
    handleClick (i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        // there's a winner or the square has already been clicked, no-op
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.getNextPlayer();

        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    getNextPlayer () {
        return this.state.xIsNext ? 'X' : 'O'
    }
  
    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        let status;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move ? `Go to move #${move}` : 'Go to game start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        });

        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next Player: ${this.getNextPlayer()}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner (squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let index = 0; index < lines.length; index++) {
        const [a, b, c] = lines[index];
        
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    return null;
}

export default Game;