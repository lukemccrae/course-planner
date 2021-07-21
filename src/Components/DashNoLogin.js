import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import splash from '../splash1280.jpg';
import splashsky from '../splashsky.jpg'
import Button from '@material-ui/core/Button';

function DashNoLogin(props) {

const Splash = styled.div`
  border: 1px solid #000;
  background-image: url(${splash});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 95vh;
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.3);
`

const StartButton = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor:pointer;
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.2);
  margin-top: 15px;

  &:hover {
    box-shadow: inset 0 0 0 1000px rgba(0,0,0,.6);
  }
`

const Footer = styled.div`
  border: 1px solid #000;
  background-color: black;
  width: 100%;
  height: 7vh;
  display: flex;
`

const SplashSky = styled.div`
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.3);
  border: 1px solid #000;
  background-color: white;
  background-image: url(${splashsky});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 30vh;
`

const SplashWords = styled.h4`
  color: white;
  font-weight: 700;
  font-size: ${(props) => props.size};
  line-height: 1;
  margin-top: 1rem;
`

const SplashBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: ${(props) => props.height};
  margin: 0 0 0 15px;
`

  useEffect(() => {

  }, [])

    return (
      <div>
        <Splash>
          <SplashBox height={"75vh"}>
            <SplashWords size={"3rem"}>
                ACHIEVE YOUR BEST
              </SplashWords>
              <SplashWords size={"3rem"}>
                WITH OUR DATA-DRIVEN TOOLS
              </SplashWords>
              <div style={{margin: "25px"}}><StartButton onClick={() => props.setLoginModalIsOpen(true)}>GET STARTED</StartButton></div>
          </SplashBox>
          
        </Splash>
      <SplashSky>
        <SplashBox height={"25vh"}>
          <SplashWords size={"2rem"}>
            AUTOMATE YOUR RACING STRATEGY
          </SplashWords>
          <SplashWords style={{margin: "0 0 0 15px"}} size={"1rem"}>
            <h5>WITH SMART NUTRITION, COURSE INSIGHTS, AND DYNAMIC PACING</h5>
          </SplashWords>
        </SplashBox>
      </SplashSky> 
      <Footer>
        <small style={{color: "white", margin: "15px"}}>© 2021 Corsa</small>
      </Footer>
      </div>
      
    )

}

export default DashNoLogin;
