import {
    createContext,
    useEffect,
    useContext,
    useState,
    FormEvent,
    ChangeEvent,
    ReactNode
} from 'react';

// Services
import {getCityWeatherByCoord, getCityWeatherByName} from "../services/WeatherApi";

// Utils
import {DEFAULT_CITY_COORD, getCurrentLocation, WEATHER_FAVOURITES_CITIES} from "../utils";

// Types
import {CityInfo, WeatherContextData, CityData} from "../types"

export const WeatherContext = createContext({} as WeatherContextData);

type WeatherProviderProps = {
    children: ReactNode;
};

export const WeatherProvider = ({children}: WeatherProviderProps) => {
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [cityInfo, setCityInfo] = useState({} as CityInfo);
    const [savedCities, setSavedCities] = useState<string[]>([]);
    const currentCityName = cityInfo?.name;

    useEffect(() => {
        try {
            getCurrentLocation(_handleSuccess, _handleError)
        } catch (error) {
            _handleError();
        }

        if (typeof window !== "undefined") {
            const savedCities = localStorage?.getItem(WEATHER_FAVOURITES_CITIES);
            return savedCities?.length && setSavedCities(JSON.parse(savedCities));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => setError(null), 3000);
    }, [error]);

    const normalizeData = ({city, list}: CityData) => {
        if(!city) {
            setError('Something went wrong. Please try again.');
        } else {
            setCityInfo(
                {
                    name: city.name,
                    list
                }
            )
        }
    }

    const _handleSuccess = async (data: GeolocationPosition) => {
        const newData = await getCityWeatherByCoord(
            {
                lat: data?.coords?.latitude,
                lon: data?.coords?.longitude
            }
        )
        return normalizeData(newData);
    }

    const _handleError = async () => {
        const newData = await getCityWeatherByCoord(DEFAULT_CITY_COORD);
        return normalizeData(newData);
    }

    const _handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event ? event.target.value : '');
        error && setError(null);
    }

    const _handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        _handleFetchData(null);
        setSearchInput('');
    }

    const _handleCityClick = (name: string) => {
        _handleFetchData(name);
    }

    const _handleFetchData = async (city: string) => {
        const newData = await getCityWeatherByName(city || searchInput);
        return normalizeData(newData);
    }

    const _handleSetFavourite = () => {
        const newState = [...savedCities, currentCityName];
        setSavedCities(newState);
        localStorage?.setItem(WEATHER_FAVOURITES_CITIES, JSON.stringify(newState));

    }

    const _handleRemoveFavourite = (name: string) => {
        const newState = savedCities.filter(city => {
            return city !== name
        })
        setSavedCities(newState);
        localStorage?.setItem(WEATHER_FAVOURITES_CITIES, JSON.stringify(newState));
    }

    const contextData = {
        searchInput,
        error,
        cityInfo,
        savedCities,
        onAddToFavourite: _handleSetFavourite,
        onRemoveFromFavourite: _handleRemoveFavourite,
        onSubmit: _handleSubmit,
        onInputChange: _handleInputChange,
        onCityClick: _handleCityClick,
        currentCityName
    };

    return (
        <WeatherContext.Provider value={contextData}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    return useContext(WeatherContext);
}
