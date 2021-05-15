import React, {useState, useEffect} from 'react';

function Title(props) {
    useEffect(() => {
        document.title = `${props.name} ${props.min}:${props.sec}` || "";
    }, [props.sec]);
    return (<div></div>);
};

export default Title;