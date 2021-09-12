import axios, { AxiosResponse } from "axios";

// Utils
import { DEFAULT_FORECAST_DAYS, OPEN_WEATHER_API_BASE_URL } from "../utils";

// Types
import {Coords, CityData} from "../types"

const openWeatherApi = axios.create({
    baseURL: OPEN_WEATHER_API_BASE_URL
});

export const getCityWeatherByCoord = async ({lat, lon}: Coords) => {
    try {
        const {data} = await openWeatherApi.get<CityData>(
            `/forecast/climate?lat=${lat}&lon=${lon}&units=metric&cnt=${DEFAULT_FORECAST_DAYS}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
        );
        return data;
    } catch (error) {
        return error;
    }
}

export const getCityWeatherByName = async (name: string) => {
    try {
        const {data}: AxiosResponse = await openWeatherApi.get<CityData>(
            `/forecast/climate?q=${name}&units=metric&cnt=${DEFAULT_FORECAST_DAYS}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
        );
        return data;
    } catch (error) {
        return error;
    }
}
