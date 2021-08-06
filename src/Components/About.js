import React, {useEffect} from 'react';
import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`
const Description = styled.strong`
  font-weight: 300;
  font-size: 28px;
`

function About(props) {

  useEffect(() => {

  }, [])

    return (
      <div>
          <Title>
              <Description>About Corsa</Description>
          </Title>
          <div>We are group of fitness professionals, developers, data-scientists, and adventure enthusiasts focused on one thing: moving efficiently in the wilderness.</div>
          <div style={{marginBottom: "15px"}}></div>
          <div>We created this tool to streamline the process of planning distance adventures. Whether it is a local trail race or a multi-day FKT, we hope that Corsa can help you improve your performance.</div>
          
      </div>
      
    )

}

export default About;
