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
import chroma from 'chroma-js';

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


  // Refer to https://leafletjs.com/examples/choropleth/
  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
      var geojson;
      // set color scale
      const maxPk = zones.features.reduce((max, feature) => {
        return feature.properties.pk > max ? feature.properties.pk : max;
      }, zones.features[0].properties.pk);
      const minPk = zones.features.reduce((min, feature) => {
        return feature.properties.pk < min ? feature.properties.pk : min;
      }, zones.features[0].properties.pk);
      const colorScale = chroma.scale(['yellow', '008ae5']).domain([minPk, maxPk]);
      function style(feature) {
        return {
            fillColor: colorScale(feature.properties.pk).hex(),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
      }
      // Listeners
      // high light
      function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        layer.bringToFront();
        info.update(layer.feature.properties);
      }
      // reset style
      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }
      // zoom
      function zoomToFeature(e) {
        mapInstanceRef.current.fitBounds(e.target.getBounds());
      }
      // summary of listeners
      function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
      }
      // add zones layers on map
      geojson = L.geoJson(zones, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(mapInstanceRef.current);  
      
      // Info Control in the corner
      var info = L.control();

      info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'zoneBriefInfo'); // create a div with a class "zoneBriefInfo"
          this.update();
          return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
          this._div.innerHTML = '<h4>New York Busyness</h4>' +  (props ?
              '<b>' + props.name + '</b><br />' + props.pk + ' impression'
              : 'Hover over a zone');
      };

      info.addTo(mapInstanceRef.current);
      
      // Legend Control

    }
  }, [zones]);

  // useEffect(() => {
  //   if (Object.keys(zones).length !== 0) {
  //       zones.features.forEach(feature => {
  //         const polygon = L.geoJSON(feature, {
  //           color: '#FD8D3C',
  //           fillOpacity: 0.2
  //         }).addTo(mapInstanceRef.current);

  //         zonesRef.current[feature.id] = polygon;

  //         polygon.on('mouseover', function () {
  //           if (selectedZoneRef.current !== feature.id) {
  //             this.setStyle({
  //               fillOpacity: 0.9
  //             });
  //           }
  //         });

  //         polygon.on('mouseout', function () {
  //           if (selectedZoneRef.current !== feature.id) {
  //             this.setStyle({
  //               fillOpacity: 0.2
  //             });
  //           }
  //         });

  //         polygon.on('click', function () {
  //           console.log(`Zone clicked: ${feature.id}`);
  //           if (selectedZoneRef.current) {
  //             zonesRef.current[selectedZoneRef.current].setStyle({
  //               color: '#FD8D3C',
  //               fillOpacity: 0.2
  //             });
  //           }
  //           selectedZoneRef.current = feature.id;
  //           this.setStyle({
  //             color: '#007acc',
  //             fillOpacity: 0.9
  //           });
  //           const coordinates = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
  //           mapInstanceRef.current.fitBounds(coordinates);
  //         });
  //       });
  //   }

  // }, [zones]);

  return <div ref={mapRef} className="map-module"></div>;
}

export default MapModule;