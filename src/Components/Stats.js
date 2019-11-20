import React, {Component} from 'react';
import TimeSum from './TimeSum';
import styled from 'styled-components';

const StatBox = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
`

const Stats = ({log}) => {
    let counter = [];
    function Stat(name, length, key) {
        this.name = name;
        this.length = length;
        this.key = key;
    }
    function findLog(entry) {
        let result = counter.map(function(l) { return l.name; }).indexOf(entry); 
        return result;
    }
    for (let i = 0; i < log.length; i++) {
        if(findLog(log[i].name) === -1) {
            let stat1 = new Stat(log[i].name, log[i].length, i)
            counter.push(stat1)
        } else {
            //increment hash map log value
            counter[findLog(log[i].name)].length += log[i].length
        }
    }
    
    return (
        <div>{counter.map(l => {
            
            return (
                <StatBox key={l.key}>
                    <div>{l.name}</div>
                    <TimeSum timers={[l]}></TimeSum>
                </StatBox>
            )
        })}</div>
    )
}

export default Stats;
