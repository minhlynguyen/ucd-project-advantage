// import React, { useEffect, useRef, useState } from 'react';
// import './SolutionsContent.css';
// import FunctionModule from './FunctionModule';
// import MapModule from './MapModule';
// import InfoModule from './InfoModule';
// import axios from 'axios';
// // import { Box, Fab } from '@mui/material';
// import { Box, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/system';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import DifferenceIcon from '@mui/icons-material/Difference';
// import CompareBoard from '../Compare/CompareBoard';
// import ZoneBoard from '../Cards/ZoneBoard';

// function SolutionsContent() {

//   const [filters, setFilters] = useState({});
//   const [filteredZones, setFilteredZones] = useState({});
//   const [selectedZone, setSelectedZone] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [openDialog, setOpenDialog] = useState(false); // compare dialog
//   const [openZoneBoard, setOpenZoneBoard] = useState(false); // zone board dialog
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const allZonesRef = useRef(null);
//   const [adTime, setAdTime] = useState({});
//   const [adTimeMode, setAdTimeMode] = useState(false);
  

//   useEffect(() => {
//     setSelectedZone(null);
//     setIsLoading(true);
//     const fetchData = async () => {
//       console.log("filters are:", filters);
//       //logic to wrap filters in request
//       // const url = "./data.json";
//       const url = "./map-initialising.json";
//       // const url = "http://127.0.0.1:8000/main/zones";
//       const response = await axios.get(url);
//       const data = JSON.parse(response.data.data);
//       setFilteredZones(data);
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [filters]);

//   // // Fetch data for initialising
//   // useEffect(() => {
//   //   setIsLoading(true);
//   //   const fetchData = async () => {
//   //     // const url = "./data.json";
//   //     const url = "./map-initialising.json";
//   //     // const url = "http://127.0.0.1:8000/main/zones";
//   //     const response = await axios.get(url);
//   //     const data = JSON.parse(response.data.data);

//   //     // process data to the format I want here....

//   //     allZonesRef.current = data;
//   //     setIsLoading(false);

//   //   }
//   //   fetchData();
//   // }, []);

//   // // Filter data according to borough and calculate valid impression according to target customers
//   // useEffect(() => {

//   //   setSelectedZone(null);

//   //   const filter_borough = filters.boroughs; // use borough name to match
//   //   const filter_age = filters.Age; // e.g. [1, 2, 3] reps the first 3 age range
//   //   const filter_income = filters.Income; // e.g. [1, 2, 3] reps the first 3 income range
//   //   // Filter data according to borough
//   //   let filteredGeojson = {
//   //       ...allZonesRef.current,
//   //       features: allZonesRef.current.features.filter(feature => {
//   //           return filter_borough.includes(feature.properties.borough);
//   //       })
//   //   };
//   //   // Calculate valid impression according to target customers
//   //   // get the valid percentage for each feature
//   //   // change valid value
//   //   // ...

//   //   setFilteredZones(filteredGeojson);
//   // }, [filters, allZonesRef.current]);

//   // // chnage allZones when time range change (ad time)
//   // useEffect(() => {
//   //   setIsLoading(true);
//   //   const fetchData = async () => {
//   //     // url for updating impression in allZones for ad time
//   //     const url = "";
//   //     const response = await axios.get(url);
//   //     const data = JSON.parse(response.data.data);

//   //     // process data to the format I want here....
//   //     // change the impression in ad time field
//   //     // ...

//   //     allZonesRef.current = data;
//   //     setIsLoading(false);

//   //   }

//   // }, [adTime]);






//   const handleClickLikeFab = () => {

//     const currentURL = window.location.href;
//     const urlObject = new URL(currentURL);
//     const likeUrl = new URL('/saved', urlObject);
//     window.open(likeUrl, '_blank');
//   }

//   const handleClickDifference = () => {
//     setOpenDialog(true);
//   }

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   }

//   const handleClickMore = () => {
//     setOpenZoneBoard(true);
//   }

//   const handleCloseZoneBoard = () => {
//     setOpenZoneBoard(false);
//   }

//   return (
//     <div className="solutions-content">
//       <FunctionModule filters={filters} setFilters={setFilters} />
//       {/* <FunctionModule filters={filters} setFilters={setFilters} setAdTimeMode={setAdTimeMode} adTimeMode={adTimeMode}/> */}
//       <div className="map-info-container">
//         <MapModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading}/>
//         <InfoModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading} handleClickMore={handleClickMore}/>
//       </div>
//       <Box className='floating-button'>
//         <Fab color="primary" aria-label="compare" onClick={handleClickDifference}>
//           <DifferenceIcon />
//         </Fab>
//         <Fab color='secondary' aria-label="like" onClick={handleClickLikeFab}>
//           <FavoriteIcon />
//         </Fab>
//       </Box>

