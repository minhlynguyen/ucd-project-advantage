// import * as React from 'react';
import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';
import CompareDetail from './CompareDetail';

import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

export default function CompareConfirm( {setConfirmMode} ) {
  // const [zone1, setZone1] = React.useState(null);
  // const [zone2, setZone2] = React.useState(null);
  const [zone1, setZone1] = React.useState(1);
  const [zone2, setZone2] = React.useState(2);


  const handleCompareClick = () => {
    setConfirmMode(false);
  };

  const handlePickOneClick = () => {
    // close the dialog
    
  }

  return (
    <Grid container spacing={3} className='compare-confirm' sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={12}>
              <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080' }}>
                  {/* replace null with your data */}
                  {zone1 ? "Area 1" : <Button variant="contained" onClick={handlePickOneClick}>PICK ONE</Button>}
              </Paper>
          </Grid>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
              <Typography variant="h4" align="center">VS</Typography>
          </Grid>
          <Grid item xs={12}>
              <Paper sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary', border: '2px dashed #808080' }}>
                  {/* replace null with your data */}
                  {zone2 ? "Area 2" : <Button variant="contained" onClick={handlePickOneClick}>PICK ONE</Button>}
              </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{display: 'flex', justifyContent: 'center'}}>
              {/* replace null with your data */}
              <Button variant="contained" disabled={!(zone1 && zone2)} onClick={handleCompareClick}>COMPARE</Button>
          </Grid>

    </Grid>
  );
}
