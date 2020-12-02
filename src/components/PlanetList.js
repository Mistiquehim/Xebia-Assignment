import React from 'react';
import Planet from './Planet'

const PlanetList = ({
  data,
    handleClick
}) => {

    let populations = [];
    data.map((data, index) => {
        if (data.population !== 'unknown') {
            populations.push(parseInt(data.population));
        }
    });
    populations.sort(function (a, b) { return a - b });
    let min = parseInt(populations[0]);
    let max = parseInt(populations[populations.length - 1]);
    let range = max - min

    const planets = data
        .map((planet, i) => {
            let percentage = 0;
            if (planet.population !== 'unknown') {
                let correctedStartValue = parseInt(planet.population) - min
                percentage = (correctedStartValue * 100) / range
            }
            planet.population_perc = percentage;

            return (
                <Planet
                    id={planet.id}
                    key={i}
                    info={planet}
                    handleClick={(id) => handleClick(planet)}
                />
            )
        })

    /* ##### the component's output ##### */
    return (
        <ul>
            {planets}
        </ul>
    )
}

export default PlanetList;
