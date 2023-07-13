// import React from 'react';

// function MapModule() {
//   return (
//     <div className="map-module">
//         MapModule
//     </div>
//   );
// };

// export default MapModule;

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function MapModule({ zones }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const zonesRef = useRef({});
  const selectedZoneRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7831, -73.9712], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      mapInstanceRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
        zones.features.forEach(feature => {
          const polygon = L.geoJSON(feature, {
            color: '#FD8D3C',
            fillOpacity: 0.2
          }).addTo(mapInstanceRef.current);

          zonesRef.current[feature.id] = polygon;

          polygon.on('mouseover', function () {
            if (selectedZoneRef.current !== feature.id) {
              this.setStyle({
                fillOpacity: 0.9
              });
            }
          });

          polygon.on('mouseout', function () {
            if (selectedZoneRef.current !== feature.id) {
              this.setStyle({
                fillOpacity: 0.2
              });
            }
          });

          polygon.on('click', function () {
            console.log(`Zone clicked: ${feature.id}`);
            if (selectedZoneRef.current) {
              zonesRef.current[selectedZoneRef.current].setStyle({
                color: '#FD8D3C',
                fillOpacity: 0.2
              });
            }
            selectedZoneRef.current = feature.id;
            this.setStyle({
              color: '#007acc',
              fillOpacity: 0.9
            });
            const coordinates = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
            mapInstanceRef.current.fitBounds(coordinates);
          });
        });
    }

  }, [zones]);

  return <div ref={mapRef} className="map-module"></div>;
}

export default MapModule;