import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SolutionsContext from '../Solutions/SolutionsContext';
import axios from 'axios';
import { ALL_AGES, BIG_CATE } from '../../constants';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';
import BasicZone from './BasicZone';
import { getGenderPercList } from '../../utils/distributionUtils';
import { getBarData, getBarOptions, getLineData, getLineOptions, getPieDataForGender, getPieOptionsForGender } from '../../utils/chartsUtils';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);


export default function ZoneBoard({zone}) {
  console.log("zone in ZoneBoard:", zone);
  const { adTimeMode } = React.useContext(SolutionsContext);
  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);

  const female_data = getPieDataForGender('female', {
    arr: getGenderPercList(zone.properties.age)[0],
    label: zone.properties.name
  });
  const male_data = getPieDataForGender('male', {
    arr: getGenderPercList(zone.properties.age)[1],
    label: zone.properties.name
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/main/zones/${zone.id}`)
      .then((response) => {
        const data = response.data;
        setTotalBusiness(data.data[zone.id].detail[0].total_business);

        const categoriesData = BIG_CATE.map((category) => data.data[zone.id].detail[0][category]);
        
        setBusinessData(getBarData(
          {
            arr: categoriesData,
            label: zone.properties.name
          })
        );
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [zone.id]);

  return ( 
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex' }}>
        <Paper sx={{p: 2, width: '100%'}}>
          <BasicZone zone={zone} totalBusiness={totalBusiness}/>
        </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={8} sx={{ display: 'flex' }}>
        <Paper
          sx={{
            p: 2,
            width: '100%', // ensure that the paper takes full width of the grid item
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(50, 67, 95, 1)',
            borderRadius: '10px',
            // height: '30vh',
            minHeight: '40vh',
            justifyContent: 'center',
            alignItems: 'center'}}
        >
          <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', zone)} options={getLineOptions(adTimeMode ? 'Ad' : 'Real', zone)} />
        </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
        <Paper sx={{ 
          p: 2, display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(50, 67, 95, 1)',
          borderRadius: '10px',
          height: '30vh',
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <Doughnut data={female_data} options={getPieOptionsForGender('Female')} />
        </Paper>

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
        <Paper sx={{                   
          p: 2, display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(50, 67, 95, 1)',
          borderRadius: '10px',
          height: '30vh',
          justifyContent: 'center',
          alignItems: 'center' }}>
          <Doughnut data={male_data} options={getPieOptionsForGender('Male')} />
        </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
        <Paper sx={{ 
          p: 2, display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(50, 67, 95, 1)',
          borderRadius: '10px',
          height: { xs: '40vh', md: '40vh' },
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {businessData && <Bar data={businessData} options={getBarOptions()} />}
        </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
