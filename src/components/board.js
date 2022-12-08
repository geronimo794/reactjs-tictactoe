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
      key={i}
      onClick={() => this.props.onClick(i)} />;
  }

  /**
   * Rendering square block by col row
   * @param {*} col column number
   * @param {*} row row number
   * @return {Component} return block component
   */
  renderSquareBlock(col, row) {
    const squareBlock = [];
    let number = 0;
    for (let index = 0; index < col; index++) {
      const square = [];
      for (let index2 = 0; index2 < row; index2++) {
        square.push(this.renderSquare(number));
        number++;
      }
      squareBlock.push(<div className="board-row" key={index}>{square}</div>);
    }
    return squareBlock;
  }

  /**
   * Render function
   * @return {component} Main render function
   */
  render() {
    const squareBlock = this.renderSquareBlock(3, 3);
    return (
      <div>
        {squareBlock}
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
