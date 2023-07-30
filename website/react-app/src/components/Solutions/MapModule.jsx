import React, { useContext, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import chroma from 'chroma-js';
import { Box, CircularProgress } from '@mui/material';
import 'mapillary-js/dist/mapillary.css';
import { Viewer } from 'mapillary-js';
import axios from 'axios';
import 'leaflet.vectorgrid';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder';
import './MapModule.css';
import SolutionsContext from './SolutionsContext';
import { getCurrentTimeInNY } from '../../utils/dateTimeUtils';
import { Icon } from 'leaflet';
import { BIG_CATE_ICONS } from '../../constants';

import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';



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
  // marker cluster
  const clusterRef = useRef(L.markerClusterGroup());
  const viewMarkersRef = useRef([]);
  const viewClusterRef = useRef(L.markerClusterGroup({disableClusteringAtZoom: 15}));
  const [isShowViewMarkers, setIsShowViewMarkers] = useState(false);

  const {realTime, adTime, adTimeMode} = useContext(SolutionsContext);


  // Map tile layer initialisation
  useEffect(() => {
    console.log("UseEffect:Map tile layer initialisation");
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7831, -73.9712], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);


      map.addLayer(clusterRef.current);
      map.addLayer(viewClusterRef.current);
      mapInstanceRef.current = map;
      
      // Add zoomend event listener
      map.on('zoomend', () => {
        const zoomLevel = map.getZoom();
        console.log('Zoom level is now: ', zoomLevel);
        
        // Check zoom level
        if (zoomLevel >= 18) {
          // Execute your function here
          console.log('Zoom level is now equal or above 17');
          setIsShowViewMarkers(true);

        }
      });
    }    
  }, []);


  // When zones change, add new Geojson layer, controls and set listeners
  // Refer to https://leafletjs.com/examples/choropleth/
  useEffect(() => {
    console.log("UseEffect:When zones change, add new Geojson layer, controls and set listeners");
    console.log("zones:", zones);
    if (Object.keys(zones).length !== 0) {

      var geojson;

      // set color scale and style
      function getColor(d) {
        return d > 400  ? '#08306b' :
               d > 300  ? '#08519c' :
               d > 200  ? '#2171b5' :
               d > 100  ? '#4292c6' :
               d > 50   ? '#6baed6' :
               d > 20   ? '#9ecae1' :
               d > 10   ? '#c6dbef' :
                          '#deebf7';
      }

      function style(feature) {

        return {
            fillColor: getColor(feature.properties.impression.display.valid),
            // fillColor: colorScale(feature.properties.current_impression).hex(),
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
              '<b>' + props.name + '</b><br />' + props.impression.display.valid + ' valid impression'
              : 'Hover over a zone');
      };

      // Legend Control
      let legend = L.control({position: 'topleft'});
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'map-legend'),// create a div with a class "map-legend"
        grades = [0, 10, 20, 50, 100, 200, 300, 400],
        labels = [];

        // loop through our intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
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

        // info.update(layer.feature.properties);
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
        // if (viewerRef.current) {
        //   const center = e.target.getBounds().getCenter();
        //   viewerRef.current.moveTo(center.lat, center.lng);
        // }

        console.log("user pick this zone in map:", e.target.feature);
        setSelectedZone(e.target.feature);

      }
      // summary of listeners
      function onEachFeature(feature, layer) {
        // Save the layer to the mapping
        layerMappingRef.current[feature.id] = layer;
        layer.on({
            mouseover: highlightFeature,
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
      // mapInstanceRef.current.fitBounds(geojson.getBounds());
      mapInstanceRef.current.setView([40.7831, -73.9712], 12);

      info.addTo(mapInstanceRef.current);
      infoRef.current = info;

      legend.addTo(mapInstanceRef.current);
      legendRef.current = legend;

      geocoder.addTo(mapInstanceRef.current);
      geocoderRef.current = geocoder;
      
    }

    // remove previous geojson layer and controls and geocoder
    return () => {
      // Save a mapping from feature ID to layer
      layerMappingRef.current = {};
      // Reset current zone
      currentZoneRef.current = null;
      //Remove the old geoJSON layer if it exists
      if (geoJsonRef.current) {
        mapInstanceRef.current.removeLayer(geoJsonRef.current);
        geoJsonRef.current = null;
      }
      //Remove controls and geocoder if exist
      if (infoRef.current) {
        infoRef.current.remove();
        infoRef.current = null;
      }
      if (legendRef.current) {
        legendRef.current.remove();
        legendRef.current = null;
      }
      if (geocoderRef.current) {
        geocoderRef.current.remove();
        geocoderRef.current = null;
      }
    }
  }, [zones]);



  //What happened to the map (zones and map) when a zone is selected
  //when selectedZone change, reset pre's style and set new one's style and get a zoom level in the map
  useEffect(() => {
    console.log("UseEffect:What happened to the map when a zone is selected");
    // return pre selected zone to normal
    if (currentZoneRef.current) {
      geoJsonRef.current.resetStyle(currentZoneRef.current); 
      infoRef.current.update();
      
      //remove view markers
   
      viewMarkersRef.current.forEach(marker => {
        viewClusterRef.current.removeLayer(marker);
      });
      

    }
    if (selectedZone) {
      const layer = layerMappingRef.current[selectedZone.id];
      currentZoneRef.current = layer;
      mapInstanceRef.current.fitBounds(layer.getBounds());
      layer.setStyle({
        color: '#32435f',
        fillOpacity: 0
      });
      // Add markers

    } else {
      if (geoJsonRef.current) {
        // mapInstanceRef.current.fitBounds(geoJsonRef.current.getBounds());
        mapInstanceRef.current.setView([40.7831, -73.9712], 12);
      }
    }
  }, [selectedZone]);
  // Manage markers when a zone is selected
  useEffect(() => {
    console.log("UseEffect: Manage markers when a zone is selected");
    if (!mapInstanceRef.current) {
      return;
    }
    // placeholder for markers
    let markers = [];

    // If there is a selected zone
    if (selectedZone) {
      // Create an async function to handle the async operation
      (async () => {
        try {
          // Request data for markers in selected zone
          const url = `http://127.0.0.1:8000/main/zones/${selectedZone.id}/places`;
          const response = await axios.get(url);
          if (response.status !== 201 || response.data.status !== "1"){
            throw new Error("Can't fetch markers data!");
          }
          addMarkersToMap(response.data.data); 
        } catch (error) {
          console.error(error);
        }
      })();
    }

    const addMarkersToMap = (data) => {
      // Parse features from data
      const features = JSON.parse(data).features;

      // For each feature, create a marker and add it to the map
      features.forEach(feature => {
        // const icon = new Icon({ iconUrl: '/museum.png', iconSize: [40, 40]});
        const big_cate = feature.properties.big_cate.toLowerCase();
        const icon_url = BIG_CATE_ICONS[big_cate];
        const url = icon_url ? icon_url : '/museum.png';
        const icon = new Icon({ iconUrl: url, iconSize: [40, 40]});
        const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {icon})
          .bindPopup(`
            <strong>${feature.properties.name}</strong>
            <br/>
            Status: ${feature.properties.status}
            <br/>
            Big Category: ${feature.properties.big_cate}
            <br/>
            Small Category: ${feature.properties.small_cate}
            <br/>
            Zone: ${feature.properties.taxi_zone}
            <br/>
            pk: ${feature.properties.pk}
          `);

        markers.push(marker);
        clusterRef.current.addLayer(marker);
      });
    }

    // When the component is unmounted, or when the selected zone changes, remove all markers
    return () => {
      markers.forEach(
        (marker) => {
          clusterRef.current.removeLayer(marker);
          mapInstanceRef.current.removeLayer(marker);
        }
        );

    };

  }, [selectedZone]);

  // Add markers for view when a zone is selected
  useEffect(() => {

  }, []);

  

  // Initialize Mapillary viewer when the map is ready
  useEffect(() => {
    if (mapInstanceRef.current && !viewerRef.current) {
      viewerRef.current = new Viewer({
        container: 'mapillary',
        imageId: '3056168174613811',  
        accessToken: import.meta.env.VITE_APP_ACCESS_TOKEN,  // Mapillary Client ID
        isNavigable: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!selectedZone) {
      return;
    }
    if (!isShowViewMarkers) {
      return;
    }
    // Get map instance
    const map = mapInstanceRef.current;
    // Get current bounds of the map view
    const bounds = map.getBounds();
    // Convert bounds to bbox string
    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

        
    const fetchData = async () => {
      try {
        // Fetch image data
        const url = `/api/images?access_token=${import.meta.env.VITE_APP_ACCESS_TOKEN}&fields=id,computed_geometry,thumb_256_url,geometry,sequence&bbox=${bbox}&limit=100`;
        // `/api/images?access_token=${import.meta.env.VITE_APP_ACCESS_TOKEN}&fields=id,computed_geometry,thumb_256_url&bbox=${bbox}&limit=100`
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error("Can't fetch pictures for viewing now!");
        } 
        const data = response.data.data;
        console.log("pictures data:", data );

        const sequenceSet = new Set();
        const uniqueData = data.filter(item => {
          if(!sequenceSet.has(item.sequence)) {
            sequenceSet.add(item.sequence);
            return true;
          }
          return false;
        });
        console.log("filtered pictures data:", uniqueData );
        
        uniqueData.forEach(image => {
          // Create a new marker with the image as the icon
          // if (image.computed_geometry) {
          //   const marker = L.marker(
          //     [image.computed_geometry.coordinates[1], image.computed_geometry.coordinates[0]], 
          //     { icon: L.icon({ iconUrl: image.thumb_256_url, iconSize: [25, 25] }) }
          //   ); 
          //   // Add the marker to the map
          //   viewClusterRef.current.addLayer(marker);
          //   viewMarkersRef.current.push(marker);
          //   // marker.addTo(viewCluster);
          // }
          if (image.geometry) {
            const marker = L.marker(
              [image.geometry.coordinates[1], image.geometry.coordinates[0]], 
              { icon: L.icon({ iconUrl: image.thumb_256_url, iconSize: [25, 25] }) }
            ); 
            // Add the marker to the map
            viewClusterRef.current.addLayer(marker);
            viewMarkersRef.current.push(marker);
            // marker.addTo(viewCluster);
          }

        });

         
      } catch (error) {
        console.error("PIC MARKER", error);
      }
    };

    fetchData();
    
    // const mapillaryLayer = L.tileLayer(`/api/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=${import.meta.env.VITE_APP_ACCESS_TOKEN}`,
    //   {
    //     maxZoom: 15,
    //     tms: false,
    //     attribution: '<a href="https://www.mapillary.com/">Mapillary</a>',
    //     id: 'mapbox.mapbox-streets-v7'
    //   }
    //   ).addTo(map);
    // //   mapillaryLayer.setZIndex(999);
    // console.log('map.hasLayer(mapillaryLayer)', map.hasLayer(mapillaryLayer));
  //   var mapillaryUrl = `/api/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=${import.meta.env.VITE_APP_ACCESS_TOKEN}`;

  //   var vectorGrid = L.vectorGrid.protobuf(mapillaryUrl, {
  //     vectorTileLayerStyles: {
  //       sequence: function(properties, zoom) {
  //             return {
  //                 // radius: 3,
  //                 fillColor: "#ff0000",
  //                 fillOpacity: 0.5,
  //                 stroke: true,
  //                 fill: true,
  //                 color: 'white',
  //                 weight: 1
  //             }
  //         }
  //     },
  //     interactive: true,
  //     getFeatureId: function(f) {
  //         return f.properties.id;
  //     }
  // }).addTo(map);
  
  // // Interact with the features
  // vectorGrid.on('click', function(e) {
  //     var properties = e.layer.properties;
  //     var popupContent = 
  //         `<b>Feature ID:</b> ${properties.id}<br>` +
  //         `<b>Class:</b> ${properties.image_id}<br>` +
          
  //     L.popup()
  //         .setLatLng(e.layer.latlng)
  //         .setContent(popupContent)
  //         .openOn(map);
  // });

    
    
    
    console.log('key is:', import.meta.env.VITE_APP_ACCESS_TOKEN);
  }, [selectedZone, isShowViewMarkers]);
  


  return <div ref={mapRef} className="map-module">

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
          {selectedZone ?
        <div id="mapillary" style={{display: 'block'}}></div> :
        <div id="mapillary" style={{display: 'none'}}></div>
      }
  </div>;
}

export default MapModule;