import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

const Pause = ({paused, unPause, pause}) => {
    if(paused) return (<Button onClick={unPause}>Unpause</Button>)
    return ( <Button onClick={pause}>Pause</Button> )
}

export default Pause;
