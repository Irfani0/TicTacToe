class Square extends React.Component{
  render(){
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
    constructor(props){ 
    super(props);
    this.state = {
      square : Array(9).fill(null),
      xnext : true,
      count : 0,
      winner : null,
    };
  }
  clickHandle(i){
    const allset = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    this.setState({
      count : this.state.count +1,
    });
    if(this.state.count <9){
    const square = this.state.square.slice();
    square[i] = this.state.xnext ? 'X' : 'O';
    console.log(square[i]);
    this.setState({
      square : square,
      xnext : !this.state.xnext,
    });
       for(let i=0;i<allset.length;i++){
        let [a,b,c] = allset[i];
        if(square[a] && square[a] === square[b] && square[b] === square[c] && square[a] === square[c]){
            this.setState({
              winner : square[a],
              square : Array(9).fill(null),
              count : 0,
              xnext : 1
            });
        }
      }
    }
    else{
      this.setState({
          square : Array(9).fill(null),
          count : 0,
          winner : "none",
          xnext : 1,
      });
    }
  }
  renderSquare(i) {
    return(
      <Square  value={this.state.square[i]} 
             onClick={() => this.clickHandle(i)}
             />
        
    );   
  }

  render() {
    const winnerstatus = "winner is "+this.state.winner;
    const status = 'Next player: '+(this.state.xnext ? 'X' :'O');
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
        <div>{winnerstatus}</div>
      </div>
    
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
