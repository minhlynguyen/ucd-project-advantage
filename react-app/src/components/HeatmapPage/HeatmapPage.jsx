import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import choropleth from 'leaflet-choropleth';
import zones from './data.jsx';
import "./HeatmapPage.css"


function FunctionArea() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [incomeRange, setIncomeRange] = useState('');
  const [merchantCountRange, setMerchantCountRange] = useState('');

  const handleToggleFilterClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleApplyClick = () => {
    console.log(`Apply filter with income range ${incomeRange} and merchant count range ${merchantCountRange}`);
  };

  const handleIncomeRangeChange = event => {
    setIncomeRange(event.target.value);
  };

  const handleMerchantCountRangeChange = event => {
    setMerchantCountRange(event.target.value);
  };

  const handleResetClick = () => {
    setIncomeRange('');
    setMerchantCountRange('');
  };

  const handleCompareClick = () => {
    console.log("Compare button clicked.");
  };

  const handleSavedClick = () => {
    console.log("Saved button clicked.");
  };

  const handleSearch = event => {
    console.log(`Search for ${event.target.value}`);
  };
  return (
    <div className='FunctionArea'>
      <button onClick={handleToggleFilterClick}>{isFilterVisible ? 'Hide Filters' : 'Show Filters'}</button>
      <button onClick={handleCompareClick}>Compare</button>
      <button onClick={handleSavedClick}>Saved</button>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      {isFilterVisible && (
        <div className='Filters'>
          <label>
            <span>Income Range:</span>
            <input type="text" value={incomeRange} onChange={handleIncomeRangeChange} />
          </label>
          <label>
            Merchant Count Range:
            <input type="text" value={merchantCountRange} onChange={handleMerchantCountRangeChange} />
          </label>
          <button onClick={handleResetClick}>Reset</button>
          <button onClick={handleApplyClick}>Apply</button>
        </div>
      )}
    </div>
  );
}


function Map({selectedZone, setSelectedZone}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const selectedZoneRef = useRef(selectedZone);

  useEffect(() => {
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([40.7829, -73.9654], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
      console.log("map has been loaded");

      const getColor = busyIndex => {
        return busyIndex > 25 ? '#800026' :
               busyIndex > 20  ? '#BD0026' :
               busyIndex > 15  ? '#E31A1C' :
               busyIndex > 10  ? '#FC4E2A' :
               busyIndex > 5   ? '#FD8D3C' :
                                  '#FFEDA0';
      }
  
      zones.forEach(zone => {
        const polygon = L.polygon(zone.coordinates, { 
          color: getColor(zone.busyIndex), 
          fillOpacity: 0.7 
        }).addTo(map);

        polygon.on('mouseover', function () {
          this.setStyle({
            fillOpacity: 0.9
          });
        });
  
        polygon.on('mouseout', function () {
          this.setStyle({
            fillOpacity: 0.7
          });
        });

        polygon.on('click', () => {
          if (selectedZoneRef.current === zone.id) {
            console.log("zone clicked twice");
            setSelectedZone(null);
            polygon.setStyle({
              color: getColor(zone.busyIndex),
              fillOpacity: 0.7
            });
          } else {
            setSelectedZone(zone.id);
            polygon.setStyle({
              color: '#000000',
              fillOpacity: 0.9
            });
          }
        });

      });

    }
  }, [mapRef]);

  return <div id="map" ref={mapRef} className={selectedZone ? 'map-selected' : 'map-unselected'}></div>
}

function Details({zone}) {
  return (
    <div className="DetailsCard">
      <h2>Zone Details</h2>
      <p><strong>ID:</strong> {zone.id}</p>
      <p><strong>Busy Index:</strong> {zone.busyIndex}</p>
      <p><strong>Coordinates:</strong></p>
      <ul>
        {zone.coordinates.map((coordinate, index) =>
          <li key={index}>Lat: {coordinate[0]}, Lng: {coordinate[1]}</li>
        )}
      </ul>
    </div>
  );
}


function HeatmapPage() {
  const [selectedZone, setSelectedZone] = useState(null);
  return (
    <div className="HeatmapPage">
      <FunctionArea />
      <div className="MapArea">
        <Map selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
        <div className={selectedZone ? "DetailsContainer" : "DetailsContainer DetailsHidden"}>
          {selectedZone && <Details zone={zones.find(zone => zone.id === selectedZone)} />}
        </div>
      </div>
    </div>
  );
}


export default HeatmapPage;
