import React, {Component} from 'react';

const TimeFinished = ({group}) => {

    function totalTime() {
        var result = 0;
        for (let i = 0; i < group.timers.length; i++) {
            result = result + group.timers[i].length * 1000      
        }
        return result;
    }

    let timeSummed = new Date().getTime() + totalTime(group);
    let finishedTime = new Date(timeSummed).toString().split(' ')[4].split(':');
    
    
    return (
        <div>{finishedTime[0] + ':' + finishedTime[1]}</div>
    )

}

export default TimeFinished;
