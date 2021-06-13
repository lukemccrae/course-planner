import React from 'react';
import styled from 'styled-components';
import Box from './ForgetBox.js';
import {Row, Col} from './Grid';

const CheckBox = styled.input`
  display: inline;
`

const CheckBoxBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Divider = styled.div`
  border-top: 2px solid #D3D3D3;
  margin: 5px 0 10px 0;
`

const Share = styled.input`
    width: 100%;
    caret-color: transparent;
`


function Details(props) {
    console.log(props)
    return (
          <div>
            <CheckBoxBox>
                <div onClick={() => {props.saveDetails("autoNext")}} style={{display: "inline"}}><CheckBox type="checkbox" defaultChecked={props.details.autoNext}/> Auto Next</div>
                <div onClick={() => {props.saveDetails("sound")}}  style={{display: "none"}}><CheckBox disabled  type="checkbox" defaultChecked={props.details.sound}/> Sound</div>
                <div onClick={() => {props.saveDetails("restart")}} style={{display: "none"}}><CheckBox disabled type="checkbox" defaultChecked={props.details.restart}/> Restart</div>
            </CheckBoxBox>
            <div style={{margin: "10px 0 0 0"}}>Share this group: </div>
            <Share value={'group-timer.firebaseapp.com/g/' + props.group.hash}></Share>

            <Box boxContents={props.group.box} group={props.group}></Box>
            <Divider></Divider>
            <Row style={{display: 'flex'}}>
            <Col size={2}>
            {/* if no token, show start button. if token, show save/add and delete
                this is so that editTimer appears different on signIn and Dash components */}
                </Col>
              </Row>
              </div>
    )
}

export default Details;
