import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Controls from './components/Controls';

class Sudoku extends Component {
    state = {
        setNum : null
    }
    chooseNumber = (num) => {
        this.setState({
            setNum : (num > 0) ? num : 0
        });
    }
    activeBlock = (active) => {
        this.setState({
            activeBlock: active
        });
        this.chooseNumber(active[2]);
    }

    render () {
        return (
            <div>
                <Board showNum={[
                        [0,2,5,0,4,0,0,9,0],
                        [6,0,1,0,0,3,0,8,0]
                    ]}
                    selectedNum={[
                        [0,2,3,0,4,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0]
                    ]}
                    active={this.activeBlock}
                    newNum={this.state.setNum}
                />
                <Controls onSelectNum={this.chooseNumber} currentNum={this.state.setNum}/>
            </div>
        )
    }
}

export default Sudoku;

ReactDOM.render(<Sudoku />, document.getElementById('root'));