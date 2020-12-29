import React, {Component} from 'react';
import styled from 'styled-components';
import Completionist from './Completionist';

// let colors = [
//     "#428A79",
//     "#71AF55",
//     "#F00500",
//     "#E4BE67",
//     "#E47043",
//     "#B63534",
//     "#9598AB",
//     "#697C68",
//     "#420C0A"
// ].sort(() => .5 - Math.random());


const TimeBox = styled.div`
    display: block;
    justify-content: space-between;
`

const Name = styled.h5`
    font-weight: 250;   
`

const Time = styled.span`
    font-size: 40px;
    font-weight: 90;
`

const Circle = styled.div`
    padding: 2px 2px 2px 2px;
    position: absolute;
    text-align: center;

    // set width / height as functions of the index of each timer in the timers group array
    // this enables them to sit on top of each other
    width: ${(props) => 215 + props.children._owner.stateNode.props.group.timers.length * 5 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 20 + "px"};
    height: ${(props) => 215 + props.children._owner.stateNode.props.group.timers.length * 5 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 20 + "px"};
    border-radius: 100%;
    background-color: ${(props) => props.colors[props.children._owner.stateNode.props.group.timers.indexOf(props.timer)]};
    background-image:

        //to ensure that only one circle counts down at once, the degree passed to linear gradient needs to either be the correct one or 270 / 90, which will keep it unmoving
        //if (parent).props.currentTimer is props.timer, give it the right percent. otherwise give it 270 / 90

        linear-gradient(${(props) => (props.timer == props.children._owner.stateNode.props.currentTimer ? props.firstPercent : 270) + 'deg'}, transparent 50%, ${(props) => props.firstGradientColor} 50%),
        linear-gradient(${(props) => (props.timer == props.children._owner.stateNode.props.currentTimer ? props.secondPercent : 90) + 'deg'}, white 50%, transparent 50%);

    align-items: center;
    justify-content: center;

    margin: 
    //margin top and left porportional to its place in the timer array
        ${(props) => props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 10 + "px"};
        0
        0
        ${(props) => props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 10 + "px"};

    display: flex;
`

const InnerCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    width: ${(props) => 145 + props.children._owner.stateNode.props.group.timers.length * 5 + props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 10 + "px"};
    height: ${(props) => 145 + props.children._owner.stateNode.props.group.timers.length * 5 + props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 10 + "px"};
    background-color: white;
`


class CountdownCircle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: [
                "#428A79",
                "#71AF55",
                "#F00500",
                "#E4BE67",
                "#E47043",
                "#B63534",
                "#9598AB",
                "#697C68",
                "#420C0A"
            ],
            //randomize array (couldnt get it to work this way)
            // .sort(() => .5 - Math.random())
        }
      }

      UNSAFE_componentWillMount() {
        //make finished timers colors white so they disapear after done
        let colorsOneLess = this.state.colors;
        for (let i = 0; i < this.props.currentTimer.length; i++) {
            let index = this.props.group.timers.indexOf(this.props.currentTimer);
            colorsOneLess[index - 1] = "white";
        }
        this.setState({
            colors: colorsOneLess
        })
      }
 
    
    render() {
        //white gradient on the left
        let firstCalculatedPercent = 270;
        let firstGradientColor = 'black';

        //white gradient on the right, moves first
        let secondCalculatedPercent = 90 + this.props.percent * 3.6;

        //once spinner is halfway done, colors switch
        if(secondCalculatedPercent >= 270) {
            secondCalculatedPercent = 270;
            firstGradientColor = 'white';
            firstCalculatedPercent = 270 + this.props.percent * 3.6;
        }
        return (
            <div>
                {this.props.group.timers.map(t => {
                    return (
                        <Circle 
                            firstPercent={firstCalculatedPercent}
                            secondPercent={secondCalculatedPercent}

                            //if the spinner is over halfway, only make the spinning color change to white
                            firstGradientColor={secondCalculatedPercent >= 270 ? 
                                //if timer is spinning timer, make it white after halfway
                                (this.props.currentTimer == t ? "white" : this.state.colors[this.props.group.timers.indexOf(t)]) : this.state.colors[this.props.group.timers.indexOf(t)]}
                            timer={t}
                            colors={this.state.colors}
                        >
                    
                        <InnerCircle
                            timerId={t.id}
                        >
                        {
                            this.props.completed ? 
                            <Completionist currentColor={this.state.colors[this.props.group.timers.indexOf(this.props.currentTimer)]} group={this.props.group} userId={this.props.userId} getTimers={this.props.getTimers} currentTimer={this.props.currentTimer} nextTimer={this.props.nextTimer}></Completionist>
                        :
                        <div>
                            <TimeBox>
                                <Name>{this.props.timer.name}</Name>
                                <Time>{this.props.minutes}:{this.props.seconds}</Time>
                            </TimeBox>
                            
                        </div>
                        
                        }
                    </InnerCircle>
                </Circle>
                    )
                    
                })}

            </div>
        )
    }
}

export default CountdownCircle;
