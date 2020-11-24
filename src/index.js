import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(42).fill(null)
          }
        ],
        stepNumber: 0,
        yellowIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      var j;
      for (j = 35 + (i%7); j > 0; j -= 7) {
        if (squares[j] == null) {
            if (this.state.yellowIsNext) {
              squares[j] = 'yellow';
            } else {
              squares[j] = 'red';
            break;
        }
    }
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        yellowIsNext: !this.state.yellowIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        yellowIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.yellowIsNext ? "Yellow" : "Red");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
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
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
    // Horizontal
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c <= 4; c++) {
          const index = r * 7 + c;
          if (squares[index]) {
            if (squares[index] === squares[index + 1] && squares[index] === squares[index + 2] && squares[index] === squares[index + 3]) {
              return squares[index];
            }
          }
      }
    }

    // Vertical
    for (let c = 0; c < 7; c++) {
      for (let r = 5; r > 3; r--) {
            const index = r * 7 + c;
            if (squares[index]) {
              if (squares[index] === squares[index - 7] && squares[index] === squares[index - 14] && squares[index] === squares[index - 21]) {
                return squares[index];
              }
            }
        }
    }

    // Right Diagonal
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
          const index = r * 7 + c;
          if (squares[index]) {
            if (squares[index] === squares[index - 6] && squares[index] === squares[index - 12] && squares[index] === squares[index - 18]) {
              return squares[index];
            }
          }
      }

    // Left Diagonal
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
          const index = r * 7 + c;
          if (squares[index]) {
            if (squares[index] === squares[index - 8] && squares[index] === squares[index - 16] && squares[index] === squares[index - 24]) {
                return squares[index];
            }
          }
      }
    }
  }
    return null;
  }
  
