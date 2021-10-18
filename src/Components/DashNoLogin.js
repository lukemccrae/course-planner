import React, {useEffect} from 'react';
import {Splash, Menu, StartButton, Footer, SplashSky, MenuWords, SplashWords, SplashBox} from './helpers/StyledComponents/DashNoLoginStyles';

function DashNoLogin(props) {

    return (
      <div>
        <Menu>
          <MenuWords onClick={() => {props.setLoginModalIsOpen(true)}} size={"1rem"}>Login</MenuWords>
          <MenuWords onClick={() => {props.setAboutModalIsOpen(true)}} size={"1rem"}>About</MenuWords>
          {/* <MenuWords size={"1rem"}>Corsa Plus</MenuWords> */}
        </Menu>
        <Splash>
          <SplashBox height={"75vh"}>
            <SplashWords size={"3rem"}>
                ACHIEVE YOUR BEST
              </SplashWords>
              <SplashWords size={"3rem"}>
                WITH OUR DATA-DRIVEN TOOLS
              </SplashWords>
              <div style={{margin: "25px"}}><StartButton onClick={() => props.setEditNoLoginModalIsOpen(true)}>GET STARTED</StartButton></div>
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
