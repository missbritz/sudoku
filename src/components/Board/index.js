import React, { Component } from 'react';
import styled from 'styled-components';
import { setConfiguration, Container, Row, Col } from 'react-grid-system';

setConfiguration({defaultScreenClass: 'xs', gridColumns: 12});

const SBoard = styled.div`
    min-width: 400px;
    padding: 30px;
`

const Selected = styled.div`
    border: ${props => props.active ? '1px solid blue' : 'none'};
`

const SCol = styled(Col)`
    border: 1px solid red;
    text-align: center;
    padding: 20px 10px;
    @media (max-width: 568px) {
        padding: 10px 5px;
    }
`;

class Board extends Component {

    state = {
        showNum: this.props.showNum,
        isReset: this.props.reset
    }

    startGame () {
        this.setState({
            showNum: this.props.showNum,
            active: null,
            newNum: null
        })
    }

    setActiveBlock (posX, posY, value) {
        const activeBlock = [posX, posY, value];
        this.props.active(activeBlock);
        this.setState({
            active: [posX, posY]
        });
    }

    updateGameData (active, newValue) {
        const loadedData = this.state.showNum;
        const posX = active[0];
        const posY = active[1];
        //Array itself being updated directly.  
        //Defo, not a good idea.  Hence, doing manual setState below
        loadedData[posX][posY] = newValue;

        this.setState({
            showNum : loadedData
        });
    }

    updateValue (current, newNumber) {
        return newNumber && current !== newNumber ? newNumber : current
    }

    componentDidUpdate (prevProps) {
        //Block value has changed
        if (this.props.newNum !== prevProps.newNum) {
            const currentActive = this.state.active;
            this.updateGameData(currentActive, this.props.newNum);
        }
    }
    
    render () {
        const { newNum } = this.props;
        const { showNum, active } = this.state;

        return (
            <SBoard>
                <Container>
                {showNum && showNum.map((i, xpos) => {
                    return (
                        <Row key={xpos}>
                        {i.map((j, ypos) => {
                            return (
                                <SCol key={xpos + '-' + ypos} onClick={() => this.setActiveBlock(xpos, ypos, j)}>
                                    {active && xpos === active[0] && ypos === active[1] ? (
                                        <Selected active={xpos === active[0] && ypos === active[1]}>
                                            {newNum && j !== newNum ? newNum : j}
                                        </Selected>
                                    ) : (
                                        <Selected active={false}>
                                            {j}
                                        </Selected>
                                    )}
                                </SCol>
                            )
                        })}
                        </Row>
                    )
                })}
                </Container>
            </SBoard>
        )
    }
}

export default Board;