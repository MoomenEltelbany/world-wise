import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";

import Button from "./Button";
import { useURLGeocoding } from "../hooks/useURLGeocoding";

function Map() {
    const [lat, lng] = useURLGeocoding();
    const [mapPosition, setMapPosition] = useState([
        lat ? parseFloat(lat) : 40.7128,
        lng ? parseFloat(lng) : -74.006,
    ]);
    const { cities } = useCities();

    const {
        isLoading: isLoadingGeoLocation,
        getPosition: getPositionGeoLocation,
        position: positionGeolocation,
    } = useGeolocation();

    useEffect(
        function () {
            if (lat === null || lng === null) return;
            setMapPosition([lat, lng]);
        },
        [lat, lng]
    );

    useEffect(
        function () {
            if (
                positionGeolocation &&
                typeof positionGeolocation.lat === "number" &&
                typeof positionGeolocation.lng === "number"
            )
                setMapPosition([
                    positionGeolocation.lat,
                    positionGeolocation.lng,
                ]);
        },
        [positionGeolocation]
    );

    return (
        <div className={styles.mapContainer}>
            {!positionGeolocation && (
                <Button type="position" onClick={getPositionGeoLocation}>
                    {isLoadingGeoLocation
                        ? "Loading..."
                        : "Use my current location"}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <ClickOnMap />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position, 6);
    return null;
}

function ClickOnMap() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
}

export default Map;
