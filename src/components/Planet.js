import React from 'react';
const Planet = ({
    id,
    info,
    handleClick
  }) => {

    let fontSize = 50 + info.population_perc;

    return (
        <li
            style={{ fontSize: fontSize }}
            className={info.population === 'unknown' ? 'unknown planetList' : 'known planetList'}
            onClick={() => handleClick(info)}>
            <p>{info.name}</p>
        </li>
    )
}

export default Planet