//       <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={fullScreen} maxWidth='lg'>
//         <DialogTitle>Compare Board</DialogTitle>
//         <DialogContent>
//           <CompareBoard />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openZoneBoard} onClose={handleCloseZoneBoard} fullScreen={fullScreen} maxWidth='lg'>
//         <DialogTitle>Zone Board</DialogTitle>
//         <DialogContent>
//           <ZoneBoard />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseZoneBoard}>Close</Button>
//         </DialogActions>
//       </Dialog>


//     </div>
//   );
// };

// export default SolutionsContent;


import React, { useEffect, useRef, useState } from 'react';
import './SolutionsContent.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';
import axios from 'axios';
// import { Box, Fab } from '@mui/material';
import { Box, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import CompareBoard from '../Compare/CompareBoard';
import ZoneBoard from '../Cards/ZoneBoard';
import { ALL_BOROUGHS, ALL_AGES, ALL_INCOMES } from '../../constants';
import SolutionsContext from './SolutionsContext';
import { getCurrentTimeInNY } from '../../utils/dateTimeUtils';
import mapGeomData from "./map-initialising.json";

function SolutionsContent() {

  const [filters, setFilters] = useState({boroughs: ALL_BOROUGHS.map(borough => borough.name), Age: ALL_AGES.map(age => age.id), Income: ALL_INCOMES.map(income => income.id)});
  console.log("filters111", filters);
  const [filteredZones, setFilteredZones] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // compare dialog
  const [openZoneBoard, setOpenZoneBoard] = useState(false); // zone board dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const allZonesRef = useRef(null);
  const [adTime, setAdTime] = useState(['', '']);
  const [adTimeMode, setAdTimeMode] = useState(false);
  // Set the initial state using the current time in New York
  const [realTime, setRealTime] = useState(getCurrentTimeInNY()); // the choosen time in real time Slider 
  

// Fetch data for initialising
useEffect(() => {
  console.log("UseEffect: Fetch data for initialising");
  setIsLoading(true);

  const fetchData = async () => {
    try {

      const url = "http://127.0.0.1:8000/main/zones/data";
      // const url = "./zones_data.json";

      const response = await axios.get(url);
      // if (response.status !== 201 || response.data.status === 2) {
      //   throw new Error("Can't fetch data for map initialising now!");
      // }
      if (response.status !== 201 && response.status !== 304 && response.status !== 200 || response.data.status === 2) {
        throw new Error("Can't fetch data for map initialising now!");
      }
      

      const data1 = JSON.parse(mapGeomData.data);
      const data2 = response.data.data;

      const zoneDetailMap = {};
      for(let key in data2) {
        zoneDetailMap[Number(key)] = data2[key].detail.map(detail => {
          return {
            time: detail.datetime,
            value: detail.impression_history
          }
        });
      }

      const processedData = data1.features.map(feature => {
        const id = feature.properties.pk;
        const detail = zoneDetailMap[id] || []; 
        const totalValue = detail.reduce((sum, current) => sum + current.value, 0);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            age: ['20%', '50%', '30%'],
            income: ['20%', '50%', '30%'],
            impression: {
              realTime: {
                totalValue,
                items: detail,
              },
              adTime: {
                totalValue,
                items: [...detail],
              }
            }
          }
        }
      });

      const processedGeojson = {
        type: "FeatureCollection",
        crs: {type: "name", properties: {name: "EPSG:4326"}},
        features: processedData
      };

      allZonesRef.current = processedGeojson;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, []);

// Change filteredZones when filters, allZoneRef, realTime, adTimeMode change
useEffect(() => {
  console.log("UseEffect: Change filteredZones when filters, allZoneRef, realTime, adTimeMode change");
  console.log("filters", filters);
  console.log("adTimeMode:", adTimeMode);
  console.log("realTime:", realTime);
  console.log("allZonesRef:",allZonesRef);

  // If data has not been loaded, return early to avoid errors
  if (!allZonesRef.current) {
    return;
  }

  setSelectedZone(null);

  // filters for test
  // const filter_borough = ['Queens']; // use borough name to match
  // const filter_age = [0, 1]; // e.g. [1, 2, 3] reps the first 3 age range
  // const filter_income = [0, 1]; // e.g. [1, 2, 3] reps the first 3 income range
  // real filters
  const filter_borough = filters.boroughs; // use borough name to match
  const filter_age = filters.Age; // e.g. [1, 2, 3] reps the first 3 age range
  const filter_income = filters.Income; // e.g. [1, 2, 3] reps the first 3 income range

  // Filter data according to borough
  let filteredFeatures = allZonesRef.current.features.filter(feature => {
    return filter_borough.includes(feature.properties.borough);
  });

  // Calculate valid impression according to target customers
  // get the valid percentage for each feature
  filteredFeatures = filteredFeatures.map(feature => {
    // Convert age and income percentages to number
    const agePercentages = feature.properties.age.map(item => parseFloat(item) / 100);
    const incomePercentages = feature.properties.income.map(item => parseFloat(item) / 100);

    // Calculate valid age and income percentages
    const validAgePercentage = filter_age.reduce((sum, age) => sum + agePercentages[age], 0);
    const validIncomePercentage = filter_income.reduce((sum, income) => sum + incomePercentages[income], 0);

    // Calculate total valid percentage
    const validPercentage = validAgePercentage * validIncomePercentage;

    // Define function to calculate valid impression
    const calculateValidImpression = (impression) => {
      const totalValidValue = parseFloat((validPercentage * impression.totalValue).toFixed(2));
      const validItems = impression.items.map(item => ({
        ...item,
        validValue: parseFloat((validPercentage * item.value).toFixed(2))
      }));
      return {
        ...impression,
        totalValidValue,
        items: validItems
      };
    };

    // Calculate valid impressions for realTime and adTime
    const realTimeImpression = calculateValidImpression(feature.properties.impression.realTime);
    const adTimeImpression = calculateValidImpression(feature.properties.impression.adTime);

    // Calculate display impression
    let displayTotal, displayValid;
    if (adTimeMode) {
      displayTotal = adTimeImpression.totalValue;
      displayValid = adTimeImpression.totalValidValue;
    } else {
      const realTimeItem = realTimeImpression.items.find(item => item.time === '2023-04-30T22:00:00-04:00');
      // const realTimeItem = realTimeImpression.items.find(item => item.time === realTime);
      if (realTimeItem) {
        displayTotal = realTimeItem.value;
        displayValid = realTimeItem.validValue;
      }
    }

    return {
      ...feature,
      properties: {
        ...feature.properties,
        impression: {
          realTime: realTimeImpression,
          adTime: adTimeImpression,
          display: {
            total: displayTotal || 0,
            valid: displayValid || 0,
          }
        }
      }
    };
  });

  // Create new GeoJSON
  const filteredGeojson = {
    ...allZonesRef.current,
    features: filteredFeatures
  };
  console.log("filteredGeojson:", filteredGeojson);

  setFilteredZones(filteredGeojson);
}, [filters, allZonesRef.current, adTimeMode, realTime]);


  // Change allZonesRef when adTime change
  // fetch data to chnage allZones (impression.adTime) when time range change (ad time)
  useEffect(() => {
    console.log("UseEffect:Change allZonesRef when adTime change");
    console.log("adTime:", adTime);
    // setIsLoading(true);
    // const fetchData = async () => {
    //   // url for updating impression in allZones for ad time
    //   const url = "";
    //   const response = await axios.get(url);
    //   const data = JSON.parse(response.data.data);

    //   // process data to the format I want here....
    //   // change the impression in ad time field
    //   // ...

    //   allZonesRef.current = data;
    //   setIsLoading(false);

    // }

  }, [adTime]);

  const handleClickLikeFab = () => {

    const currentURL = window.location.href;
    const urlObject = new URL(currentURL);
    const likeUrl = new URL('/saved', urlObject);
    window.open(likeUrl, '_blank');
  }

  const handleClickDifference = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleClickMore = () => {
    setOpenZoneBoard(true);
  }

  const handleCloseZoneBoard = () => {
    setOpenZoneBoard(false);
  }

  return (
    <SolutionsContext.Provider value={{ realTime, setRealTime, adTime, setAdTime, adTimeMode, setAdTimeMode }}>
      <div className="solutions-content">
        <FunctionModule filters={filters} setFilters={setFilters}/>
        <div className="map-info-container">
          <MapModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading}/>
          <InfoModule zones={filteredZones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isLoading={isLoading} handleClickMore={handleClickMore}/>
        </div>
        <Box className='floating-button'>
          <Fab color="primary" aria-label="compare" onClick={handleClickDifference}>
            <DifferenceIcon />
          </Fab>
          <Fab color='secondary' aria-label="like" onClick={handleClickLikeFab}>
            <FavoriteIcon />
          </Fab>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={fullScreen} maxWidth='lg'>
          <DialogTitle>Compare Board</DialogTitle>
          <DialogContent>
            <CompareBoard />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openZoneBoard} onClose={handleCloseZoneBoard} fullScreen={fullScreen} maxWidth='lg'>
          <DialogTitle>Zone Board</DialogTitle>
          <DialogContent>
            <ZoneBoard />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseZoneBoard}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </SolutionsContext.Provider>
  );
};

export default SolutionsContent;


