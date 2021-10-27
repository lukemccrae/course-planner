import React from 'react';
import { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import {colors} from './helpers/Colors';
import { useStopsContext } from '../Providers/StopsProvider';
import { useMileTimesContext } from '../Providers/MileTimesProvider';
import { useRouteContext } from '../Providers/RouteProvider';



function Profile() {
    // console.log(stops, coordinates, mileTimes)

    const {stops} = useStopsContext();
    const {mileTimes} = useMileTimesContext();
    const {coordinates} = useRouteContext();

    const [labels, setLabels] = useState([]);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        if(coordinates.length > 10 && coordinates[5][2]) {
            const timer = setTimeout(() => {
                fillLabels(coordinates.length);
                buildDataset(coordinates.length);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [stops, coordinates, mileTimes])

    function fillLabels(coordLength) {
        let result = [];
        for (let i = 0; i < coordLength; i++) {
            result.push(i)
        }
        setLabels(result)
    }

    //split apart coordinates between each stop
    function buildDataset(coordLength) {
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
        // return tempPoints;
        setDataset(tempPoints)
    }

    //return an object for the chartJS datasets array
    function fillPoints(coordStart, coordEnd, index) {
        let points = [];
        for (var i = coordStart; i < coordEnd; i++) {
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

    const data = {
        labels: labels,
        datasets: dataset,
    };

    const options = {
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            ],
        },
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
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default Profile;