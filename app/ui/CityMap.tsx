'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
});

export interface Location {
    id: string;
    position: [number, number]; // [lat, lng]
    label?: string;
}

interface CityMapProps {
    locations: Location[];
    zoom?: number;
}

export default function CityMap({ locations, zoom = 12 }: CityMapProps) {
    const center: [number, number] = [43.238949, 76.889709];

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution="© CARTO & © OpenStreetMap contributors"
                detectRetina={true}
            />
            {locations.map(({ id, position, label }) => (
                <Marker key={id} position={position}>
                    {label && <Popup>{label}</Popup>}
                </Marker>
            ))}
        </MapContainer>
    );
}
