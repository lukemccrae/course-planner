import React, {useState, useEffect} from 'react';


function VertStop({distance, vertInfo, pastAid}) {
    const [vert, setVert] = useState(0);
    useEffect(() => {
        calcVert();
    }, [distance, pastAid])

    function calcVert() {
        let result = 0;
        //start iteratig through vertInfo.cumulativeGain array starting from pastStop stop
        for (let i = pastAid - 1; i < pastAid + distance; i++) {
            if(vertInfo[i] !== undefined) {
                result += vertInfo[i]
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
