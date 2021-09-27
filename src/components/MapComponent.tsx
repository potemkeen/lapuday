import React from 'react'
import { Map, Placemark } from 'react-yandex-maps'

const MapComponent: React.FC<{ lat: number, lng: number }> = ({ lat, lng }) => (
    <Map
        defaultState={{ center: [lat, lng], zoom: 10 }}
        width="100%"
        height={250}
    >
        <Placemark geometry={[lat, lng]} />
    </Map>
)

export default MapComponent
