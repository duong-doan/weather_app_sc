import React from 'react';
import './Weather.scss'

const Weather = ({
    city,
    temp_min,
    temp_max,
    temp,
    description,
    icon
}) => {
    return (
        <div className="weather">
            <div className="card__weather">
                <h1 className="card__city">{city}</h1>
                <i className={`card__status-img wi ${icon}`}></i>
                {temp ? <h5 className="card__temp">{temp}&deg;C</h5> : null}
                {minmaxTemp(temp_min, temp_max)}
                <h4 className="card__status">{description}</h4>
            </div>
        </div>
    )
}

const minmaxTemp = (min, max) => {
    if (min && max) {
        return (
            <div className="card__wrap">
                <h5 className="wrap__temp-min">{min}&deg;C</h5>
                <h5 className="wrap__temp-max">{max}&deg;C</h5>
            </div>
        )
    }
}

export default Weather;