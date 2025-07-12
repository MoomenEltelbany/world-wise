import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";

function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { cities } = useCities;
    console.log(cities);

    const lat = searchParams.get("lat") || 40;
    const lng = searchParams.get("lng") || 0;

    const position = [lat, lng];

    const navigate = useNavigate();

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <MapContainer
                center={position}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
