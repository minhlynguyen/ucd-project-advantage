import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SolutionsContext from '../Solutions/SolutionsContext';
import axios from 'axios';
import { ALL_AGES, BIG_CATE } from '../../constants';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';
import BasicZone from '../Cards/BasicZone';
import { convertToReadableForGroup, getGenderPercList } from '../../utils/distributionUtils';
import { getBarData, getBarOptions, getLineData, getLineOptions, getPieDataForGender, getPieOptionsForGender } from '../../utils/chartsUtils';
import { generateOneCollection } from '../../utils/testDataGenerator';
import { convertToBriefDateString, getCurrentTimeInNY } from '../../utils/dateTimeUtils';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);


export default function SavedZoneBoard({zoneID}) {
  const [zone, setZone] = useState(null);
  const [impressionData, setImpressionData] = useState(null);
  const [femaleData, setFemaleData] = useState(null);
  const [maleData, setMaleData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);

  console.log(zone);
  // fetch data
  useEffect(() => {
    const updateData = async (id) => {
      let data = {};

      // // set url here
      // axios.get('')
      // .then((response) => {
      //   if (response.data.status !== "1") {
      //     throw new Error("Can't fetch data for current zone now!");
      //   }
      //   data = response.data.data;
      // }).catch((error) => {
      //   console.log(error);
      // });

      data = generateOneCollection().data;

      data.age = ALL_AGES.map(ageGroup => data[ageGroup.name_backend]);
      setZone(data);
      console.log(zone);
    };
    updateData(zoneID);
  }, []);
  
  // update data for summary
  useEffect(()=>{
    if (!zone) {
      return;
    }
    let data = {};
    data.properties = {
      ...zone,
      impression: {
        display: {
          total: zone.details.reduce((sum, cur) => sum + cur.impression_predict, 0)
        }
      },
      mode_group: zone.mode_age_group,
      average_income: zone.median_income,

    }
    setSummaryData(data);
  }, [zone]);

  // update data for line chart
  useEffect(()=>{
    if (!zone) {
      return;
    }
    let data = {
      labels: zone.details.map(item => convertToBriefDateString(item.datetime)), // Assume that time is same for both zone
      datasets: [
        {
          label: `${zone.name}`,
          data: zone.details.map(item => item.impression_predict || 0),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    
    setImpressionData(data);
  }, [zone]);

  // update data for pie chart
  useEffect(()=>{
    if (!zone) {
      return;
    }
    const female_data = getPieDataForGender('female', {
      arr: getGenderPercList(zone.age)[0],
      label: zone.name
    });
    const male_data = getPieDataForGender('male', {
      arr: getGenderPercList(zone.age)[1],
      label: zone.name
    });

    setFemaleData(female_data);
    setMaleData(male_data);
  }, [zone]);

  // update data for bar chart
  useEffect(() => {
    if (!zone) {
      return;
    }
    // let item = zone.details.filter(item => item.datetime === getCurrentTimeInNY())[0];
    let item = zone.details[0];//just for test
    console.log('item', item);
    const categoriesData = BIG_CATE.map((category) => item[category]);
    console.log('categoriesData', categoriesData);
    setBusinessData(getBarData(
      {
        arr: categoriesData,
        label: zone.name
      })
    );
  }, [zone]);

  return ( 
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex' }}>
        <Paper sx={{p: 2, width: '100%'}}>
          <BasicZone zone={summaryData} totalBusiness={zone ? zone.total_business : null }/>
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
          {/* <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', zone)} options={getLineOptions(adTimeMode ? 'Ad' : 'Real', zone)} /> */}
          {impressionData ?
            <Line data={impressionData} options={getLineOptions('Real')} />
            : null
          }
          
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
          {femaleData ?
          <Doughnut data={femaleData} options={getPieOptionsForGender('Female')} />
          : null
          }
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
          {maleData ?
            <Doughnut data={maleData} options={getPieOptionsForGender('Male')} />
            : null
          }
          
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
