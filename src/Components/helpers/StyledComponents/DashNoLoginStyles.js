import styled from 'styled-components';
import splash from '../media/splash1280.jpg';
import splashsky from '../media/splashsky.jpg'

export const Splash = styled.div`
  border: 1px solid #000;
  background-image: url(${splash});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 95vh;
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.3);
`

export const Menu = styled.div`
  position: absolute; 
  top:0; 
  right:0;
  color: white;
  display: flex;
  flex-direction: row;
  margin: 15px;
`

export const StartButton = styled.button`
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

export const Footer = styled.div`
  border: 1px solid #000;
  background-color: black;
  width: 100%;
  height: 7vh;
  display: flex;
`

export const SplashSky = styled.div`
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

export const MenuWords = styled.div`
  const SplashWords = styled.h4
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1;
  margin: 10px 10px 10px 10px;
  cursor: pointer;
`

export const SplashWords = styled.h4`
  color: white;
  font-weight: 700;
  font-size: ${(props) => props.size};
  line-height: 1;
  margin-top: 1rem;
`

export const SplashBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: ${(props) => props.height};
  margin: 0 0 0 15px;
`