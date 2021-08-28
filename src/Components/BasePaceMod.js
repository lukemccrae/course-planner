import React, {useState, useEffect} from 'react';
import Slider from 'react-input-slider';
import styled from 'styled-components';

const SliderBox = styled.div`
  width: 50%;
  margin: 0 0 20px 0;

`


function BasePaceMod({minTommss, basePaceMod, setBasePaceMod, goalHours, goalMinutes, setGoalMinutes, setGoalHours}) {
    const [baseAdjust, setBaseAdjust] = useState(0);
    useEffect(() => {
        baseChange()
    }, [baseAdjust])

    function baseChange() {
        let goalInMinutes = parseInt(goalHours) * 60 + parseInt(goalMinutes);

        let adjusted = goalInMinutes + baseAdjust;
        console.log(adjusted)
        setGoalHours(Math.floor(adjusted / 60))
        setGoalMinutes(Math.round(adjusted % 60));


    }
    return (            
        <div style={{display: "flex", justifyContent: "space-around"}}>
            Adjust avg. pace:<SliderBox>
                <Slider
                axis="x"
                xmax = {100}
                xmin = {-100}
                x={baseAdjust}
                onChange={({ x }) =>  setBaseAdjust(x)}/>
            </SliderBox>
            {/* {minTommss((parseInt(goalHours) * 60 + parseInt(goalMinutes)) / vertInfo.length)} */}
            {baseAdjust}
        </div>
    )
}

export default BasePaceMod;