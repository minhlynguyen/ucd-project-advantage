import React, { useEffect, useRef, useState } from 'react';
import './SolutionsContent.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';
import axios from 'axios';

function SolutionsContent() {

  const [filters, setFilters] = useState({});
  const [filteredZones, setFilteredZones] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);

  // Update filteredZones when filters change
  useEffect(() => {
    const fetchData = async () => {
      console.log("filters are:", filters);
      //logic to wrap filters in request
      const response = await axios.get("./data.json");
      const data = response.data;
      setFilteredZones(data);
    }
    fetchData();
  }, [filters]);
  console.log("selectedZone:", selectedZone);
  return (
    <div className="solutions-content">
      <FunctionModule filters={filters} setFilters={setFilters}/>
      <div className="map-info-container">
        <MapModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone}/>
        <InfoModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone}/>
      </div>
    </div>
  );
};

export default SolutionsContent;


