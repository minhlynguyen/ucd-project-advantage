// import * as React from 'react';
import React, { useEffect, useRef, useState, useContext }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { BIG_CATE } from '../../constants';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import SolutionsContext from '../Solutions/SolutionsContext';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';
import BasicZone from '../Cards/BasicZone';
import { getBarData, getBarOptions, getLineData, getLineOptions, getPieDataForGender, getPieOptionsForGender } from '../../utils/chartsUtils';
import { getGenderPercList } from '../../utils/distributionUtils';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);

export default function CompareDetail({setConfirmMode}) {
  const { adTimeMode, compareZones} = React.useContext(SolutionsContext);
  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState([null, null]);
  const [impressionData, setImpressionData] = useState(compareZones);
  const zone1 = compareZones[0];
  const zone2 = compareZones[1];
  
  const female_data = getPieDataForGender('female', {
    arr: getGenderPercList(zone1.properties.age)[0],
    label: zone1.properties.name
  }, 
  {
    arr: getGenderPercList(zone2.properties.age)[0],
    label: zone2.properties.name
  });

  const male_data = getPieDataForGender('male', {
    arr: getGenderPercList(zone1.properties.age)[1],
    label: zone1.properties.name
  }, {
    arr: getGenderPercList(zone2.properties.age)[1],
    label: zone2.properties.name
  });


  const handleBack = () => {
    setConfirmMode(true);
  };

  // fetch data for line chart
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const url1 = '';
        const url2 = '';
        const [response1, response2] = await Promise.all([axios.get(url1), axios.get(url2)]);
        if (response1.status !== 201 || response1.data.status !== "1" || response2.status !== 201 || response2.data.status !== "1") {
          throw new Error("Can't fetch data for Line Graph now! Error:");
        }
        
        const data = [response1.data.data, response2.data.data];
        const copyImpressionData = [...impressionData];
        data.forEach((d, i) => {
          const zone = compareZones[i];
          const impressionItems = d.map(item => {
            return {
              time: item.datetime,
              value: item.impression_predict || 0, // if detail has no impression_predict or impression_predict is null, let it be 0
              validValue: item.impression_predict ? parseFloat((item.impression_predict * zone.properties.impression.targetPerc).toFixed(2)) : 0
            };
          });
          const processedData = {
            ...zone,
            properties: {
              ...zone.properties,
              impression: {
                ...zone.properties.impression,
                adTime: {
                  ...zone.properties.impression.adTime,
                  items: impressionItems
                }
              }
            }
          };
          copyImpressionData[i] = processedData;
        } );
        setImpressionData(copyImpressionData);
      } catch(error) {
        console.log( error);
      }
    };
    // fetchData();
  }, []);
  // for bar chart
  useEffect(() => {

    Promise.all([
      axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}main/zones/${zone1.id}`),
      axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}main/zones/${zone2.id}`)
    ]).then((responses) => {
      const dataZone1 = responses[0].data;
      const dataZone2 = responses[1].data;
  
      setTotalBusiness([
        dataZone1.data[zone1.id].detail[0].total_business,
        dataZone2.data[zone2.id].detail[0].total_business
      ]);
  
      const categoriesDataZone1 = BIG_CATE.map((category) => dataZone1.data[zone1.id].detail[0][category]);
      const categoriesDataZone2 = BIG_CATE.map((category) => dataZone2.data[zone2.id].detail[0][category]);
      
      setBusinessData(getBarData(
        {
          arr: categoriesDataZone1,
          label: zone1.properties.name
        },
        {
          arr: categoriesDataZone2,
          label: zone2.properties.name
        })
      );
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  
  }, [compareZones]);
  

  return (
      <Grid container spacing={3} className='compare-detail'>
        <Grid item xs={12} md={2.5} lg={3} sx={{ display: 'flex' }}>
          <Paper sx={{p: 2, width: '100%'}}>
            <BasicZone zone={zone1} totalBusiness={totalBusiness[0]}/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={6} sx={{ display: 'flex' }}>
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
              alignItems: 'center'
            }}
          >
            {/* <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', zone1, zone2)} options={getLineOptions(adTimeMode ? 'Ad' : 'Real')} /> */}
            <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', impressionData[0], impressionData[1])} options={getLineOptions(adTimeMode ? 'Ad' : 'Real')} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={2.5} lg={3} sx={{ display: 'flex' }}>
          <Paper sx={{p: 2, width: '100%'}}>
            <BasicZone zone={zone2} totalBusiness={totalBusiness[1]}/>
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
            alignItems: 'center'
          }}>
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
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button variant='outlined' onClick={() => handleBack()}>BACK</Button>
        </Grid>

      </Grid>
    // </Container>
  );
}
