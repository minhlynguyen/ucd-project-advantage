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
import { generateAdTimeDataForSingleZone } from '../../utils/testDataGenerator';
import axiosInstance from '../../AxiosConfig';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, PieController, ArcElement, BarController, BarElement);


export default function ZoneBoard({zone}) {
  console.log("zone in ZoneBoard:", zone);
  const { adTime, adTimeMode } = React.useContext(SolutionsContext);
  const [businessData, setBusinessData] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);
  const [impressionData, setImpressionData] = useState(zone);

  const female_data = getPieDataForGender('female', {
    arr: getGenderPercList(zone.properties.age)[0],
    label: zone.properties.name
  });
  const male_data = getPieDataForGender('male', {
    arr: getGenderPercList(zone.properties.age)[1],
    label: zone.properties.name
  });

  // fetch data for line chart
  useEffect(()=>{

    if (!adTimeMode) {
      return;
    }

    // const updateData = async () => {
    //   let data = [];
    //   function arraysEqual(a, b) {
    //     return a.length === b.length && a.every((val, index) => val === b[index]);
    //   }
    //   if (!arraysEqual(adTime, ['', ''])) {
    //     // // set url here
    //     // axios.post('', {time_range: ''})
    //     // .then((response) => {
    //     //   if (response.data.status !== "1") {
    //     //     throw new Error("Can't fetch data for Line Graph now!");
    //     //   }
    //     //   data = response.data.data;
    //     // }).catch((error) => {
    //     //   console.log(error);
    //     // });
    //     data = generateAdTimeDataForSingleZone().data[String(zone.id)].detail;// test data
    //   }

    //   const impressionItems = data.map(item => {
    //     return {
    //       time: item.datetime,
    //       value: item.impression_predict || 0, // if detail has no impression_predict or impression_predict is null, let it be 0
    //       validValue: item.impression_predict ? parseFloat((item.impression_predict * zone.properties.impression.targetPerc).toFixed(2)) : 0
    //     };
    //   });
    //   const processedData = {
    //     ...zone,
    //     properties: {
    //       ...zone.properties,
    //       impression: {
    //         ...zone.properties.impression,
    //         adTime: {
    //           ...zone.properties.impression.adTime,
    //           items: impressionItems
    //         }
    //       }
    //     }
    //   };
    //   setImpressionData(processedData);
    // };

    const updateData = async () => {
      let data = [];
      function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
      }
      if (!arraysEqual(adTime, ['', ''])) {
        const start_time = adTime[0].slice(0, 19);
        const end_time = adTime[1].slice(0, 19);
        // set url here
        axiosInstance.get(`/api/main/hourly/?start_time=${start_time}&end_time=${end_time}&zone_id=${zone.id}`)
        .then((response) => {
          if (response.data.status !== "1") {
            throw new Error("Can't fetch data for Line Graph now!");
          }
          data = response.data.data[zone.id].detail;
          
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
          setImpressionData(processedData);
        }).catch((error) => {
          console.log(error);
        });
      }
    };


    updateData();

  }, []);
  // bar chart
  useEffect(() => {
    const updateData = async () => {
      let data = {};

      // axios
      // // .get(`http://127.0.0.1:8000/main/zones/${zone.id}`)
      // .get(`${import.meta.env.VITE_APP_API_BASE_URL}main/zones/${zone.id}`)
      // .then((response) => {
      //   if (response.data.status !== "1") {
      //     throw new Error("Can't fetch data for business now!");
      //   }
      //   data = response.data.data[String(zone.id)].detail[0];
      // })
      // .catch((error) => {
      //   console.error(error);
      // });

      data = generateAdTimeDataForSingleZone().data[String(zone.id)].detail[0];//test data

      setTotalBusiness(data.total_business);

      const categoriesData = BIG_CATE.map((category) => data[category]);
      
      setBusinessData(getBarData(
        {
          arr: categoriesData,
          label: zone.properties.name
        })
      );
    };
    updateData();

  }, []);

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
          {/* <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', zone)} options={getLineOptions(adTimeMode ? 'Ad' : 'Real', zone)} /> */}
          <Line data={getLineData(adTimeMode ? 'Ad' : 'Real', impressionData)} options={getLineOptions(adTimeMode ? 'Ad' : 'Real', impressionData)} />
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
