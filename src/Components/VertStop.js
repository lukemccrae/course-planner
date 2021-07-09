import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


function VertStop({distance, vertInfo, pastAid}) {
    const [vert, setVert] = useState(0);
    useEffect(() => {
        calcVert();
    }, [distance, pastAid])

    function calcVert() {
        let result = 0;
        //start iteratig through vertInfo.cumulativeGain array starting from pastStop stop
        for (let i = pastAid - 1; i < pastAid + distance; i++) {
            if(vertInfo.cumulativeGain[i] != undefined) {
                result += vertInfo.cumulativeGain[i]
            }
        }
        setVert(Math.round(result))
    }
    
    return (
        <div>
            <div>vert to next aid: {vert}</div>
        </div>
    )
}

export default VertStop;
