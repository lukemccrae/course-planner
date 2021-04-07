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
  const [lastUpdated, setLastUpdated] = useState(0);
  const [saved, isSaved] = useState(true);

  useEffect(() => {
    setBox(props.boxContents[0])
  }, []);

  function clearBox() {
    setBox("");
    isSaved(false);
    updateBox(forgetBox);
  }

  function updateBox(box) {
    fetch(`https://banana-crumble-42815.herokuapp.com/box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group: props.group._id,
        box: box
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        isSaved(true)
      } else {
        console.log('failed');
        
      }
    });
  }

  function updateForgetBox(event) {
    setLastUpdated(Date.now());
    setBox(event.target.value);
    isSaved(false);

    //if user hasn't typed anything in 3 seconds, update box  
    setTimeout(() => {
      //Date.now() in this function refers to when this function was INITIALLY CALLED
      //after the timeout length, the Date.now() value is equal to what it was WHEN THE SET TIMEOUT FUNCTION WAS INVOKED
      //i think thats how it works at least.
      if(Date.now() - lastUpdated - 3050 < 100 && Date.now() - lastUpdated - 3000 > -50) {
        updateBox(forgetBox)
      }
    }, 3000);
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
