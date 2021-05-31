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
    "Day", 
    "Week"]

const defaultOption = options[1];

const Stats = ({log, statPeriod, changePeriod}) => {
    console.log(log)

    let selectedStats = [];
    statPeriod === "Day" ? selectedStats = log.dayStats : selectedStats = log.weekStats;
    
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
