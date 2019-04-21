import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';

const Button = styled.button`
    padding: 10px;
    border: none;
    background: ${props => props.active ? 'blue' : 'skyblue'};
`

class Controls extends Component {

    state = {
        activeNum : null
    }

    selectedNum = (num) => {
        this.setState({
            activeNum: num
        });
        this.props.onSelectNum(num);
    }

    componentDidUpdate (prevProps) {
        if (this.props.currentNum !== prevProps.currentNum) {
            this.selectedNum(this.props.currentNum);
        }
    }

    render () {
        const buttons = [1,2,3,4,5,6,7,8,9]

        return (
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Row>
                                {
                                    buttons.map(i => {
                                        return <Col sm={1} key={i}><Button active={this.state.activeNum === i} onClick={() => this.selectedNum(i)}>{i}</Button></Col>
                                    })
                                }
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Row>
                                <Col><Button>Reset</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        )
    }
}

export default Controls;