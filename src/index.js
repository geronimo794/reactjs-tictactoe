/**
 * Button component
 */
class Square extends React.Component {
  /**
  * Render function
   * @return {component} Render the view
   */
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

/**
 * Board component
 */
class Board extends React.Component {
  /**
   * Render square function
   * @param {*} i Key for Square
   * @return {component} Square component
   */
  renderSquare(i) {
    return <Square />;
  }

  /**
   * Render function
   * @return {component} Main render function
   */
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
/**
 * Main game class
 */
class Game extends React.Component {
  /**
   * Render function
   * @return {component} View
   */
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

