import React, {useState, useEffect} from 'react';


function VertStop({distance, vertInfo, pastAid}) {
    const [vert, setVert] = useState(0);
    useEffect(() => {
        calcVert();
    }, [distance, pastAid])

    function calcVert() {
        let result = 0;
        //start iteratig through vertInfo.cumulativeGain array starting from pastStop stop
        for (let i = pastAid; i < pastAid + distance; i++) {
            if(vertInfo[i] !== undefined && vertInfo[i] > 0) {
                result += vertInfo[i]
            }
        }
        setVert(Math.round(result))
    }
    
    return (
        <div>
            <li>vert to next aid: {vert}</li>
        </div>
    )
}

export default VertStop;
