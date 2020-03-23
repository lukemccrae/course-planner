import React from 'react';
import TimeSum from './TimeSum';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

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

    
    
    return (
        <div>{counter.map(l => {
            return (
                <Container>
                    <Row>
                        <Col>
                            <div>{l.name}</div>
                        </Col>
                        <Col>
                            <TimeSum timers={[l]}></TimeSum>
                        </Col>
                    </Row>
                </Container>

            )
        })}</div>
    )
}

export default Stats;
