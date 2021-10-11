import React, {useState, useEffect} from 'react';


function VertStop({distance, vertInfo, pastAid, Detail}) {

    const [vert, setVert] = useState(0);
    useEffect(() => {
        calcVert();
    }, [distance, pastAid])

    function calcVert() {
        let result = 0;
        //start iteratig through vertInfo.cumulativeGain array starting from pastStop stop
        for (let i = pastAid; i < pastAid + distance; i++) {
            if(vertInfo.cumulativeGain[i] !== undefined && vertInfo.cumulativeGain[i] > 0) {
                result += vertInfo.cumulativeGain[i]
            }
        }
        setVert(Math.round(result))
    }
    
    return (
        <li><Detail>{vert}</Detail>ft.</li>
    )
}

export default VertStop;
