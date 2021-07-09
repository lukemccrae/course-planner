import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {Row, Col} from './Grid';
import cloneDeep from 'lodash.clonedeep';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const PaceBox = styled.div`
    width: 50px;
    height: 50px;
    border-style: solid black 1px;
    background-color: ${(props) => props.mileTimes[props.m] === 0 ? '#1c54b2' : '#8bc34a'}
    margin: 3px;
`

const ATime = styled.div`
    display: block;
    font-weight: bolder;
`

const BTime = styled.div`
    display: block;
    font-weight: bolder;
`

function Pace({updateMiles, mileTimes, details, distance}) {
    const [paceTimes, setPaceTimes] = useState(mileTimes)
      function newMiles(index) {
          var newMiles = mileTimes;
          //swap value
          newMiles[index] = 1 - mileTimes[index];
          updateMiles(newMiles)
      }




    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {mileTimes.map((m, index) => {
                return (
                    <PaceBox m={index} mileTimes={mileTimes} onClick={() => newMiles(index)}>
                        <ATime>
                            {Math.floor(details.pace[m] / 60) }:{details.pace[m] % 60 > 0 ? "30" : "00"}
                        </ATime>
                        <BTime>
                            {Math.floor(details.pace[m] / 60) }:{details.pace[m] % 60 > 0 ? "30" : "00"}
                        </BTime>
                    </PaceBox>
                )
            })}
        </div>
    )
}

export default Pace;
