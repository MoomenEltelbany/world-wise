import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };

        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };

        case "rejected":
            return { ...state, error: action.payload };

        default:
            throw new Error("Unknown action was taken");
    }
}

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();

                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                console.log(error.message);
                dispatch({
                    type: "rejected",
                    payload: "There was an error in fetching the cities",
                });
            }
        }

        fetchCities();
    }, []);

    async function getCurrentCity(id) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();

            dispatch({ type: "city/loaded", payload: data });
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: "rejected",
                payload: "There was an error in fetching the current city",
            });
        }
    }

    async function addNewCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            dispatch({ type: "city/created", payload: data });
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: "rejected",
                payload: "There was an error in creating the city",
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });

            dispatch({ type: "city/deleted", payload: id });
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: "rejected",
                payload: "There was an error in deleting the city",
            });
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
