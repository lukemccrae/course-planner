import React from 'react';
import TimeSum from './TimeSum';
import {Row, Col} from './Grid';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import {getFromStorage} from '../utils/storage';
import 'react-dropdown/style.css';

const StatBox = styled.div`
    min-height: 120px;
`

const GreyBox = styled.div`
    background-color: ${(props) => props.color};
`

const options = [
    // "Day", 
    "Week"]

const defaultOption = options[1];

const Stats = ({log, statPeriod, changePeriod}) => {

    let selectedStats = [];
    statPeriod === "Day" ? selectedStats = log.dayStats : selectedStats = log.weekStats;

    // function setStats() {
    //     for (let i = 0; i < log.length; i++) {

    //         //if its not there,
    //         if(findLog(log[i].name) === -1) {
                
    //             //push a new stat entry
    //             let stat1 = new Stat(log[i].name, log[i].length, i, log[i].date)
    
    //             //if the activity was done in the past 24 hours, push it into dayStat array
    //             if(Date.now() - log[i].date <= 86400000) {
    //                 dayStats.push(stat1)
    //             }
                
    //             //push it into weekStat array regardless
    //             weekStats.push(stat1);
    //         } else {
    //             //increment hash map log value
    //             weekStats[findLog(log[i].name)].length += log[i].length
    
    //             if(Date.now() - log[i].date <= 86400000) {
    //                 dayStats[findLog(log[i].name)].length += log[i].length 
    //             }
    //         }
    //     }
    // }
    

    
    return (
        <StatBox>
            <Row>
                <Col size={8}>
                    <h2>Stats</h2>
                </Col>
                <Col size={2}>
                <Dropdown options={options} onChange={changePeriod}  value={defaultOption} placeholder="Week" />
                </Col>
            </Row>
            {(selectedStats[0] !== undefined) ? 
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
        <div>
        {getFromStorage("the_main_app") ? <div>You have no recent activities.</div> : <div>Create an account to track your progress.</div>}
        </div>}
        </StatBox>
    )
}

export default Stats;
