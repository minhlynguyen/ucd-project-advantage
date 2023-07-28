// import * as React from 'react';
import React, { useEffect, useRef, useState, useContext }  from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import SolutionsContext from '../Solutions/SolutionsContext';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

function ZoneVSCard({ zone, onRemove }) {

  const handleClickRemove = () => {
    if (onRemove) {
      onRemove(zone);
    }
  };
  
  return (
    // <Paper className="zone-card" elevation={2} sx={{height: "inherit", width: "100%"}}>
    <div>
    <Typography variant='h4'>{zone.properties.name}</Typography>
     {/* <Typography style={{ fontStyle: 'italic', color: 'grey' }}>Borough: {zone.properties.borough}</Typography> */}
    {/* <Typography>Total Impression: {zone.properties.impression.display.total}</Typography>
    <Typography>Target Impression: {zone.properties.impression.display.valid}</Typography> */}
    <Box display="flex" justifyContent="center">
      <IconButton aria-label="Remove" onClick={handleClickRemove}><RemoveCircleIcon color='error'/></IconButton>
    </Box>
    </div>
  // </Paper>   
  );
}


export default function CompareConfirm( {setConfirmMode} ) {
  const {compareZones, setCompareZones, setOpenCompareBoard} = useContext(SolutionsContext);
  // const [zone1, setZone1] = React.useState(null);
  // const [zone2, setZone2] = React.useState(null);
  // const [zone1, setZone1] = React.useState(1);
  // const [zone2, setZone2] = React.useState(2);


  const handleCompareClick = () => {
    setConfirmMode(false);
  };

  const handlePickOneClick = () => {
    // close the dialog
    setOpenCompareBoard(false);
    
  };
  const handleRemoveZone = (zoneToRemove) => {
    setCompareZones(compareZones.map(zone => zone === zoneToRemove ? null : zone));
  };

  return (
    <Grid container spacing={3} className='compare-confirm' sx={{display: 'flex', alignItems: 'center'}}>
      <Grid item xs={12}>
        <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080'}}>
            {/* replace null with your data */}
            {compareZones[0] ? <ZoneVSCard zone={compareZones[0]} onRemove={handleRemoveZone}/> : <Button variant="outlined" onClick={handlePickOneClick}>PICK ONE</Button>}
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h4" align="center">VS</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080'}}>
            {/* replace null with your data */}
            {compareZones[1] ? <ZoneVSCard zone={compareZones[1]} onRemove={handleRemoveZone}/> : <Button variant="outlined" onClick={handlePickOneClick}>PICK ONE</Button>}
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{display: 'flex', justifyContent: 'center'}}>
          {/* replace null with your data */}
        <Button variant="contained" disabled={!(compareZones[0] && compareZones[1])} onClick={handleCompareClick}>COMPARE</Button>
      </Grid>

    </Grid>
  );
}
