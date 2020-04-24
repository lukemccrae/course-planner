import React, {Component} from 'react';
import styled from 'styled-components';

const Box = styled.textarea`
  border: solid 1px black;
  margin-top: 50px;
  resize: none;
  font-size: 16px;
  height: 100px;
  width: 70%;
`


class ForgetBox extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    
    this.state = {
        forgetBox: [],
        lastUpdated: Date.now(),
        saved: true
    }

    this.updateForgetBox = this.updateForgetBox.bind(this);
    this.updateBox = this.updateBox.bind(this);
  }

  UNSAFE_componentWillMount(props) {
    let contents = this.props.boxContents
    console.log(contents);
    this.setState({
      forgetBox: contents
    })
  }

  updateBox() {
    fetch(`https://banana-crumble-42815.herokuapp.com/box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group: this.props.group._id,
        box: this.state.forgetBox
      })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        this.setState({
          saved: true,
          forgetBox: json.box
        })
      } else {
        console.log('failed');
        
      }
    });
  }

  updateForgetBox(event) {
    this.setState({
        forgetBox: event.target.value,
        lastUpdated: Date.now(),
        saved: false
    });

    //if user hasn't typed anything in 3 seconds, update box  
    setTimeout(() => {
      //Date.now() in this function refers to when this function was INITIALLY CALLED
      //after the timeout length, the Date.now() value is equal to what it was WHEN THE SET TIMEOUT FUNCTION WAS INVOKED
      //i think thats how it works at least.
      if(Date.now() - this.state.lastUpdated - 3000 < 50 && Date.now() - this.state.lastUpdated - 3000 > -50) {
        this.updateBox()
      }
    }, 3000);
  }

  render(props) {
    return (
        <div>
            <Box value={this.state.forgetBox} onChange={this.updateForgetBox}></Box>
            {this.state.saved ? <div>saved</div> : <div>not saved</div>}
        </div>

        
            

    )
  }
}

export default ForgetBox;
