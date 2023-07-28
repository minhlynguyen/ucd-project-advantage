import React, { useEffect, useRef, useState }  from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Divider, Typography } from '@mui/material';
import SolutionsContext from '../Solutions/SolutionsContext';
import { convertToBriefDateString } from '../../utils/dateTimeUtils';
import axios from 'axios';
import { BIG_CATE } from '../../constants';
import { Line, Pie, Bar } from 'react-chartjs-2';

import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);


export default function ZoneBoard({zone}) {
  console.log("zone in ZoneBoard:", zone);
  const { adTimeMode } = React.useContext(SolutionsContext);
  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/main/zones/${zone.id}`)
      .then((response) => {
        const data = response.data;
        setTotalBusiness(data.data[zone.id].detail[0].total_business);
        const categoriesData = BIG_CATE.map((category) => data.data[zone.id].detail[0][category]);

        setBusinessData({
          labels: BIG_CATE,
          datasets: [
            {
              label: 'Number of Businesses',

              data: categoriesData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(99, 255, 132, 0.5)',
                'rgba(162, 54, 235, 0.5)',
                'rgba(206, 255, 86, 0.5)',
                'rgba(192, 75, 192, 0.5)',
                'rgba(102, 153, 255, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(99, 255, 132, 1)',
                'rgba(162, 54, 235, 1)',
                'rgba(206, 255, 86, 1)',
                'rgba(192, 75, 192, 1)',
                'rgba(102, 153, 255, 1)'
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [zone.id]);

  const items = adTimeMode ? zone.properties.impression.adTime.items : zone.properties.impression.realTime.items;

  const LineData = {
    labels: items.map(item => convertToBriefDateString(item.time)),
    datasets: [
      {
        label: 'Total',
        data: items.map(item => item.value),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Valid',
        data: items.map(item => item.validValue),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
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

  const fakeBusinessData = [12, 19, 3, 5, 2, 3, 14, 7, 6, 9, 11];

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



  return (

    
    <Container sx={{ mt: 4, mb: 4, height: '60vh'}}>
              <Grid container spacing={3}>

                <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex' }}>
                <Paper
                    sx={{
                    p: 2,
                    width: '100%', // ensure that the paper takes full width of the grid item
                    display: 'flex',
                    flexDirection: 'column',
                    // backgroundColor: '#a68078',
                    }}
                >
                  <Typography variant='h5' sx={{ mb: 2, color: 'rgba(50, 67, 95)', fontWeight: 'bold'}}>{zone.properties.name}</Typography>
                  {/* <Typography sx={{fontStyle: 'italic', mb: 1}}>Borough: {zone.properties.borough}</Typography> */}
                  <Divider variant="middle" />
                  <div>
                    <Typography component="span" sx={{ fontSize: '32px', color: '#8fafef', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.impression.display.total}</Typography>
                    <Typography component="span">Total Impression</Typography>
                  </div>
                  <div>                
                    <Typography component="span" sx={{ fontSize: '32px', color: '#c57682', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.impression.display.valid}</Typography>
                    <Typography component="span">Target Impression</Typography>
                  </div>
                  <div>
                    <Typography component="span">Average Age: </Typography>
                    <Typography component="span" sx={{ fontSize: '28px', color: '#8b87d9', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.average_age}</Typography>
                  </div>
                  <div>
                    <Typography component="span">Average Income: </Typography>
                    <Typography component="span" sx={{ fontSize: '28px', color: '#58882a', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{zone.properties.average_income}</Typography>
                  </div>
                  <div>
                    <Typography component="span">Total Business: </Typography>
                    <Typography component="span" sx={{ fontSize: '28px', color: '#4bc0c0', fontFamily: 'Arial', fontStyle: 'italic', mr: 2 }}>{totalBusiness}</Typography>
                  </div>
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
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                >

                  <Line data={LineData} options={LineOptions} />

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

                  <Pie data={pieData_Age} options={getPieOptions('Age')} />
    
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
                  <Pie data={pieData_Income} options={getPieOptions('Income')} />
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
                </Grid>
    </Container>

  );
}
