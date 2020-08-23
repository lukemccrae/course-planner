import React from 'react';
import TimeSum from './TimeSum';
import {Grid, Row, Col} from './Grid';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const StatBox = styled.div`
    min-height: 120px;
`

const GreyBox = styled.div`
    background-color: ${(props) => props.color};
`

const options = ["Day", "Week"]

const defaultOption = options[1];

const Stats = ({log, statPeriod, changePeriod}) => {

    let dayStats = [];
    let weekStats = [];
    let selectedStats = [];

    function Stat(name, length, key, date) {
        this.name = name;
        this.length = length;
        this.key = key;
        this.date = date;
    }

    //is this log entry already in the counter?
    function findLog(entry) {
        return weekStats.map(function(l) { return l.name; }).indexOf(entry); 
    };

    for (let i = 0; i < log.length; i++) {

        //if its not there,
        if(findLog(log[i].name) === -1) {
            
            //push a new stat entry
            let stat1 = new Stat(log[i].name, log[i].length, i, log[i].date)

            //if the activity was done in the past 24 hours, push it into dayStat array
            if(Date.now() - log[i].date <= 86400000) {
                dayStats.push(stat1)
            }
            
            //push it into weekStat array regardless
            weekStats.push(stat1);
        } else {
            //increment hash map log value
            weekStats[findLog(log[i].name)].length += log[i].length

            if(Date.now() - log[i].date <= 86400000) {
                dayStats[findLog(log[i].name)].length += log[i].length 
            }
        }
    }
    



    //sort logs according to most time done
    weekStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));
    dayStats.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));

    //assign correct array according to selected period
    if(statPeriod === 'Week') selectedStats = weekStats;
    if(statPeriod === 'Day') selectedStats = dayStats;

    
    return (
        <StatBox>
            <Row>
                <Col size={8}>
                    <h2>Stats</h2>
                </Col>
                <Col size={2}>
                <Dropdown options={options} onChange={changePeriod}  value={defaultOption} placeholder="Select an option" />
                </Col>
            </Row>
            {(selectedStats[0] != undefined) ? 
            selectedStats.map(l => {
            return (
            <GreyBox color={selectedStats.indexOf(l) % 2 === 0 ? '#D3D3D3' : 'white'} key={l.name}>
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
        })
        :
        <div>You have no recent activities.</div>}
        </StatBox>
    )
}

export default Stats;
