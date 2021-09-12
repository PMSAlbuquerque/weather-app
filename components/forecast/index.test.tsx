import React from 'react'
import { render, screen } from '@testing-library/react'
import { WeatherContext } from "../../context/WeatherContext";
import Forecast from ".";

const renderComponent = (contextData) => (
    <WeatherContext.Provider value={contextData}>
        <Forecast />
    </WeatherContext.Provider>
)

describe('Forecast', () => {
    it('should renders the correct number of <ForecastCard/> component', () => {
        const contextData = {
            cityInfo: {
                list: ['a', 'b', 'c']
            }
        };

        render(renderComponent(contextData));

        expect(screen.getAllByTestId('forecast-card').length).toEqual(2);
    })
})
