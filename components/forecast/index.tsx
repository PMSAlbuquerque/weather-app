import { useWeather } from "../../context/WeatherContext";

// Components
import ForecastCard from "./forecastCard"

// Styles
import styles from '../../styles/Forecast.module.css'

const Forecast = () => {
    const {cityInfo} = useWeather();

    const {list = []} = cityInfo;

    if(!list.length) return null;

    const forecastList = list.slice(1, list.length);

    return(
        <div className={styles.Container}>
            <h3>
                Forecast
            </h3>
            <ul className={styles.ForecastCardsWrapper}>
                {
                    forecastList.map((entry, index) => {
                        return (
                                <ForecastCard entry={entry} key={index}/>
                        )
                    })
                }
            </ul>

        </div>
    )
};

export default Forecast;
