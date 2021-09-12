import {ChangeEvent, FormEvent} from "react";

export type Coords = {
    lat: number,
    lon: number
}

export type CityData = {
    city?: {
        name: string
    };
    list: ForecastInfo[]
}

export type CityInfo = {
    name: string;
    list: ForecastInfo[]
}

export type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export type ForecastInfo = {
    dt: number,
    feels_like: {
        day: number
    };
    temp: {
        day: number
    };
    weather: Weather[]
}

export type WeatherContextData = {
    searchInput: string,
    error: string,
    cityInfo: CityInfo,
    savedCities: string[],
    onAddToFavourite: () => void,
    onRemoveFromFavourite: (name: string) => void,
    onSubmit: (event: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => void,
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onCityClick: (name: string) => void,
    currentCityName: string
}
