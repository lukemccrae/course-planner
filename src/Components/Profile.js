import React from 'react';
import { useEffect, useState } from 'react';
import {Line, Scatter} from 'react-chartjs-2';
import styled from 'styled-components';

const Chart = styled.div`
    display: inline;
    max-width: 80vw;
`

const colors = [
    "#428A79",
    "#71AF55",
    "#F00500",
    "#E4BE67",
    "#E47043",
    "#B63534",
    "#9598AB"
]

function Profile({stops, coordinates, mileTimes}) {

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        buildDataset()
    }, [stops, coordinates, mileTimes])

    function buildDataset() {
        let tempPoints = [];
        for (let i = -1; i < stops.length; i++) {
            //percentages of each stop beginning and end
            //account for starting from before the first stop with i = -1
            let startPercent = (i === -1 ? 0 : parseFloat(stops[i].miles)) / mileTimes.length
            let coordStart = Math.round(coordinates.length * startPercent)

            //make sure we dont index past the final stop
            let endPercent = (stops.length > i + 1 ? parseFloat(stops[i + 1].miles) : mileTimes.length) / mileTimes.length
            let coordEnd = Math.round(coordinates.length * endPercent)

            tempPoints.push(fillPoints(coordStart, coordEnd, i + 1))

            // console.log(coordStart, coordEnd)

        }
        if(stops[0].miles === 0) tempPoints.shift()
        return tempPoints;

    }

    function fillPoints(coordStart, coordEnd, index) {
        let points = [];

        for (let i = coordStart; i < coordEnd; i++) {
            points.push({x: i, y: Math.round(coordinates[i][2])})
        }

        let obj = {
            label: stops[0].miles == 0 ? index : index + 1,
            data: points,
            backgroundColor: colors[index],
            tension: 0.4,
            fill: true
        }
        return obj;
    }

    function fillLabels() {
        let result = []
        for (let i = 0; i < coordinates.length; i++) {
            result.push(i)
        }
        // setLabels(result)
        return result;
    }

    const data = {
        labels: fillLabels(),
        datasets: buildDataset(),
        options: {
            animation: false,
            scales: {
                x: {
                    type: 'linear'
                  },
                  xAxes: [{
                    ticks: {
                        display: false //this will remove only the label
                    },
                    gridLines: { tickMarkLength: 0 }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
            },
            maintainAspectRatio: false,
            scales: {
                myScale: {
                    position: 'left',
                }
            },
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    }
    return (
            <Chart>
                <div>what</div>
                <Line
                data={data}
                width={50}
                height={20}
                options={data.options}>
                </Line>
            </Chart>
    )
}

export default Profile;
