import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import http from "@/services/axios";

const GetMaps = ({ serviceSlug }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyInstitutions, setNearbyInstitutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const subscriptionKey =
        "Q4b2SuevAbuDSCvUxPaK3pjzWYVHzYmzFHq8P7BBBOiy3rg6rSI6JQQJ99AFACYeBjFvLcSEAAAgAZMPKFF8";

    const initializeMap = (center) => {
        const newMap = new atlas.Map(mapRef.current, {
            center: center,
            zoom: 12,
            authOptions: {
                authType: "subscriptionKey",
                subscriptionKey: subscriptionKey,
            },
        });
        setMap(newMap);
        return newMap;
    };

    const addUserMarker = (map, position) => {
        const marker = new atlas.HtmlMarker({
            position: position,
            htmlContent: '<div class="user-marker">Anda</div>',
        });
        map.markers.add(marker);
    };

    const addInstitutionMarkers = (map, institutions) => {
        institutions.forEach((institution) => {
            const marker = new atlas.HtmlMarker({
                position: [institution.longitude, institution.latitude],
                htmlContent: `<div class="institution-marker">${institution.description}</div>`,
            });
            map.markers.add(marker);

            const popup = new atlas.Popup({
                content: `<div><strong>${
                    institution.description
                }</strong><br>Jarak: ${institution.distance.toFixed(
                    2
                )} km</div>`,
                pixelOffset: [0, -30],
            });

            map.events.add("click", marker, () => {
                popup.open(map, marker);
            });
        });
    };

    const getUserLocation = () => {
        setIsLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                setIsLoading(false);

                const newMap = initializeMap([longitude, latitude]);
                addUserMarker(newMap, [longitude, latitude]);
                fetchNearbyInstitutions(latitude, longitude, newMap);
            },
            (error) => {
                console.error("Error getting user location:", error);
                setError(
                    "Tidak dapat mendapatkan lokasi Anda. Pastikan Anda telah mengizinkan akses lokasi."
                );
                setIsLoading(false);
            }
        );
    };

    const fetchNearbyInstitutions = async (latitude, longitude, map) => {
        try {
            const response = await http.get(
                `/services/polisi?latitude=${latitude}&longitude=${longitude}`
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = response.data;
            if (!data.data || !data.data.nearby_institutions) {
                throw new Error(
                    "Data institusi tidak ditemukan dalam response"
                );
            }
            setNearbyInstitutions(data.data.nearby_institutions);
            addInstitutionMarkers(map, data.data.nearby_institutions);
        } catch (error) {
            console.error("Error fetching nearby institutions:", error);
            setError(
                `Gagal mengambil data institusi terdekat: ${error.message}`
            );
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleRequestLocation = () => {
        getUserLocation();
    };

    return (
        <div className="w-full">
            <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
            <button
                onClick={handleRequestLocation}
                disabled={isLoading}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? "Memuat..." : "Perbarui Lokasi Saya"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Institusi Terdekat:</h3>
                <ul className="list-disc pl-5">
                    {nearbyInstitutions.map((institution) => (
                        <li key={institution.id} className="mt-2">
                            {institution.description} - Jarak:{" "}
                            {institution.distance.toFixed(2)} km
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GetMaps;
