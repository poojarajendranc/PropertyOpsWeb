import L from "leaflet"
import { MapContainer, Marker, TileLayer, useMap, useMapEvents, } from "react-leaflet";
import { MapPin, Search, X } from "lucide-react";
import type { LocationValue } from "./types";
import styles from "./styles/CustomLocation.module.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

interface CustomLocationProps {
    value?: LocationValue | null;
    onChange: (location: LocationValue) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

const DEFAULT_LOCATION: [number, number] = [
    20.5937,
    78.9629,
];

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapSelectorProps {
    location: LocationValue | null;
    onLocationChange: (
        latitude: number,
        longitude: number,
    ) => void;
}

function MapSelector({ location, onLocationChange }: MapSelectorProps) {
    useMapEvents({
        click(event) {
            onLocationChange(event.latlng.lat, event.latlng.lng);
        },
    });

    if (!location) {
        return null;
    }

    return (
        <Marker
            position={[location.latitude,
            location.longitude,]}
            icon={markerIcon} />
    );
}

interface MapCenterProps {
    latitude: number;
    longitude: number;
}

function MapCenter({
    latitude,
    longitude,
}: MapCenterProps) {
    const map = useMap();
    map.setView(
        [latitude, longitude],
        15,
        { animate: true },
    );
    return null;
}

function CustomLocation({ value = null, onChange, placeholder = "Select location", error, disabled = false, }: CustomLocationProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedLocation, setSelectedLocation] =
        useState<LocationValue | null>(value);

    const searchLocation = async () => {
        const query = searchText.trim();
        if (!query) {
            return;
        }
        try {
            setIsSearching(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                },
            );
            if (!response.ok) {
                throw new Error(
                    "Unable to search location",
                );
            }

            const data = (await response.json()) as SearchResult[];
            setSearchResults(data);
        } catch (error) {
            console.error(
                "Location search failed:",
                error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const selectSearchResult = (result: SearchResult,) => {
        const location: LocationValue = {
            address: result.display_name, latitude: Number(result.lat), longitude: Number(result.lon),
        };

        setSelectedLocation(location);
        setSearchResults([]);
        setSearchText("");
    };

    const handleMapLocationChange = async (latitude: number, longitude: number) => {
        const location: LocationValue = {
            address: "Selected location",
            latitude,
            longitude,
        };

        setSelectedLocation(location);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, {
                headers: {
                    Accept: "application/json",
                },
            },
            );

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setSelectedLocation({
                address: data.display_name ?? "Selected location",
                latitude,
                longitude
            });

        } catch (error) {
            console.error("Reverse geocoding failed:", error);
        }
    };

    const handleSelect = () => {
        if (!selectedLocation) {
            return;
        }
        onChange(selectedLocation);
        setIsOpen(false);
    };

    const mapCenter: [number, number] = selectedLocation ? [selectedLocation.latitude,
    selectedLocation.longitude,] : DEFAULT_LOCATION;

    return (
        <div 
       >
            <button
                type="button"
                disabled={disabled}
                className={`${styles.locationField} ${error ? styles.errorField : ""}`}
                onClick={() => setIsOpen(true)}
            >
                <MapPin size={18} />
                {/* <span
                    className={
                        value ? styles.value : styles.placeholder}>
                    {value?.address || placeholder}
                </span> */}
            </button>

            {error && (
                <span className={styles.error}>
                    {error}
                </span>

            )}

            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <div>
                                <h3>Select Location</h3>
                                <p>
                                    Search for a location or

                                    select a point on the map.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={
                                    styles.closeButton
                                }
                                onClick={() =>
                                    setIsOpen(false)
                                }>
                                <X size={20} />
                            </button>
                        </div>
                        <div
                            className={
                                styles.searchSection
                            }>
                            <div
                                className={
                                    styles.searchBox
                                } >
                                <Search size={18} />
                                <input
                                    type="text"
                                    value={searchText}
                                    placeholder="Search location..."
                                    onChange={(event) =>
                                        setSearchText(
                                            event.target
                                                .value)
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            searchLocation();
                                        }
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={searchLocation}
                                    disabled={isSearching || !searchText.trim()}>
                                    {isSearching ? "Searching..." : "Search"}
                                </button>
                            </div>

                            {searchResults.length > 0 && (<div
                                className={styles.results}>
                                {searchResults.map((result, index,) => (<button
                                    type="button"
                                    key={`${result.lat}-${result.lon}-${index}`}
                                    className={styles.result}
                                    onClick={() =>
                                        selectSearchResult(result)}>
                                    <MapPin
                                        size={16}
                                    />

                                    <span>
                                        {result.display_name}
                                    </span>
                                </button>),
                                )}
                            </div>)}
                        </div>
                        <div
                            className={styles.mapContainer}>
                            <MapContainer
                                center={mapCenter}
                                zoom={selectedLocation ? 15 : 5}
                                scrollWheelZoom
                                className={styles.map}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <MapSelector
                                    location={selectedLocation}
                                    onLocationChange={handleMapLocationChange}
                                />

                                {selectedLocation && (
                                    <MapCenter
                                        latitude={selectedLocation.latitude}
                                        longitude={selectedLocation.longitude} />
                                )}
                            </MapContainer>
                        </div>

                        {selectedLocation && (
                            <div
                                className={styles.selectedLocation}>
                                <MapPin size={18} />
                                <div>
                                    <span>
                                        Selected location
                                    </span>
                                    <strong>
                                        {selectedLocation.address}
                                    </strong>
                                </div>
                            </div>

                        )}

                        <div className={styles.footer}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.selectButton}
                                disabled={!selectedLocation}
                                onClick={handleSelect}>
                                Select Location
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>

    );

}

export default CustomLocation;
