import styles from "../../styles/Header.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
import { useWeather } from "../../context/WeatherContext";

// Components
import Alert from "../alert";

const Header = () => {
    const {
        searchInput,
        savedCities = [],
        onSubmit,
        onRemoveFromFavourite,
        onAddToFavourite,
        onInputChange,
        error,
        currentCityName
    } = useWeather();
    const isSavedCity = savedCities.includes(currentCityName);

    return(
        <div className={styles.Header}>
            <div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type={'text'}
                        value={searchInput}
                        onChange={(e) => onInputChange(e)}
                        placeholder={'Search City'}
                        className={styles.SearchInput}
                    />
                    <button type={'submit'} onSubmit={(e) => onSubmit(e)}>
                        <FontAwesomeIcon icon={faSearch} className={styles.Icon} />
                    </button>
                </form>
                <Alert error={error}/>
            </div>
            <div className={styles.FavouriteWrapper}>
                {
                    isSavedCity ?
                        <div
                            role={'button'}
                            onClick={() => onRemoveFromFavourite(currentCityName)}
                            className={styles.FavouriteIconWrapper}
                        >
                            <FontAwesomeIcon icon={faHeart} className={styles.FavouriteIcon}/>
                        </div> :
                        <div
                            role={'button'}
                            onClick={onAddToFavourite}
                            className={styles.FavouriteIconWrapper}
                        >
                            <FontAwesomeIcon icon={farHeart} className={styles.FavouriteIcon}/>
                        </div>
                }
                <p className={styles.FavouriteDesc}>
                    {isSavedCity ? 'Remove from Favourites' : 'Add to Favourites'}
                </p>
            </div>
        </div>
    )
};

export default Header;
