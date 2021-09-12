import { useWeather } from "../../context/WeatherContext";

// Styles
import styles from "../../styles/SavedCities.module.css";

const SavedCities = () => {
    const {savedCities = [], onCityClick, onRemoveFromFavourite} = useWeather();

    return(
        <div className={styles.Container}>
            <h3>
                Favourite Cities
            </h3>
            <ul>
                {
                    savedCities.map((city, index) => {
                        if(!city) return null;

                        return(
                            <li key={index} className={styles.CityWrapper} data-testid="saved-city">
                                <div
                                    data-testid="submit-saved-city"
                                    role={'button'}
                                    onClick={() => onCityClick(city)}
                                    className={styles.Name}
                                >
                                    {city}
                                </div>
                                <span
                                    data-testid="remove-saved-city"
                                    role={'button'}
                                    onClick={() => onRemoveFromFavourite(city)}
                                    className={styles.Cross}
                                >
                            X
                            </span>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}

export default SavedCities;
