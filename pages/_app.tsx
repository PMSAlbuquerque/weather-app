import { AppProps } from 'next/app'
import '../styles/globals.css'
import { WeatherProvider } from "../context/WeatherContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WeatherProvider>
        <Component {...pageProps} />
      </WeatherProvider>
  )
};

export default MyApp
