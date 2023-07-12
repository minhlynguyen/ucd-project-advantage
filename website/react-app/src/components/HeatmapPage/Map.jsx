import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './Map.css';

// function Map({zones, setZones, selectedZone, setSelectedZone}) {

//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const selectedZoneRef = useRef(selectedZone);
//   const initialBoundsRef = useRef(null);
//   const preSelectedZoneRef = useRef(null);

//   useEffect(() => {
//     preSelectedZoneRef.current = selectedZoneRef;
//     selectedZoneRef.current = selectedZone;
//   }, [selectedZone]);

//   // Get zones data for map initialising
//   useEffect(() => {
//     const fetchData = async () => {
//       // const response = await axios.get("./NYC Taxi Zones.geojson");
//       const response = await axios.get(" http://127.0.0.1:8000/api/zones/");
//       setZones(response.data);
//       console.log("response data:", response.data);
//     }
//     fetchData();
//   }, []);

//   // Effect for map initialization
//   useEffect(() => {
//     if (mapRef.current && !mapInstanceRef.current) {
//       const map = L.map(mapRef.current).setView([40.7831, -73.9712], 12);
//       // Use the map tile from OpenStreet
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(map);
      
//       mapInstanceRef.current = map;
//       // Store inital map bounds for map zoom reset
//       initialBoundsRef.current = map.getBounds();
//     }
//   }, []);

//   // Effect for drawing zones when zones data is available
//   useEffect(() => {
//     if (zones && mapInstanceRef.current) {
//       zones.features.forEach(feature => {
//         const polygon = L.geoJSON(feature, { 
//           color: '#FD8D3C', 
//           fillOpacity: 0.2 
//         }).addTo(mapInstanceRef.current);
        
//         // Set events
//         polygon.on('mouseover', function () {
//           if (selectedZoneRef.current != feature.id) {
//             this.setStyle({
//               fillOpacity: 0.9
//             });
//           }
//         });

//         polygon.on('mouseout', function () {
//           if (selectedZoneRef.current != feature.id) {
//             this.setStyle({
//               fillOpacity: 0.2
//             });
//           } 
//         });

//         polygon.on('click', () => {
//           if (selectedZoneRef.current === feature.id) {
//             console.log("zone clicked twice");
//             setSelectedZone(null);
//             polygon.setStyle({
//               color: '#FD8D3C',
//               fillOpacity: 0.2
//             });
//             mapInstanceRef.current.fitBounds(initialBoundsRef.current);
//           } else {
//             setSelectedZone(feature.id);
//             polygon.setStyle({
//               color: '#007acc',
//               fillOpacity: 0.9
//             });
//             // need to turn previous selected zone back to normal here...
//             // turn previous selected zone back to normal (maybe it's faster if I use zone not zone id?)
//             // preZone = zones.features.find(zone => zone.properties.location_id === preSelectedZoneRef);
//             // polygon.setStyle({
//             //   color: '#FD8D3C',
//             //   fillOpacity: 0.2
//             // });
//             // Fit the map to the selected zone
//             const coordinates = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
//             mapInstanceRef.current.fitBounds(coordinates);

//           }
//         });
//       });
//     }
//   }, [zones]);

//   // Effect for change the behavior of selected zone
//   useEffect(() => {

//   }, [selectedZoneRef]);


//   return <div id="map" ref={mapRef} className={selectedZone ? 'map-selected' : 'map-unselected'}></div>
// }
function Map({zones, setZones, selectedZone, setSelectedZone}) {

  console.log('Rendering Map')

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const selectedZoneRef = useRef(selectedZone);
  const preSelectedZoneRef = useRef(null);
  const initialBoundsRef = useRef(null);
  const zonesRef = useRef({});  // NEW: ref to store all zones


  useEffect(() => {
    preSelectedZoneRef.current = selectedZoneRef.current;
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://127.0.0.1:8000/api/zones/");
  //     setZones(response.data);
  //     console.log("response data:", response.data);
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log('Map component mounted');
  //   const fetchData = async () => {
  //     console.log('Before fetching data');
  //     const response = await axios.get("http://127.0.0.1:8000/api/zones/");
  //     console.log('After fetching data, before setting zones');
  //     setZones(response.data);
  //     console.log('After setting zones');
  //   }
  //   fetchData();
  // }, []);
  

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7831, -73.9712], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      mapInstanceRef.current = map;
      initialBoundsRef.current = map.getBounds();
    }
  }, []);

  useEffect(() => {
    if (zones && mapInstanceRef.current) {
      zones.features.forEach(feature => {
        const polygon = L.geoJSON(feature, {
          color: '#FD8D3C',
          fillOpacity: 0.2
        }).addTo(mapInstanceRef.current);
        
        zonesRef.current[feature.id] = polygon;  // Store the zone polygon to the ref

        polygon.on('mouseover', function () {
          if (selectedZoneRef.current != feature.id) {
            this.setStyle({
              fillOpacity: 0.9
            });
          }
        });

        polygon.on('mouseout', function () {
          if (selectedZoneRef.current != feature.id) {
            this.setStyle({
              fillOpacity: 0.2
            });
          } 
        });

        polygon.on('click', () => {
          // If there is a pre-selected zone, reset its style
          if (preSelectedZoneRef.current) {
            zonesRef.current[preSelectedZoneRef.current].setStyle({
              color: '#FD8D3C',
              fillOpacity: 0.2
            });
          }

          if (selectedZoneRef.current === feature.id) {
            console.log("zone clicked twice");
            setSelectedZone(null);
            polygon.setStyle({
              color: '#FD8D3C',
              fillOpacity: 0.2
            });
            mapInstanceRef.current.fitBounds(initialBoundsRef.current);
            preSelectedZoneRef.current = null;
          } else {
            setSelectedZone(feature.id);
            polygon.setStyle({
              color: '#007acc',
              fillOpacity: 0.9
            });
            preSelectedZoneRef.current = feature.id;
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
