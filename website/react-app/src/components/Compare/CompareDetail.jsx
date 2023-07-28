// import * as React from 'react';
import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import SolutionsContext from '../Solutions/SolutionsContext';
import { convertToBriefDateString } from '../../utils/dateTimeUtils';
import axios from 'axios';
import { BIG_CATE } from '../../constants';
import { Line, Pie, Bar } from 'react-chartjs-2';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);

export default function CompareDetail({setConfirmMode}) {
  const { adTimeMode } = React.useContext(SolutionsContext);
  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);
  
  const zoneID1 = 5;
  const zoneID2 = 134;

  const handleBack = () => {
    setConfirmMode(true);
  };
  

  return (
    // <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      <Grid container spacing={3} className='compare-detail'>

        <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ wordBreak: 'break-all' }}>Zone1 Summary</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography>impression line graphs /user can choose time range</Typography>
            {/* <Box width={600}>hello</Box> */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ wordBreak: 'break-all' }}>Zone2 Summary</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Age Distribution / pie chart</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Income Distribution / pie chart</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Business Distribution / table or graph?</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button variant='outlined' onClick={() => handleBack()}>BACK</Button>
        </Grid>
      </Grid>
    // </Container>
  );
}
