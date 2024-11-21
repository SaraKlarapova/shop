import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from './index.module.scss';
import { H1SemiboldFs38 } from "components/typography";

// Задаем параметры карты
const mapContainerStyle = {
    width: "100%",
    height: "450px",
};

const center = {
    lat: 56.097534, // Широта
    lng: 47.290266, // Долгота
};

export const MapWithMarker = () => {
    // Загрузчик карты
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDXLWhp9gWZN6YVy84NF8jFzBUC5VasWcw",
    });

    if (loadError) return <div>Ошибка загрузки карты</div>;
    if (!isLoaded) return <div>Загрузка карты...</div>;

    return (
        <div className={styles.wrapper}>
            <H1SemiboldFs38>Расположение на карте</H1SemiboldFs38>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15} // Увеличение
                center={center} // Центр карты
            >
                <Marker position={center} /> 
            </GoogleMap>
        </div>
    );
};
