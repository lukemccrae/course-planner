import React, {Component} from 'react';
import styled from 'styled-components';
import Completionist from './Completionist';
import {Grid, Row, Centered, Col} from './Grid';


const TimeBox = styled.div`
    display: block;
    justify-content: space-between;
`

const Name = styled.h5`
    font-weight: 250;
    margin: 0;
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
    width: ${(props) => 42 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 4 + "vh"};
    height: ${(props) => 42 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 4 + "vh"};
    border-radius: 100%;
    background-color: ${(props) => props.colors[props.children._owner.stateNode.props.group.timers.indexOf(props.timer)]};
    background-image:

        //to ensure that only one circle counts down at once, the degree passed to linear gradient needs to either be the correct one or 270 / 90, which will keep it unmoving
        //if (parent).props.currentTimer is props.timer, give it the right percent. otherwise give it 270 / 90

        linear-gradient(${(props) => (props.timer === props.children._owner.stateNode.props.currentTimer ? props.firstPercent : 270) + 'deg'}, transparent 50%, ${(props) => props.firstGradientColor} 50%),
        linear-gradient(${(props) => (props.timer === props.children._owner.stateNode.props.currentTimer ? props.secondPercent : 90) + 'deg'}, white 50%, transparent 50%);

    align-items: center;
    justify-content: center;

    margin: 
    //margin top and left porportional to its place in the timer array
        ${(props) => props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 2 + "vh"};
        0
        0
        ${(props) => props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 2 + "vh"};

    display: flex;
`

const InnerCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;

    //height and width are functions of how many timers there are
    //  decrease circle for each timer
    width: ${(props) => 39 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 4 + "vh"};
    height: ${(props) => 39 - props.children._owner.stateNode.props.group.timers.indexOf(props.timer) * 4 + "vh"};
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
            ],
            //randomize array (couldnt get it to work this way)
            // .sort(() => .5 - Math.random())
            currentPercent: 0,
            tickAdjust: .01
        }
      }

      //this is called with state updates
      //so after every setTimeout (many many times)
      componentDidUpdate () {
        let numberTicks = 5;

        //set up amount to move spinner each second
        let currentIncrement = 100 / this.props.timer.length / numberTicks;
        
        //make currentIncrement 0 if timer name is undefined
        if(this.props.timer.name === undefined) currentIncrement = 0;

        //if spinner isnt complete, or wont be complete after this tick,
        if (this.state.currentPercent + currentIncrement < 100) {
            currentIncrement += currentIncrement * this.state.tickAdjust;
            let currentPercent = this.state.currentPercent;

            setTimeout(() => 
            this.setState({
                currentPercent: currentPercent + currentIncrement
            }), 200);

        //once the timer is finished, make the final color white
        //this solves the problem of the spinner not totally completing if the increment bumps it over 100%
        } else {
            //set state colors array in variable
            let colorsDoneBecomeWhite = this.props.colors;

            let index = this.props.group.timers.indexOf(this.props.currentTimer);
            for (let i = 0; i < index + 1; i++) {
                if(this.props.colors[i] !== "white") {
                    colorsDoneBecomeWhite[i] = "white";
                    this.setState({
                        colors: colorsDoneBecomeWhite
                    })
                }
            }
        }
      }

      //this is an attempt to adjust the spinning rate to compensate for setTimeout bugs
      //currently this.state.currentPercent and props.percent are not synchronized
      componentWillReceiveProps(nextProps) {
        //   console.log(nextProps.percent, this.state.currentPercent)
        //   let newTickAdjust = this.state.tickAdjust;
        // if(this.state.currentPercent % nextProps.percent > .05){
        //     this.setState({
        //         tickAdjust: newTickAdjust - .05
        //     })
        // } else {
        //     this.setState({
        //         tickAdjust: newTickAdjust + .1
        //     })
        // }
    }

      //make finished timers colors white so they disapear after done
      //this runs when component starts, either on group start or next timer
      UNSAFE_componentWillMount() {
        //copy state colors array
        let colorsDoneBecomeWhite = this.props.colors;
        let index = this.props.group.timers.indexOf(this.props.currentTimer);

        for (let i = 0; i < index; i++) {
            if(this.props.colors[i] !== "white") {
                colorsDoneBecomeWhite[i] = "white";
                this.setState({
                    colors: colorsDoneBecomeWhite,
                    currentTotalSeconds: this.props.seconds
                })
            }
        }
      }
    
    render() {
        //white gradient on the left
        let firstCalculatedPercent = 270;

        //white gradient on the right, moves first
        let secondCalculatedPercent = 90 + this.state.currentPercent * 3.6;

        //once spinner is halfway done, colors switch
        if(secondCalculatedPercent >= 270) {
            secondCalculatedPercent = 270;
            firstCalculatedPercent = 270 + this.state.currentPercent * 3.6;
        }

        return (
            <div>
                {this.props.group.timers.map(t => {
                    return (
                        <Circle 
                        //only give the updated percent if the timerStart boolean is on
                            firstPercent={firstCalculatedPercent}
                            secondPercent={secondCalculatedPercent}

                            //if the spinner is over halfway, only make the spinning color change to white
                            firstGradientColor={secondCalculatedPercent >= 270 ? 
                                //if timer is spinning timer, make it white after halfway
                                (this.props.currentTimer === t ? "white" : this.props.colors[this.props.group.timers.indexOf(t)]) : this.props.colors[this.props.group.timers.indexOf(t)]}
                            timer={t}
                            colors={this.props.colors}
                        >
                    
                        <InnerCircle
                            timer={t}
                        >
                        {
                            this.props.completed ? 
                            <Completionist currentColor={this.props.colors[this.props.group.timers.indexOf(this.props.currentTimer)]} group={this.props.group} userId={this.props.userId} getTimers={this.props.getTimers} currentTimer={this.props.currentTimer} nextTimer={this.props.nextTimer}></Completionist>
                        :
                        <div>
                            {this.props.timerStart ? <TimeBox>
                                <Name>{this.props.timer.name}</Name>
                                <Time>{this.props.minutes}:{this.props.seconds}</Time>
                            </TimeBox> : null}
                            
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
