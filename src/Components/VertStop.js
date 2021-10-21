import React, {useState, useEffect} from 'react';


function VertStop({distance, vertInfo, pastAid, Detail}) {

    const [gain, setGain] = useState(0);
    const [loss, setLoss] = useState(0);

    useEffect(() => {
        calcVert();
    }, [distance, pastAid])

    function calcVert() {
        console.log(vertInfo)
        let gain = 0;
        let loss = 0;
        //start iteratig through vertInfo.cumulativeGain array starting from pastStop stop
        for (let i = pastAid; i < pastAid + distance; i++) {
            if(vertInfo.cumulativeGain[i] !== undefined && vertInfo.cumulativeGain[i] > 0) {
                gain += Math.round(vertInfo.cumulativeGain[i])
            }

            if(vertInfo.cumulativeGain[i] !== undefined && vertInfo.cumulativeGain[i] < 0) {
                loss += Math.round(vertInfo.cumulativeLoss[i] * -1)
            }
        }
        setGain(gain);
        setLoss(loss);
    }

    
    return (
        <div style={{display: "flex"}}>
            <li><Detail>{gain}</Detail>gain</li>
            <li><Detail>{loss}</Detail>loss</li>
        </div>
    )
}

export default VertStop;
