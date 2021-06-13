import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Box = styled.textarea`
  border: solid 1px black;
  margin-top: 10px;
  resize: none;
  font-size: 16px;
  height: 150px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
`

const ClearButton = styled.div`
  margin-right:auto; 
  margin-left:0;
`

function ForgetBox(props) {
  const [forgetBox, setBox] = useState("");
  const [saved, setSaved] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setBox(props.boxContents[0])
    setTimer(null);
  }, []);

  function clearBox() {
    setBox("");
    setSaved(false);
    updateBox(forgetBox);
  }

  function updateBox(box) {
    fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group: props.group._id,
        box: forgetBox
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        console.log("saved")
        setSaved(true)
      } else {
        console.log('failed');
        
      }
    });
  }

  function updateForgetBox(event) {
    setBox(event.target.value)
    clearTimeout(timer);
    setSaved(false);
    setTimer(setTimeout(() => {
      updateBox();
    }, 1000))
  }

    return (
      <div>
        <Box placeholder={"Distracted?\nHave an idea?\nWrite your thoughts here."} value={forgetBox} onChange={updateForgetBox}></Box>
        <ButtonWrapper>
          <ClearButton>
              <Button onClick={() => clearBox()}>clear</Button>
          </ClearButton>
          {saved ? <div>saved</div> : <div>not saved</div>}
        </ButtonWrapper>
      </div>
    )
}

export default ForgetBox;
