"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { translations } from '@/lib/translations';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';

type Event = typeof translations.en.timelineEvents[0];

// Leaflet's default icon paths can break in Next.js. This fixes it.
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});


type EventMapProps = {
  events: Event[];
};

const EventMap = ({ events }: EventMapProps) => {
    const { language } = useContext(LanguageContext);
    
    return (
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} className="rounded-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map((event, index) => (
                <Marker key={index} position={event.coords}>
                    <Tooltip permanent direction="top" offset={[0, -10]}>
                        {event.year}
                    </Tooltip>
                    <Popup>
                       <strong>{event.title}</strong> ({event.year})<br/>
                       {event.location}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default EventMap;
