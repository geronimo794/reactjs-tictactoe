import React from 'react';
import PropTypes from 'prop-types';

/**
 * Board component
 */
class Board extends React.Component {
  /**
   * Handle when square is clicked
   * @param {int} i Index of the square
   */
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  /**
   * Render square function
   * @param {*} i Key for Square
   * @return {component} Square component
   */
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />;
  }

  /**
   * Render function
   * @return {component} Main render function
   */
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
Board.propTypes = {
  squares: PropTypes.array,
  onClick: PropTypes.func,
};

/**
 * Function Component Square
 * @param {*} props parent props
 * @return {React.Component} render component
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Board;
