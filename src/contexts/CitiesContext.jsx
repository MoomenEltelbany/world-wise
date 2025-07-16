import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                setCities(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCurrentCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function addNewCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setCities((cities) => [...cities, data]);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCurrentCity,
                addNewCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
