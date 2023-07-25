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
import 'mapillary-js/dist/mapillary.css';
import { Viewer } from 'mapillary-js';
import axios from 'axios';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder';
import './MapModule.css';





function MapModule({ zones, selectedZone, setSelectedZone, isLoading }) {
  // The map container div
  const mapRef = useRef(null);
  // Map instance
  const mapInstanceRef = useRef(null);
  // Info control for brief zone info in bottom-right
  const infoRef = useRef(null);
  // Legend control in bottom-left
  const legendRef = useRef(null);
  // Search control in top-right
  const geocoderRef = useRef(null);
  // Geojson layer for all zones
  const geoJsonRef = useRef(null);
  // Current zone layer
  const currentZoneRef = useRef(null);
  // Mapping from feature id to layer
  const layerMappingRef = useRef({});
  // Mapillary viewer instance
  const viewerRef = useRef(null);



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
      console.log("zones:", zones);
      console.log("zones.features:", zones.features);
      const maxPk = zones.features.reduce((max, feature) => {
        return feature.properties.pk > max ? feature.properties.pk : max;
      }, zones.features[0].properties.pk);
      const minPk = zones.features.reduce((min, feature) => {
        return feature.properties.pk < min ? feature.properties.pk : min;
      }, zones.features[0].properties.pk);
      const colorScale = chroma.scale(['yellow', '008ae5']).domain([minPk, maxPk]);
      function style(feature) {
        return {
            // fillColor: colorScale(feature.properties.pk).hex(),
            fillColor: colorScale(feature.properties.current_impression).hex(),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
      }

      // Info Control in the corner
      let info = L.control({position: 'bottomright'});
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

      // Search Control
      // Add geocoder control
      let geocoder = new L.Control.Geocoder({
        collapsed: false,
        position: 'topright',
        text: 'Search',
        expand: 'click',
      });

      // geocoder.markGeocode = function(result) {
      //   console.log("result.bbox: ",result.bbox);
      //   mapInstanceRef.current.fitBounds(result.bbox);
        
      //   var marker = L.marker(result.center).addTo(map);
      //   marker.bindPopup(result.name || result.html || result.label);
      //   marker.openPopup();
      // };
      geocoder.markGeocode = function(result) {
        mapInstanceRef.current.fitBounds(result.geocode.bbox);
        var marker = L.marker(result.geocode.center).addTo(mapInstanceRef.current);
        marker.bindPopup(result.geocode.name || result.geocode.html || result.geocode.label);
        marker.openPopup();
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
        // // 当用户点击一个区域时，显示该区域中心的街景图像
        // if (viewerRef.current) {
        //   const center = e.target.getBounds().getCenter();
        //   viewerRef.current.moveCloseTo(center.lat, center.lng);
        // }

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

      if (geocoderRef.current) {
        geocoderRef.current.remove();
        geocoderRef.current = null;
      }
      geocoder.addTo(mapInstanceRef.current);
      geocoderRef.current = geocoder;
      
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

  // Initialize Mapillary viewer when the map is ready
  // useEffect(() => {
  //   if (mapInstanceRef.current && !viewerRef.current) {
  //     viewerRef.current = new Viewer({
  //       container: 'mapillary',
  //       imageId: '3056168174613811',  // 你可以选择一个默认的街景图像的ID
  //       accessToken: 'MLY|6295611443867695|a2b7c756ca3b62c2dc4ddbda87ee3f7d',  // 替换成你的Mapillary Client ID
  //     });
  //   }
  // }, []);

  // // Initialize Mapillary viewer when the map is ready
  // useEffect(() => {
  //   if (mapInstanceRef.current && !viewerRef.current) {
  //     // Use Mapillary API to find the nearest image to the specified coordinates
  //     const client_id = 'MLY|6295611443867695|a2b7c756ca3b62c2dc4ddbda87ee3f7d';  // 替换成你的Mapillary Client ID
  //     const coordinates = '-74.0084234,40.7198226';
  //     const radius = '100';  // 半径（米）

  //     axios.get(`https://graph.mapillary.com/v3/images?client_id=${client_id}&closeto=${coordinates}&radius=${radius}`)
  //       .then(response => {
  //         const data = response.data;
  //         if (data.features && data.features.length > 0) {
  //           const imageId = data.features[0].properties.id;  // Use the ID of the first image

  //           viewerRef.current = new Viewer({
  //             container: 'mapillary',
  //             imageId: imageId,  // 使用找到的图像的ID
  //             accessToken: client_id,
  //           });
  //         } else {
  //           console.log('No images found near the specified coordinates.');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error occurred while fetching images from Mapillary API:', error);
  //       });
  //   }
  // }, []);

  return <div ref={mapRef} className="map-module">

    {/* 创建一个新的div来放置Mapillary的街景图像 */}
    {/* <div id="mapillary" style={{width: '400px', height: '300px', zIndex: 1001}}></div> */}


    {isLoading && 
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,  // add this line
        }}
      >
        <CircularProgress size={60}/>
      </Box>
    }
  </div>;
}

export default MapModule;