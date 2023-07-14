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
  const infoRef = useRef(null);
  const legendRef = useRef(null);

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

      // set color scale and style
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

      // Info Control in the corner
      let info = L.control();
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

      // Legend Control
      let legend = L.control({position: 'bottomleft'});
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'map-legend'),// create a div with a class "zoneBriefInfo"
        grades = [0, 10, 20, 50, 100, 200],
        labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorScale(grades[i] + 1).hex() + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };


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
      
      // add info and legend controls on map
      if (infoRef.current) {
        infoRef.current.remove();
        infoRef.current = null;
      }
      info.addTo(mapInstanceRef.current);
      infoRef.current = info;

      if (legendRef.current) {
        legendRef.current.remove();
        legendRef.current = null;
      }
      legend.addTo(mapInstanceRef.current);
      legendRef.current = legend;
      
    }
  }, [zones]);


  return <div ref={mapRef} className="map-module"></div>;
}

export default MapModule;