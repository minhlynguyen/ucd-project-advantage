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
import { generateAdTimeDataForSingleZone } from '../../utils/testDataGenerator';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);

export default function CompareDetail({setConfirmMode}) {
  const { adTime, adTimeMode, compareZones} = React.useContext(SolutionsContext);
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

    if (!adTimeMode) {
      return;
    }

    const updateData = async (zone, index) => {
      let data = [];
      function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
      }
      if (!arraysEqual(adTime, ['', ''])) {
        // // set url here
        // axios.post('', {time_range: ''})
        // .then((response) => {
        //   if (response.data.status !== "1") {
        //     throw new Error("Can't fetch data for Line Graph now!");
        //   }
        //   data = response.data.data;
        // }).catch((error) => {
        //   console.log(error);
        // });
        data = generateAdTimeDataForSingleZone().data[String(zone.id)].detail;// test data
      }

      const impressionItems = data.map(item => {
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
      setImpressionData(prevData => {
        const newData = [...prevData];
        newData[index] = processedData;
        return newData;
      });
    };
    updateData(zone1, 0);
    updateData(zone2, 1);

  }, []);
  // for bar chart
  useEffect(() => {
    const updateData = async () => {
      let data1 = {};
      let data2 = {};

      // Promise.all([
      //   axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}main/zones/${zone1.id}`),
      //   axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}main/zones/${zone2.id}`)
      // ]).then((responses) => {
      //   if (responses[0].data.status !== "1" || responses[1].data.status !== "1") {
      //     throw new Error("Can't fetch data for business now!");
      //   }
      //   data1 = responses[0].data.data[String(zone1.id)].detail[0];
      //   data2 = responses[1].data.data[String(zone2.id)].detail[0];
      // }).catch((error) => {
      //   console.error('Error fetching data: ', error);
      // });

      data1 = generateAdTimeDataForSingleZone().data[String(zone1.id)].detail[0];//test
      data2 = generateAdTimeDataForSingleZone().data[String(zone2.id)].detail[0];//test

      setTotalBusiness([
        data1.total_business,
        data2.total_business
      ]);
  
      const categoriesDataZone1 = BIG_CATE.map((category) => data1[category]);
      const categoriesDataZone2 = BIG_CATE.map((category) => data2[category]);
      
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
    };

    updateData();
  
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
