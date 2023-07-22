import React, { useEffect, useRef, useState } from 'react';
import './SolutionsContent.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';
import axios from 'axios';
import { Box, Fab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';

function SolutionsContent() {

  const [filters, setFilters] = useState({});
  const [filteredZones, setFilteredZones] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update filteredZones when filters change
  useEffect(() => {
    setSelectedZone(null);
    setIsLoading(true);
    const fetchData = async () => {
      console.log("filters are:", filters);
      //logic to wrap filters in request
      const url = "./data.json";
      // const url = "http://127.0.0.1:8000/api/zones";
      const response = await axios.get(url);
      const data = response.data;
      setFilteredZones(data);
      setIsLoading(false);
    }
    fetchData();
  }, [filters]);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [filteredZones]);


  // console.log("selectedZone:", selectedZone);
  return (
    <div className="solutions-content">
      <FunctionModule filters={filters} setFilters={setFilters}/>
      <div className="map-info-container">
        <MapModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading}/>
        <InfoModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading}/>
      </div>
      <Box className='floating-button'>
        <Fab color="primary" aria-label="compare">
          <DifferenceIcon />
        </Fab>
        <Fab color='secondary' aria-label="like">
          <FavoriteIcon />
        </Fab>
      </Box>

    </div>
  );
};

export default SolutionsContent;


