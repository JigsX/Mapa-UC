import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const YourMapComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [markersVisible, setMarkersVisible] = useState(true);

  useEffect(() => {
    const handleZoomEnd = () => {
      setZoomLevel(mapRef.current.getZoom());
    };

    mapRef.current.on('zoomend', handleZoomEnd);

    return () => {
      mapRef.current.off('zoomend', handleZoomEnd);
    };
  }, []);

  const handleZoomChange = () => {
    if (zoomLevel < 10) {
      setMarkersVisible(false);
    } else {
      setMarkersVisible(true);
    }
  };

  const mapRef = useRef(null);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }} whenCreated={map => mapRef.current = map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersVisible && (
        // Your markers here
        <Marker position={[51.505, -0.09]}>
          {/* Marker content */}
        </Marker>
      )}
    </MapContainer>
  );
};

export default YourMapComponent;
