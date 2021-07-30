import React from 'react';
import {Line} from 'react-chartjs-2';
import styled from 'styled-components';

const Chart = styled.div`
    display: inline;
`

function Profile(props) {
    console.log(props)
    function fillPoints(props) {
        let tempPoints = [];
        for (let i = 0; i < props.coordinates.length; i++) {
            tempPoints.push(Math.round(props.coordinates[i][2]))
        }
        return tempPoints;
    }

    const data = {
        // labels: Array.from(Array(Math.round(props.route.properties.distance)).keys()),
        labels: Array(props.coordinates.length).fill("l"),
        datasets: [{
            label: "",
            data: fillPoints(props),
            backgroundColor: "blue",
            tension: 0.4,
            fill: true
        }],
        options: {
            animation: false,
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            },
            maintainAspectRatio: true,
            scales: {
                // y: {
                //     ticks: {
                //         color: "white",
                //         font: {
                //             size: 18
                //         }
                //     }
                // },
                // x: {
                //     ticks: {
                //         color: "white",
                //         font: {
                //             size: 18
                //         }
                //     }
                // },
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
