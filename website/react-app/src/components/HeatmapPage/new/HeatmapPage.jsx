import React, { useEffect, useRef, useState } from 'react';
import './HeatmapPage.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';
import axios from 'axios';

function HeatmapPage() {

  const [filters, setFilters] = useState({});
  const [filteredZones, setFilteredZones] = useState({});

  const fetchData = async () => {
    console.log("filters are:", filters);
    //logic to wrap filters in request
    const response = await axios.get("./data.json");
    const data = response.data;
    setFilteredZones(data);
  }

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className="heatmap-page">
      <FunctionModule filters={filters} setFilters={setFilters}/>
      <div className="map-info-container">
        <MapModule zones={filteredZones}/>
        <InfoModule zones={filteredZones}/>
      </div>
    </div>
  );
};

export default HeatmapPage;


