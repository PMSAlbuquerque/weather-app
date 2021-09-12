import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { WeatherContext } from "../../context/WeatherContext";
import SavedCities from ".";

const renderComponent = (contextData) => (
    <WeatherContext.Provider value={contextData}>
        <SavedCities />
    </WeatherContext.Provider>
)

describe('SavedCities', () => {
    it('should renders the correct number of saved cities', () => {
        const contextData = {
            savedCities: ['a', 'b', 'c']
        };

        render(renderComponent(contextData));

        expect(screen.getAllByTestId('saved-city').length).toEqual(3);
    })

    it('should fire favourite city click', () => {
        const mockCallBack = jest.fn();

        const contextData = {
            savedCities: ['a', 'b', 'c'],
            onCityClick: mockCallBack
        };

        render(renderComponent(contextData));

        fireEvent.click(screen.getAllByTestId('submit-saved-city')[0]);
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    })

    it('should fire remove favourite city click', () => {
        const mockCallBack = jest.fn();

        const contextData = {
            savedCities: ['a', 'b'],
            onRemoveFromFavourite: mockCallBack
        };

        render(renderComponent(contextData));

        fireEvent.click(screen.getAllByTestId('remove-saved-city')[1]);
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    })
})
