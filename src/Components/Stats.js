import React from 'react';
import TimeSum from './TimeSum';
import {Grid, Row, Col} from './Grid';
import styled from 'styled-components';

const GreyBox = styled.div`
    background-color: ${(props) => props.color};
`

const Stats = ({log}) => {
    let counter = [];

    function Stat(name, length, key) {
        this.name = name;
        this.length = length;
        this.key = key;
    }

    //is this log entry already in the counter?
    function findLog(entry) {
        return counter.map(function(l) { return l.name; }).indexOf(entry); 
    }

    for (let i = 0; i < log.length; i++) {

        //if its not there,
        if(findLog(log[i].name) === -1) {
            //push a new stat entry
            let stat1 = new Stat(log[i].name, log[i].length, i)
            counter.push(stat1);
        } else {
            //increment hash map log value
            counter[findLog(log[i].name)].length += log[i].length
        }
    }

    //sort logs
    counter.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));

    // counter.indexOf(l) % 2
    
    return (
        <Grid>{counter.map(l => {
            return (
            <GreyBox color={counter.indexOf(l) % 2 === 0 ? '#D3D3D3' : 'white'} key={l.name}>
                 <Row>
                    <Col size={.5}></Col>
                    <Col size={5}>
                        <div>{l.name}</div>
                    </Col>
                    <Col size={2}>
                        <TimeSum timers={[l]}></TimeSum>
                    </Col>
            </Row>
            </GreyBox>
            )
        })}</Grid>
    )
}

export default Stats;
