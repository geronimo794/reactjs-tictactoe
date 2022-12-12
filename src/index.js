import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from './components/board';
import {calculateWinner, calculateColRow} from './helper';
import './index.css';

/**
 * Main game class
 */
class Game extends React.Component {
  /**
   * Constructor
   * @param {*} props parent props
   */
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coordinate: [],
        player: '',
      }],
      winningPosition: [],
      stepNumber: 0,
      xIsNext: true,
      stepOrder: 'asc',
      winner: '',
    };
    this.changeStepOrder = this.changeStepOrder.bind(this);
  }

  /**
   * Handle click function of the board
   * @param {*} i Index of board
   */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Recalculate winner after sign new value on square
    const currentPlayer = this.state.xIsNext ? 'X' : 'O';
    squares[i] = currentPlayer;
    const getWinner = calculateWinner(squares);
    const winningPosition = (getWinner ? getWinner.position : []);

    this.setState({
      history: history.concat([{
        squares: squares,
        coordinate: calculateColRow(i),
        player: currentPlayer,
      }]),
      winningPosition: winningPosition,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * Jump to previous step
   * @param {int} step to back
   */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  /**
   * Change step order
   */
  changeStepOrder() {
    const newStepOrder = (this.state.stepOrder == 'asc' ? 'desc' : 'asc');
    this.setState({
      stepOrder: newStepOrder,
    });
  }
  /**
   * Render function
   * @return {component} View
   */
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, i) => {
      let desc = '';
      if (i) {
        // eslint-disable-next-line max-len
        desc = 'Go to move #' + i + ': '+`${step.player} on coordinate ${step.coordinate}`;
      } else {
        desc = 'Go to game start';
      }
      if (i == this.state.stepNumber) desc = <b>{desc}</b>;

      return (
        <li key={i}>
          <button onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      );
    });
    if (this.state.stepOrder == 'desc') {
      moves.reverse();
    }


    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else {
      if (current.squares.includes(null)) {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      } else {
        status = 'Draw';
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningPosition={this.state.winningPosition}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            Sort:
            <button
              onClick={this.changeStepOrder}>
              {this.state.stepOrder}
            </button>
          </div>
          <ol reversed={this.state.stepOrder == 'desc'}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
