import React from 'react';
import './FormWeather.scss';

const FormWeather = ({ onSubmitForm }) => {

    return (
        <div className="form-weather">
            <form onSubmit={onSubmitForm}>
                <div className="wrap">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        id="input1"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        id="input2"
                    />
                    <button type="submit" >GET WEATHER</button>
                </div>
            </form>
        </div>
    )
}

export default FormWeather;