import Head from 'next/head'

// Components
import CurrentWeather from "../components/currentWeather";
import SavedCities from "../components/savedCities";
import Forecast from "../components/forecast";
import Header from "../components/header";

// Styles
import styles from '../styles/Home.module.css'

const Home = () => {
    return (
        <>
            <Head>
                <title>Weather App</title>
            </Head>
            <div className={styles.Container}>
                <div className={styles.CurrentWeather}>
                    <Header />
                    <CurrentWeather />
                </div>
                <div className={styles.ForecastWrapper}>
                    <Forecast />
                    <SavedCities />
                </div>
            </div>
        </>
    )
};

export default Home;
