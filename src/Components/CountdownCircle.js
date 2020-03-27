import React, {Component} from 'react';
import styled from 'styled-components';
import Completionist from './Completionist';

const TimeBox = styled.div`
display: flex;
justify-content: space-between;
`


const Circle = styled.div`
    position: relative;
    text-align: center;
    width: 110px;
    height: 110px;
    border-radius: 100%;
    background-color: white;
    background-image:
        linear-gradient(${(props) => props.firstPercent + 'deg'}, transparent 50%, ${(props) => props.firstGradientColor} 50%),
        linear-gradient(${(props) => props.secondPercent + 'deg'}, black 50%, transparent 50%);
    align-items: center;
    justify-content: center;
    margin: auto;
    display: flex;
`

const InnerCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid white;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    background-color: white;
`


class CountdownCircle extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
      }

    
    render() {
        let firstCalculatedPercent = 270;
        let secondCalculatedPercent = 90 + this.props.percent * 3.6;
        let firstGradientColor = 'white';
    
        if(secondCalculatedPercent >= 270) {
            secondCalculatedPercent = 270;
            firstGradientColor = 'black';
            firstCalculatedPercent = 270 + this.props.percent * 3.6;
        }    
        return (
            <Circle 
                firstPercent={firstCalculatedPercent}
                secondPercent={secondCalculatedPercent}
                firstGradientColor={firstGradientColor}
            >
                <InnerCircle>
                    {
                        this.props.completed ? 
                        <Completionist userId={this.props.userId} getTimers={this.props.getTimers} currentTimer={this.props.currentTimer} nextTimer={this.props.nextTimer}></Completionist>
                    :
                        <TimeBox>
                            <span>{this.props.minutes}:{this.props.seconds}</span>
                        </TimeBox>
                    }
                </InnerCircle>
            </Circle>
        )
    }
}

export default CountdownCircle;
