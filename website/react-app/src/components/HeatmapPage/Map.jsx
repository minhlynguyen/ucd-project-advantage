import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './Map.css';

function Map({zones, setZones, selectedZone, setSelectedZone}) {

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const selectedZoneRef = useRef(selectedZone);
  const initialBoundsRef = useRef(null);
  const preSelectedZoneRef = useRef(null);

  useEffect(() => {
    preSelectedZoneRef.current = selectedZoneRef;
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get("./NYC Taxi Zones.geojson");
      const response = await axios.get(" http://127.0.0.1:8000/api/zones/");
      setZones(response.data);
      console.log("response data:", response.data);
    }
    fetchData();
  }, []);

  // Effect for map initialization
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7831, -73.9712], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
      initialBoundsRef.current = map.getBounds();
    }
  }, []);

  // Effect for drawing zones when zones data is available
  useEffect(() => {
    if (zones && mapInstanceRef.current) {
      zones.features.forEach(feature => {
        const polygon = L.geoJSON(feature, { 
          color: '#FD8D3C', 
          fillOpacity: 0.2 
        }).addTo(mapInstanceRef.current);
        
        // Set events
        polygon.on('mouseover', function () {
          this.setStyle({
            fillOpacity: 0.9
          });
        });

        polygon.on('mouseout', function () {
          if (selectedZoneRef.current === feature.properties.location_id) {

          } else {
            this.setStyle({
              fillOpacity: 0.2
            });
          }

        });

        polygon.on('click', () => {
          if (selectedZoneRef.current === feature.properties.location_id) {
            console.log("zone clicked twice");
            setSelectedZone(null);
            polygon.setStyle({
              color: '#FD8D3C',
              fillOpacity: 0.2
            });
            mapInstanceRef.current.fitBounds(initialBoundsRef.current);
          } else {
            setSelectedZone(feature.properties.location_id);
            polygon.setStyle({
              color: '#007acc',
              fillOpacity: 0.9
            });
            // need to turn previous selected zone back to normal here...
            // turn previous selected zone back to normal (maybe it's faster if I use zone not zone id?)
            // preZone = zones.features.find(zone => zone.properties.location_id === preSelectedZoneRef);
            // polygon.setStyle({
            //   color: '#FD8D3C',
            //   fillOpacity: 0.2
            // });
            // Fit the map to the selected zone
            const coordinates = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
            mapInstanceRef.current.fitBounds(coordinates);

          }
        });
      });
    }
  }, [zones]);


  return <div id="map" ref={mapRef} className={selectedZone ? 'map-selected' : 'map-unselected'}></div>
}

export default Map;
