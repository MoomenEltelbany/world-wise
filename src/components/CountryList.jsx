import styles from "./CountryList.module.css";

import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { CitiesProvider, useCities } from "../contexts/CitiesContext";

function CountryList() {
    const { isLoading, cities } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length)
        return "Add your first city by clicking on a city on the map";

    const seenCountries = new Set();

    const uniqueCountries = cities.filter((city) => {
        if (seenCountries.has(city.country)) return false;

        seenCountries.add(city.country);
        return true;
    });

    return (
        <ul className={styles.countryList}>
            {uniqueCountries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </ul>
    );
}

export default CountryList;
