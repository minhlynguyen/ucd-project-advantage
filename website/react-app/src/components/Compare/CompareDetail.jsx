// import * as React from 'react';
import React, { useEffect, useRef, useState, useContext }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import { convertToBriefDateString } from '../../utils/dateTimeUtils';
import axios from 'axios';
import { BIG_CATE } from '../../constants';
import { Line, Pie, Bar } from 'react-chartjs-2';
import SolutionsContext from '../Solutions/SolutionsContext';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';
import BasicZone from '../Cards/BasicZone';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);

export default function CompareDetail({setConfirmMode}) {
  const { adTimeMode, compareZones} = React.useContext(SolutionsContext);

  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState([null, null]);

  const zone1 = compareZones[0];
  const zone2 = compareZones[1];
  
  useEffect(() => {

    Promise.all([
      axios.get(`http://127.0.0.1:8000/main/zones/${zone1.id}`),
      axios.get(`http://127.0.0.1:8000/main/zones/${zone2.id}`)
    ]).then((responses) => {
      const dataZone1 = responses[0].data;
      const dataZone2 = responses[1].data;
  
      setTotalBusiness([
        dataZone1.data[zone1.id].detail[0].total_business,
        dataZone2.data[zone2.id].detail[0].total_business
      ]);
  
      const categoriesDataZone1 = BIG_CATE.map((category) => dataZone1.data[zone1.id].detail[0][category]);
      const categoriesDataZone2 = BIG_CATE.map((category) => dataZone2.data[zone2.id].detail[0][category]);
  
      setBusinessData({
        labels: BIG_CATE,
        datasets: [
          {
            label: zone1.properties.name,
            data: categoriesDataZone1,
            backgroundColor: ['rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
          {
            label: zone2.properties.name,
            data: categoriesDataZone2,
            backgroundColor: ['rgba(54, 162, 235, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      });
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  
  }, [compareZones]);

  const items1 = adTimeMode ? zone1.properties.impression.adTime.items : zone1.properties.impression.realTime.items;
  const items2 = adTimeMode ? zone2.properties.impression.adTime.items : zone2.properties.impression.realTime.items;

  const LineData = {
    labels: items1.map(item => convertToBriefDateString(item.time)), // Assume that time is same for both zone
    datasets: [
      {
        label: `${zone1.properties.name} (total)`,
        data: items1.map(item => item.value),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: `${zone1.properties.name} (valid)`,
        data: items1.map(item => item.validValue),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: `${zone2.properties.name} (total)`,
        data: items2.map(item => item.value),
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: `${zone2.properties.name} (valid)`,
        data: items2.map(item => item.validValue),
        fill: false,
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  };

  const LineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: (adTimeMode ? 'Impression for Ad Time' : 'Impression for Today'),
        color: 'white', 
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true,
        labels: {
          color: 'white',
        }, 
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'x'
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: 'white', 
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Impression',
          color: 'white', 
        },
        ticks: {
          color: 'white', 
        },
        beginAtZero: true
      },
    },
  };
  const fakeData = [0.2, 0.5, 0.3];
  const pieData_Age = {
    labels: ['Youth', 'Adult', 'Senior'],
    datasets: [
        {
            label: 'Percentage',
            data: fakeData,
            // data: zone.properties.age,
            backgroundColor: ['rgba(255,99,132,0.5)', 'rgba(54,162,235,0.5)', 'rgba(255,206,86,0.5)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
            borderWidth: 1,
        },
    ],
  };
  const pieData_Income = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
        {
            label: 'Percentage',
            data: fakeData,
            // data: zone.properties.age,
            backgroundColor: ['rgba(255,99,132,0.5)', 'rgba(54,162,235,0.5)', 'rgba(255,206,86,0.5)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
            borderWidth: 1,
        },
    ],
  };

  function getPieOptions(label) {
    const pieOptions = {
      plugins: {
          legend: {
              labels: {
                  color: 'white',
              },
              position: 'right'
          },
          title: {
              display: true,
              text: label + ' Distribution',
              color: 'white',
          },
      },
    };
    return pieOptions;
  };

  const businessOptions = {
    scales: {
        x: {
            ticks: {
                display: false,
                color: 'white',
            },
            title: {
                display: true,
                text: 'Business Category',
                color: 'white', 
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: 'white', 
            },
            title: {
                display: true,
                text: 'Number',
                color: 'white', 
            },
        },
    },
    plugins: {
        title: {
            display: true,
            text: 'Business Distribution',
            color: 'white', 
        },
    },
  };  


  const handleBack = () => {
    setConfirmMode(true);
  };
  

  return (
      <Grid container spacing={3} className='compare-detail'>
        <Grid item xs={12} md={2.5} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Line data={LineData} options={LineOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={2.5} lg={3} sx={{ display: 'flex' }}>
          <Paper
            sx={{
              p: 2,
              width: '100%', // ensure that the paper takes full width of the grid item
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <BasicZone zone={zone2} totalBusiness={totalBusiness[1]}/>
            {/* <Typography sx={{ wordBreak: 'break-all' }}>Zone2 Summary</Typography> */}
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
          <Paper sx={{ 
                  p: 2, display: 'flex', flexDirection: 'column',
                  backgroundColor: 'rgba(50, 67, 95, 1)',
                  borderRadius: '10px',
                  height: { xs: '40vh', md: '40vh' },
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
          {businessData && <Bar data={businessData} options={businessOptions} />}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button variant='outlined' onClick={() => handleBack()}>BACK</Button>
        </Grid>
      </Grid>
    // </Container>
  );
}
