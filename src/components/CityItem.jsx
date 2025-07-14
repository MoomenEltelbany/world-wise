import { Link } from "react-router-dom";

import { useCities } from "../contexts/CitiesContext";

import styles from "./CityItem.module.css";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, date, emoji, position } = city;

    const { currentCity, deleteCity } = useCities();

    const { lat, lng } = position;

    function handleDeleteCity(e) {
        e.preventDefault();
        deleteCity(city.id);
    }

    return (
        <li>
            <Link
                to={`${city.id}?lat=${lat}&lng=${lng}`}
                className={`${styles.cityItem} ${
                    currentCity.id === city.id ? styles["cityItem--active"] : ""
                }`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDeleteCity}>
                    x
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
