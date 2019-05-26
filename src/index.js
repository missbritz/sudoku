import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Controls from './components/Controls';
import { shuffler, gameDifficulty } from './helpers';
import { TEST } from './constants';

class Sudoku extends Component {
    state = {
        setNum : null,
        allNum: []
    }

    componentDidMount() {
        this.prepareBoard();
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
     * [WORK IN PROGRESS]
     */
    prepareData (level) {
        let data = [],
            newNumber = 0,
            i = 0,
            allData = [];
            //noChoke = 0;

        for ( let j = 0; j < 9; j++) {
            data[j] = [];
            for ( let i = 0; i < 9; i++) {
                let currentPos = data[j].length,
                    colNum = [];

                if (allData.length) {    
                    for(let k = 0; k < allData.length; k++) {
                        colNum.push(allData[k][currentPos]);
                    }
                }

                newNumber = this.FindMeANum(data[j], colNum);
                data[j].push(newNumber);
                
            }
            //Push the generated 9-digits in rows
            allData.push(data[j]);
        }

        return allData;
    }

    // setNumbers () {
    //     let setNums = [],
    //         newNum;
    //     for(let i= 1; i < 10; i++ ){
    //         setNums.push(i);
    //     }

    //     newNum = setNums()
    // }

    /**
     * Generate number between 1 <= 9
     */
    shuffler () {
        return parseInt(Math.random() * (10 - 1) + 1);
    }
    
    /**
     * 
     * @param {*} arrX Collection from {} row
     * @param {*} arrY Collection from {} column
     */
    FindMeANum (arrX = [], arrY = []) {
        let i = 0,
            newNum = 0;

        while (i !== 1) {
            newNum = this.shuffler();
            if (arrX.indexOf(newNum) === -1 && arrY.indexOf(newNum) === -1) {
                i++;
            } else {
                continue;
            }
        }

        return newNum;
    }

    prepareBoard () {
        const bnum = [...TEST.DATA1],
              difficulty = gameDifficulty(1);
        let index = 0;

        for(let i  = 0; i < 9; i++) {
            let hideNum = new Set();
            //Generate difficulty level indices
            while(hideNum.size < difficulty){
                index = shuffler(9, true);
                hideNum.add(index);
            }
            hideNum.forEach(index => {
                //bnum[i].splice(index, 1, 0);
                bnum[i][index] = 0;
            });
        }

        this.setState({
            allNum: bnum
        });
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
        const { allNum } = this.state;
        return (
            <div>
                {allNum.length && (
                    <>
                    {console.log(allNum)}
                    {console.log(this.props.gameData)}
                    <Board
                        feed={this.props.gameData}
                        showNum={allNum}
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
                        checkBlock={this.validateNumber}
                    />
                    <Controls onSelectNum={this.chooseNumber} currentNum={this.state.setNum}/>
                    </>
                )}
            </div>
        )
    }
}

export default Sudoku;

ReactDOM.render(<Sudoku gameData={TEST.DATA1}/>, document.getElementById('root'));