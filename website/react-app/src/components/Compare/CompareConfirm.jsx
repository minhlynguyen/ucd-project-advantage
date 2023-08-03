// import * as React from 'react';
import React, { useEffect, useRef, useState, useContext }  from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import SolutionsContext from '../Solutions/SolutionsContext';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BasicZone from '../Cards/BasicZone';


function ZoneVSCard({ zone, onRemove }) {

  const handleClickRemove = () => {
    if (onRemove) {
      onRemove(zone);
    }
  };
  
  return (
    <Paper className="zone-card" elevation={2} sx={{p: 3, height: "inherit", display: 'flex', justifyContent: 'center', width: '100%', border: "2px", flexDirection: 'column'}}>
      <BasicZone zone={zone}/>
      <Box display="flex" justifyContent="center">
        <IconButton aria-label="Remove" onClick={handleClickRemove}><RemoveCircleIcon color='error'/></IconButton>
      </Box>
    </Paper>   
  );
}


export default function CompareConfirm( {setConfirmMode} ) {
  const {compareZones, setCompareZones, setOpenCompareBoard} = useContext(SolutionsContext);

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
        {compareZones[0] ? <ZoneVSCard zone={compareZones[0]} onRemove={handleRemoveZone}/> :
          <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080'}}>
               <Button variant="outlined" onClick={handlePickOneClick}>PICK ONE</Button>
          </Paper>
        }
      </Grid>

      <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
        {/* <Typography variant="h4" align="center">VS</Typography> */}
        <img src={'/compareIcon.png'} alt="VS Icon" style={{height: '50px', width: '50px'}}/>
      </Grid>

      <Grid item xs={12}>
        {compareZones[1] ? <ZoneVSCard zone={compareZones[1]} onRemove={handleRemoveZone}/> :
          <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080'}}>
               <Button variant="outlined" onClick={handlePickOneClick}>PICK ONE</Button>
          </Paper>
        }
      </Grid>

      <Grid item xs={12} md={12} lg={12} sx={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" disabled={!(compareZones[0] && compareZones[1])} onClick={handleCompareClick}>COMPARE</Button>
      </Grid>

    </Grid>
  );
}
