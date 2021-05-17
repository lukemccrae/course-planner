import React, {useState, useEffect} from 'react';

function Title(props) {
    useEffect(() => {
        if(props.sec - 1 == 0 && props.min == 0) {
            document.title = `DONE`;
        } else {
            document.title = `${props.name} ${props.min}:${props.sec}` || "";
        }
    }, [props.sec]);
    return (<div></div>);
};

export default Title;