// import React from 'react';

// function InfoModule() {
//   return (
//     <div className="info-module">
//         InfoModule
//     </div>
//   );
// };

// export default InfoModule;
import { Box, Button, Card, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ZoneCard({ zone, setSelectedZone }) {

  const paperStyle = {
    height: 135,
    padding: 20,
    'paddingTop': '5px',
    'paddingBottom': '5px'

  };
  const handleClick = (clickedZone) => {
    return () => setSelectedZone(clickedZone);
  }
  return (
    
    <Paper className="zone-card" elevation={2} style={paperStyle}>
      <h3>{zone.properties.name}</h3>
      <Typography>ID: {zone.id}</Typography>
      <Typography>Borough: {zone.properties.borough}</Typography>
      <Typography>PK: {zone.properties.pk}</Typography>
      <Box display="flex" justifyContent="flex-end">
        {/* <Button variant='contained' size='small' onClick={handleClick(zone)}>Locate</Button> */}
        <IconButton aria-label="Locate" onClick={handleClick(zone)}><LocationOnIcon /></IconButton>
        <IconButton aria-label="Add to compare"><DifferenceIcon /></IconButton>
        <IconButton aria-label="Save"><FavoriteIcon /></IconButton>
        <IconButton aria-label="More"><MoreHorizIcon /></IconButton>
      </Box>
    </Paper>
  );
}

function DetailedZoneCard({ zone }) {
  const paperStyle = {
    height: 200,
    padding: 20
  };
  return (
    <Paper className='detailed-zone-card' elevation={2} style={paperStyle}>
      <h3>This is the detailed zone card</h3>
      <Typography>ID: {zone.id}</Typography>
      <Typography>Borough: {zone.properties.borough}</Typography>
      <Typography>PK: {zone.properties.pk}</Typography>
      <Typography>Details:show charts, graphs, distribution, impression (total and valid)</Typography>
    </Paper>
  );
}


function InfoModule({ zones, selectedZone, setSelectedZone }) {
  const [sortedZones, setSortedZones] = useState([]);
  const currentZoneRef = useRef(null);
  const [info, setInfo] = useState('');

  // When zones change, get top 5 zones and set a list of ZoneCards in info
  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
      // Reset current zone
      currentZoneRef.current = null;
      const sortedZonesArray = zones.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
      setSortedZones(sortedZonesArray);
      
      const zoneCards = sortedZonesArray.map(zone => <ZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
      setInfo(zoneCards);
    }
  }, [zones]);

  // When selectedZone change, set a list of ZoneCards in info when it's null and set DetailedZoneCard otherwise
  useEffect(() => {
    if (selectedZone) {
      const detailedZoneCard = <DetailedZoneCard zone={selectedZone}/>;
      setInfo(detailedZoneCard);
    } else {
      const zoneCards = sortedZones.map(zone => <ZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
      setInfo(zoneCards);
    }
  }, [selectedZone]);

  return (
    <div className="info-module">
      <Stack spacing={1}>{info}</Stack>
      {/* <Box>{info}</Box> */}
      
    </div>
  );
}

export default InfoModule;




