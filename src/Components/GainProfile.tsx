import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

type Props = {
    vert: number;
}

interface milePoints {
    milePoints: [{
        lat: number;
        long: number;
        elev: number;
    }];
}

const Point = styled.div<Props>`
    width: 1px;
    height: 1px;
    padding-bottom: ${(props) => props.vert + 'px'};
    margin-right: 2px;
    background-color: black;
`

const ProfileBox = styled.div`
    display: inline-flexp
    align-items: baseline;
`

function GainProfile({milePoints}:milePoints) {
    // console.log(milePoints)
    //profile needs to be an array of 20 numbers representing the elevation data from the points for each mile
    const [profile, setProfile] = useState(new Array(20).fill(0));
    useEffect(() => {
        if(milePoints) {
            fillProfile()
        }
    }, [milePoints])

    function fillProfile() {
        let result: Array<number> = [];
        let max = 0;
        let min = 0;
        if(milePoints.length > 0) {
            let percent = .01;
            for (let i = 1; i < 21; i++) {
                if(milePoints[Math.floor(percent * milePoints.length)].elev > max) max = Math.round(milePoints[Math.floor(percent * milePoints.length)].elev)
                if(milePoints[Math.floor(percent * milePoints.length)].elev < min || i === 1) min = Math.round(milePoints[Math.floor(percent * milePoints.length)].elev)

                result.push(Math.round(milePoints[Math.floor(percent * milePoints.length)].elev))
                percent += .05;
            }
        }
        return equalizePercents(result, min, max)
    }

    function equalizePercents(elevPoints: number[], min: number, max: number) {
        //make each point relative to the min / max as a percentage
        //and display that percentage with a number from 1-20
        let result = [];
        let avgIncrement = (max - min) / 20
        

        for (const point of elevPoints) {
            result.push(Math.round((point - min) / avgIncrement))
        }
        setProfile(result)
    }

    return (
        <ProfileBox>
            {profile.map((p) => {
                return (<Point key={Math.random()} vert={p}></Point>)
            })}
        </ProfileBox>
    )
}

export default GainProfile;