import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Point = styled.div`
    width: 1px;
    height: 1px;
    padding-bottom: ${(props) => props.vert + 'px'};
    margin-right: 2px;
    background-color: black;
`

const ProfileBox = styled.div`
    display: inline-flex;
    align-items: baseline;
`

function GainProfile({points}) {
    //profile needs to be an array of 20 numbers representing the elevation data from the points for each mile
    const [profile, setProfile] = useState(new Array(20).fill(0));
    useEffect(() => {
        if(points.length > 0) {
            fillProfile()
        }
    }, [points])

    function fillProfile() {
        let result = []
        let max = 0;
        let min = 0;
        if(points.length > 0) {
            let percent = .01;
            for (let i = 1; i < 21; i++) {
                if(points[Math.floor(percent * points.length)][2] > max) max = Math.round(points[Math.floor(percent * points.length)][2])
                if(points[Math.floor(percent * points.length)][2] < min || i === 1) min = Math.round(points[Math.floor(percent * points.length)][2])

                result.push(Math.round(points[Math.floor(percent * points.length)][2]))
                percent += .05;
            }
        }
        return equalizePercents(result, min, max)
    }

    function equalizePercents(points, min, max) {
        //make each point relative to the min / max as a percentage
        //and display that percentage with a number from 1-20
        let result = [];
        let avgIncrement = (max - min) / 20
        

        for (const point of points) {
            result.push(Math.round((point - min) / avgIncrement))
        }
        console.log(points)
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
