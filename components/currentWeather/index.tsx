import Image from "next/image";
import { useWeather } from "../../context/WeatherContext";

// Styles
import styles from '../../styles/CurrentWeather.module.css'

const CurrentWeather = () => {
    const {cityInfo} = useWeather();

    const {name, list = []}  = cityInfo;

    if(!list.length || !name) return null;

    const [currentWeatherInfo] = list;
    const {temp, feels_like, weather = []} = currentWeatherInfo;

    const currentTemp = Math.round(temp.day);
    const currentFeelsLikeTemp = Math.round(feels_like.day);
    const description = weather.length && weather[0].description;
    const normalizedDesc = description &&
        description.charAt(0).toUpperCase() + description.slice(1);
    const imageCode = weather.length && weather[0].icon;

    return(
        <div className={styles.Container}>
            { <h2 className={styles.Name}>{name}</h2> }
            {
                normalizedDesc &&
                <div className={styles.Description}>
                    {normalizedDesc}
                </div>
            }
            {
                currentTemp &&
                <div className={styles.Temp}>
                    {currentTemp}ºC
                </div>
            }
            {
                currentFeelsLikeTemp &&
                <div> Real feel {currentFeelsLikeTemp}ºC</div>
            }
            <Image
                src={`http://openweathermap.org/img/wn/${imageCode}@2x.png`}
                width={300}
                height={300}
                alt={'Weather condition'}
            />
        </div>
    )
};

export default CurrentWeather;
