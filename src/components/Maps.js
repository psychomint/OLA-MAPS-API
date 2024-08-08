import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet'; // Leaflet for mapping
import polyline from '@mapbox/polyline'; // Import polyline decoding library
import GetRoute from './GetRoute'; // Import your GetRoute function

// Utility function to decode polyline
const decodePolyline = (encoded) => {
  try {
    // Decode the polyline encoded string
    const decoded = polyline.decode(encoded);

    // Convert the decoded array into a format suitable for Leaflet
    return decoded.map(coord => [coord[0], coord[1]]);
  } catch (error) {
    console.error('Error decoding polyline:', error);
    return [];
  }
};

const Map = ({ startpoint, endpoint }) => {
  const [route, setRoute] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const data = await GetRoute(startpoint, endpoint);

        if (data && data.status === 'OK' && data.routes.length > 0) {
          const routeData = data.routes[0];
          setRoute(routeData);

          if (map) {
            const polyline = decodePolyline(routeData.overview_polyline);
            L.polyline(polyline, { color: 'blue' }).addTo(map);
            map.fitBounds(L.latLngBounds(polyline));
          }
        } else {
          console.error('API returned an error or no routes');
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };

    fetchRoute();
  }, [map, startpoint, endpoint]);

  return (
    <MapContainer
      whenCreated={setMap}
      style={{ height: '100vh', width: '100%' }}
      center={startpoint || [12.909342, 77.621689]} // Default center or use startpoint if available
      zoom={13}
    >
      <TileLayer
        url="https://api.olamaps.io/tiles/vector/v1/data/planet/{z}/{x}/{y}.pbf?api_key=JyNFwYmODoDUaDywhSgbE0RU7SXRKV6ObU8R3Gy9"
        attribution="© OLA Maps"
      />
      {route && route.legs && route.legs[0] && (
        <>
          <Marker position={[route.legs[0].start_location.lat, route.legs[0].start_location.lng]} />
          <Marker position={[route.legs[0].end_location.lat, route.legs[0].end_location.lng]} />
          <Polyline
            positions={decodePolyline(route.overview_polyline)}
            color="blue"
          />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
