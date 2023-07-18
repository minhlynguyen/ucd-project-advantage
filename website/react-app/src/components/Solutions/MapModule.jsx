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
import chroma from 'chroma-js';
import { Box, CircularProgress } from '@mui/material';

function MapModule({ zones, selectedZone, setSelectedZone, isLoading }) {
  // The map container div
  const mapRef = useRef(null);
  // Map instance
  const mapInstanceRef = useRef(null);
  // Info control for brief zone info in top-right
  const infoRef = useRef(null);
  // Legend control in bottom-left
  const legendRef = useRef(null);
  // Geojson layer for all zones
  const geoJsonRef = useRef(null);
  // Current zone layer
  const currentZoneRef = useRef(null);
  // Mapping from feature id to layer
  const layerMappingRef = useRef({});

  // Map tile layer initialisation
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7831, -73.9712], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      mapInstanceRef.current = map;
    }
  }, []);


  // When zones change, add new Geojson layer, info control, legend control and set listeners
  // Refer to https://leafletjs.com/examples/choropleth/
  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
      // Save a mapping from feature ID to layer
      layerMappingRef.current = {};
      //Remove the old geoJSON layer if it exists
      if (geoJsonRef.current) {
        mapInstanceRef.current.removeLayer(geoJsonRef.current);
      }
      var geojson;
      // Reset current zone
      currentZoneRef.current = null;

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
      // highlight when mouse in
      function highlightFeature(e) {
        var layer = e.target;
        if (!currentZoneRef.current || e.target.feature.id !== currentZoneRef.current.feature.id) {
          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });
          layer.bringToFront();
        }



        info.update(layer.feature.properties);
      }
      // reset style when mouse out
      function resetHighlight(e) {
        // If the layer is the current selected zone, do not reset its style
        if (!currentZoneRef.current || e.target.feature.id !== currentZoneRef.current.feature.id) {
          geojson.resetStyle(e.target);
        }
        info.update();
      }
      
      // click the zone
      function zoomToFeature(e) {

        // mapInstanceRef.current.fitBounds(e.target.getBounds());
        // Set current zone
        // setCurrentZone(e.target);
        console.log("user pick this zone in map:", e.target);
        setSelectedZone(e.target.feature);

      }
      // summary of listeners
      function onEachFeature(feature, layer) {
        // Save the layer to the mapping
        layerMappingRef.current[feature.id] = layer;
        layer.on({
            mouseover: highlightFeature,
            // mouseleave: resetHighlight,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
      }

      // add zones' geojson layer on map
      geojson = L.geoJson(zones, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(mapInstanceRef.current);
      // store the geoJSON layer in the ref
      geoJsonRef.current = geojson;
      // Fit the map view to the geoJSON layer
      mapInstanceRef.current.fitBounds(geojson.getBounds());

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

  //when selectedZone change, reset pre's style and set new one's style and get a zoom level in the map
  useEffect(() => {
    // return pre selected zone to normal
    if (currentZoneRef.current) {
      geoJsonRef.current.resetStyle(currentZoneRef.current); 
      infoRef.current.update();     
    }
    if (selectedZone) {
      const layer = layerMappingRef.current[selectedZone.id];
      currentZoneRef.current = layer;
      mapInstanceRef.current.fitBounds(layer.getBounds());
      layer.setStyle({
        color: '#32435f',
        fillOpacity: 0
      });
    } else {
      if (geoJsonRef.current) {
        mapInstanceRef.current.fitBounds(geoJsonRef.current.getBounds());
      }
      
      // mapInstanceRef.current.setView([40.7831, -73.9712], 12);
    }
  }, [selectedZone]);

  return <div ref={mapRef} className="map-module">

    {isLoading && 
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    }
  </div>;
}

export default MapModule;