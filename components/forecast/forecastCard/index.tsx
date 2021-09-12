import Image from "next/image";

// Styles
import styles from "../../../styles/ForecastCard.module.css";

// Types
import {ForecastInfo} from "../../../types"

const ForecastCard = ({entry}: {entry: ForecastInfo}) => {

    const {dt, temp, weather = []} = entry;

    const normalizedDate = new Date(dt * 1000)
        .toLocaleDateString(
            "en-GB",
            {
                weekday: "long"
            }
        )
        .slice(0,3);
    const normalizeDateNum = new Date(dt * 1000)
        .toLocaleDateString(
            "en-GB",
            {
                month: "numeric",
                day: "numeric"
            }
        );
    const currentTemp = Math.round(temp?.day)
    const imageCode = weather.length && weather[0].icon

    return(
        <li className={styles.Container} data-testid="forecast-card">
            {
                normalizedDate &&
                <div className={styles.Date}>
                    {`${normalizedDate} ${normalizeDateNum}`}
                </div>}
            {
                currentTemp && <div>{currentTemp}ºC</div>
            }
            <Image
                src={`http://openweathermap.org/img/wn/${imageCode}@2x.png`}
                width={50}
                height={50}
                alt={'Weather condition'}
            />
        </li>
    )
}

export default ForecastCard;
