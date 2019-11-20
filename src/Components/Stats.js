import React, {Component} from 'react';

const Stats = ({log}) => {
    let counter = {}
    for (let i = 0; i < log.length; i++) {
        if(!counter[log[i].name]) {
            counter[log[i].name] = log[i].length
        } else {
            counter[log[i].name] += log[i].length
        }
    }
    
    return (
        <div>{log.map(l => {
            return (
                <div key={l.date}>{l.name}</div>
            )
        })}</div>
    )
}

export default Stats;
