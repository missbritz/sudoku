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
        if ( active ) {
            this.setState({
                activeBlock: active
            });
            this.chooseNumber(active[2]);
        } else {
            this.setState({
                setNum: null
            });
        }
    }

    /**
     * 
     * @param {*} level 
     */
    moderateLevel (level) {
        switch (level) {
            case 1:
                return 4;
            case 2:
                return 6;
            case 3:
                return 8;
            default:
                return 5;
        }
    }

    /**
     * 
     * @param {*} level of game - determine how many numbers to hide
     */
    prepareData (level) {
        let data = [],
            newNumber = 0,
            i = 0,
            allData = [];

        for ( let j = 0; j < 9; j++) {
            data[j] = [];
            i = 0;
            while (i < 9) {
                //Generate 9 unique numbers per column
                newNumber = this.shuffler();
                if (data[j].indexOf(newNumber) === -1) {
                    data[j].push(newNumber);
                    i += 1;
                } 
            }
            //Push the generated 9-digits in rows
            allData.push(data[j]);
        }

        return allData;

    }

    /**
     * Generate number between 1 <= 9
     */
    shuffler () {
        return parseInt(Math.random() * (10 - 1) + 1);
    }

    /**
     * Validate number if it has been allocated on any block
     * @param {*} currentPosition current position of number in array
     * @param {*} number number to check against the data
     * @param {*} data collection
     */
    validateNumber (currentPosition, number, data) {
        const posX = currentPosition[0],
              posY = currentPosition[1];
        let allData = [];

        for ( let i = 0; i < 10; i++) {
            if (data[posX] === allData[i]) {
                for ( let j = 0; j < 10; j++) {
                    if (posX === i && posY === j) {
                        break;
                    }

                    //Check if the number is already allocated - return 0 if allocated somewhere
                    if (this.validateY(i, j, number, data) && this.validateX(i, j, number, data)) {
                        return number;
                    } else {
                        return 0;
                    }
                }
            }
        } 
    }

    validateY (posX, posY, number, data) {
        let allData = data;
        for ( let j = 0; j < 10; j++) {
            if (allData[posY][j] === number && posY !== j) {
                return false;
            } else {
                return true;
            }
        }
    }

    validateX (posX, posY, number, data) {
        let allData = data;
        for ( let j = 0; j < 10; j++) {
            if (allData[j][posX] === number && posX !== j) {
                return false;
            } else {
                return true;
            }
        }
    }


    render () {
        return (
            <div>
                {console.log(this.prepareData(1))}
                <Board showNum={[
                        [0,2,5,0,6,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0],
                        [0,9,0,0,0,0,2,0,0],
                        [8,0,2,0,0,9,0,3,0],
                        [0,1,0,0,4,0,0,9,6],
                        [6,0,0,0,0,4,0,1,0],
                        [0,2,5,0,7,0,0,0,0],
                        [3,0,9,0,0,0,0,0,1],
                        [4,0,0,0,0,3,0,0,2]
                    ]}
                    selectedNum={[
                        [0,2,3,0,4,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0],
                        [0,2,3,0,4,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0],
                        [0,2,3,0,4,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0],
                        [0,2,3,0,4,0,0,9,0],
                        [4,0,1,0,0,3,0,8,0],
                        [4,0,1,0,0,3,0,8,0]
                    ]}
                    active={this.activeBlock}
                    newNum={this.state.setNum}
                    level={1}
                />
                <Controls onSelectNum={this.chooseNumber} currentNum={this.state.setNum}/>
            </div>
        )
    }
}

export default Sudoku;

ReactDOM.render(<Sudoku />, document.getElementById('root'));