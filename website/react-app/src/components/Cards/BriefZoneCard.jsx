
import { Box, Button, Card, Container, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function BriefZoneCard({ zone, setSelectedZone }) {
  // zone is a feature for now
  const paperStyle = {
    // height: 135,
    padding: 20,
    'paddingTop': '5px',
    'paddingBottom': '5px'

  };
  const handleClick = (clickedZone) => {
    return () => setSelectedZone(clickedZone);
  };

  const handleClickMore = (clickedZone) => {
    return () => {

    };
  };
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
        {/* <Typography>ID: {zone.id}</Typography> */}
        <Typography>Borough: {zone.properties.borough}</Typography>
        <Typography>Total Impression: {zone.properties.impression.display.total}</Typography>
        <Typography>Target Impression: {zone.properties.impression.display.valid}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton aria-label="Locate" onClick={handleClick(zone)}><LocationOnIcon /></IconButton>
          <IconButton aria-label="Add to compare"><DifferenceIcon /></IconButton>
          <IconButton aria-label="Save"><FavoriteIcon /></IconButton>
          <IconButton aria-label="More" onClick={handleClickMore(zone)}><MoreHorizIcon /></IconButton>
        </Box>
      </Paper>        
  );
}