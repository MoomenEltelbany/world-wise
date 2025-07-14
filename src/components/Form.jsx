// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import { useURLGeocoding } from "../hooks/useURLGeocoding";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [geocodeError, setGeocodeError] = useState("");
    const [emoji, setEmoji] = useState("");
    const navigate = useNavigate();

    const [lat, lng] = useURLGeocoding();
    const { addNewCity, isLoading } = useCities();

    useEffect(
        function () {
            if (!lat || !lng) return;

            async function fetchCityData() {
                try {
                    setIsLoadingGeocoding(true);
                    setGeocodeError("");

                    const res = await fetch(
                        `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                    );
                    const data = await res.json();

                    if (!data.city || !data.locality)
                        throw new Error(
                            "That doesn't seem to be a city. Click somewhere else 🤗"
                        );

                    setCityName(data.city);
                    setCountry(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                } catch (error) {
                    setGeocodeError(error.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCityData();
        },
        [lat, lng]
    );

    async function handleAddNewCity(e) {
        e.preventDefault();

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat,
                lng,
            },
        };

        await addNewCity(newCity);
        navigate("/app/cities");
    }

    if (isLoadingGeocoding) return <Spinner />;

    if (!lat || !lng)
        return (
            <Message message="No city was selected. Please, start by clicking on a city." />
        );

    if (geocodeError) return <Message message={geocodeError} />;

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary" onClick={handleAddNewCity}>
                    Add
                </Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
