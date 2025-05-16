"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function Map({ coords }) {
  const defaultCenter = [27.7172, 85.324]; // Kathmandu default

  const pickupMarker = coords.pickup ? (
    <Marker position={coords.pickup}>
      <Popup>Pick-up Location</Popup>
    </Marker>
  ) : null;

  const destinationMarker = coords.destination ? (
    <Marker position={coords.destination}>
      <Popup>Destination</Popup>
    </Marker>
  ) : null;

  return (
    <MapContainer
      center={coords.pickup || coords.destination || defaultCenter}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full rounded-md z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickupMarker}
      {destinationMarker}
    </MapContainer>
  );
}
