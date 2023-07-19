
import { Box, Button, Card, Container, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ZoneCard({ zone, setSelectedZone }) {
  // zone is a feature for now
  const paperStyle = {
    height: 135,
    padding: 20,
    'paddingTop': '5px',
    'paddingBottom': '5px'

  };
  const handleClick = (clickedZone) => {
    return () => setSelectedZone(clickedZone);
  }
  const skeleton = 
    <Container>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="rounded" height={60} />
      </Stack>
    </Container>;
  return (
    
      (Object.keys(zone).length === 0) ?
        // <Skeleton variant="rectangular" width={210} height={60} /> :
        skeleton :

        <Paper className="zone-card" elevation={2} style={paperStyle}>
        <h3>{zone.properties.name}</h3>
        <Typography>ID: {zone.id}</Typography>
        <Typography>Borough: {zone.properties.borough}</Typography>
        <Typography>PK: {zone.properties.pk}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton aria-label="Locate" onClick={handleClick(zone)}><LocationOnIcon /></IconButton>
          <IconButton aria-label="Add to compare"><DifferenceIcon /></IconButton>
          <IconButton aria-label="Save"><FavoriteIcon /></IconButton>
          <IconButton aria-label="More"><MoreHorizIcon /></IconButton>
        </Box>
      </Paper>        
  );
}

function DetailedZoneCard({ zone }) {
  // zone is a feature for now
  const paperStyle = {
    height: 200,
    padding: 20
  };
  console.log("zone in detailedzonecard componet", zone);
  return (
    (!zone) ?

      <Skeleton variant="rectangular" width={210} height={60} /> :

      <Paper className='detailed-zone-card' elevation={2} style={paperStyle}>
        <h3>This is the detailed zone card</h3>
        <Typography>ID: {zone.id}</Typography>
        <Typography>Borough: {zone.properties.borough}</Typography>
        <Typography>PK: {zone.properties.pk}</Typography>
        <Typography>Details:show charts, graphs, distribution, impression (total and valid)</Typography>
      </Paper>
  );
}


function InfoModule({ zones, selectedZone, setSelectedZone, isLoading }) {

  const [sortedZones, setSortedZones] = useState([]);
  const [selectedZoneDetail, setSelectedZoneDetail] = useState(null);
  const selectedZoneRef = useRef(null);
  const [info, setInfo] = useState('');
  const [detailMode, setDetailMode] = useState(false);

  // update detailMode when selectedZone change
  useEffect(() => {
    console.log("selectedZoneRef", selectedZoneRef);
    console.log("selectedZone", selectedZone);
    console.log(!selectedZoneRef && selectedZone);
    console.log(selectedZoneRef && !selectedZone);
    if (!selectedZoneRef.current && selectedZone) {
      setDetailMode(true);
    }
    if (selectedZoneRef.current && !selectedZone) {
      setDetailMode(false)
    }
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);  

  // update displayed data (top 5 zones or zone detail) according to raw data
  useEffect(() => {

    if (Object.keys(zones).length !== 0) {
      const sortedZonesArray = zones.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
      setSortedZones(sortedZonesArray);
    } else {
      setSortedZones([]);
    }

    console.log("!selectedZone", !selectedZone);
    if (selectedZone) {
      // request to get details to set currentZone
      setSelectedZoneDetail(selectedZone);
    } else {
      setSelectedZoneDetail(null);
    }
    console.log("selectedZoneDetail", selectedZoneDetail);
  }, [zones, selectedZone]);

  // update info according to changes from status and data
  useEffect(() => {
    // console.log();
    if (detailMode) {
      if (isLoading) {
        const skeleton = <DetailedZoneCard zone={null}/>;
        setInfo(skeleton);
      } else {
        const detailedZoneCard = <DetailedZoneCard zone={selectedZoneDetail}/>;
        setInfo(detailedZoneCard);
      }

    } else {
      if (isLoading) {
        const emptyZones = Array.from({ length: 5 }, () => ({}));
        const skeleton = emptyZones.map((emptyZone, index) => <ZoneCard key={index} zone={emptyZone} />)
        setInfo(skeleton);
      } else {
        const zoneCards = sortedZones.map(zone => <ZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
        setInfo(zoneCards);
      }
    }

  }, [isLoading, detailMode, selectedZoneDetail, sortedZones]);
  
  return (
    <div className="info-module">
      <Stack spacing={1}>
        {info}
        {detailMode && (
          <Button variant="outlined" onClick={() => setSelectedZone(null)}>
            Back to All Zones
          </Button>
        )}
      </Stack>
    </div>
  );
  
}

export default InfoModule;




