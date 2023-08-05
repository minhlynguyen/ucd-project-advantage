import React, { useEffect, useRef, useState } from 'react';
import './SolutionsContent.css';
import FunctionModule from './FunctionModule';
import MapModule from './MapModule';
import InfoModule from './InfoModule';
import axios from 'axios';
import { Box, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useMediaQuery, Badge, Snackbar, Grid, Tooltip } from '@mui/material';
import { useTheme } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DifferenceIcon from '@mui/icons-material/Difference';
import CompareBoard from '../Compare/CompareBoard';
import ZoneBoard from '../Cards/ZoneBoard';
import { ALL_BOROUGHS, ALL_AGES } from '../../constants';
import SolutionsContext from './SolutionsContext';
import { getCurrentTimeInNY } from '../../utils/dateTimeUtils';
import axiosInstance from '../../AxiosConfig';
import { generateAdTimeData, generateAllCollection } from '../../utils/testDataGenerator';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const uiTheme = createTheme({
  palette: {
    secondary: {
      main: '#f50057',
    },
  },
});



function SolutionsContent() {

  const [filters, setFilters] = 
    useState({
      boroughs: ALL_BOROUGHS.map(borough => borough.name), 
      groups: ALL_AGES.map(age => age.id), 
      income: [0, Infinity]
    }); //init filters
  const [filteredZones, setFilteredZones] = useState({});// data shown in map and info module
  const [selectedZone, setSelectedZone] = useState(null);// selected zone (feature)
  const [isLoading, setIsLoading] = useState(true);// control the loading state
  const [openCompareBoard, setOpenCompareBoard] = useState(false); // compare dialog
  const [openZoneBoard, setOpenZoneBoard] = useState(null); // zone board dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [allZones, setAllZones] = useState(null);// data saved to be fastly filtered
  const [adTime, setAdTime] = useState(['', '']);
  const [adTimeMode, setAdTimeMode] = useState(false);
  // Set the initial state using the current time in New York
  const [realTime, setRealTime] = useState(getCurrentTimeInNY()); // the choosen time in real time Slider
  const [compareZones, setCompareZones] = useState([null, null]);// zones selected to be compared
  const [impressionMap, setImpressionMap] = useState({});// impression data
  const [ageMap, setAgeMap] = useState({}); // census data
  const [data_GEOM, setData_GEOM] = useState(null); // GEOM data
  const [isFetchingImpression, setIsFetchingImpression] = useState(false);
  const [isFetchingCensus, setIsFetchingCensus] = useState(false);
  const [isFetchingGEOM, setIsFetchingGEOM] = useState(false);
  const [isFetchingAdTimeData, setIsFetchingAdTimeData] = useState(false);
  const [collection, setCollection] = useState([]);//list of zones that user saved

  // fetch impression data
  useEffect(()=>{
    const fetchData = async () => {
      setIsFetchingImpression(true);
      // !!!!!!remove the baseURL if use axiosInstance
      // const url = `${import.meta.env.VITE_APP_API_BASE_URL}/main/zones/data/`;//24h impression and business data
      const url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/main/today/`;//24h impression and business data
      // axiosInstance.get(url).then((response) => {
      axios.get(url, { timeout: 60000 }).then((response) => {
        if (response.data.status === "2") {
          throw new Error("Can't fetch impression data from DB now!");
        }
        const data_24h = response.data.data;
        const map = {};
        for(let key in data_24h) {
          map[Number(key)] = data_24h[key].detail.map(detail => {
            return {
              time: detail.datetime,
              value: detail.impression_predict || 0 // if detail has no impression_predict or impression_predict is null, let it be 0
            }
          });
        }
        setImpressionMap(map);
      }).catch((error) => {
        // console.log("Error:", error);
        if (error.code === 'ECONNABORTED') {
          console.log("Request timed out");
        } else {
          console.log("Error:", error);
        }
      }).finally (() => {
        setIsFetchingImpression(false);
      });

    };
    fetchData();
  },[]);

  // fetch census data
  useEffect(()=>{
    const fetchData = async () => {
      setIsFetchingCensus(true);
      // const url = `${import.meta.env.VITE_APP_API_BASE_URL}/main/zones/`;//census data
      const url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/main/census/`;//census data
      // axiosInstance.get(url).then((response) => {
      axios.get(url).then((response) => {
        if (response.data.status === "2") {
          throw new Error("Can't fetch census data from DB now!");
        }
        const data_census = response.data.data;
        const map = {};
        for (let key in data_census) {
          map[Number(key)] = {
            main_group: data_census[key].main_group,
            median_income: data_census[key].median_income,
            percentages: ALL_AGES.map(ageGroup => data_census[key][ageGroup.name_backend])
          };
        }
        setAgeMap(map);
      }).catch((error) => {
        console.log("Error:", error);
      }).finally (() => {
        setIsFetchingCensus(false);
      });

    };
    fetchData();
  },[]);

  // fetch GEOM data
  useEffect(()=>{
    const fetchData = async () => {
      setIsFetchingGEOM(true);
      const url = "./map-initialising.json";
      // axiosInstance.get(url).then((response) => {
      axios.get(url).then((response) => {
        const data = JSON.parse(response.data.data);
        setData_GEOM(data);
      }).catch((error) => {
        console.log("Error: Can't fetch GEOM data from DB now!", error);
      }).finally (() => {
        setIsFetchingGEOM(false);
      });
    };
    fetchData();
  },[]);  

  //update loading state
  useEffect(() => {
    const loadingState = isFetchingImpression || isFetchingCensus || isFetchingGEOM || isFetchingAdTimeData;
    setIsLoading(loadingState);

  }, [isFetchingImpression, isFetchingCensus, isFetchingGEOM, isFetchingAdTimeData]);

  // Process data to get allZones
  useEffect(() => {
    // console.log("UseEffect: Fetch data for initialising");
    if (!data_GEOM) {
      return;
    }
    const updateData = () => {
      try {
          const processedData = data_GEOM.features.map(feature => {
          const id = feature.properties.pk;
          const detail = impressionMap[id] || []; 
          const totalValue = detail.reduce((sum, current) => sum + current.value, 0);
          const ageDistributionArray = ageMap[id] ? ageMap[id].percentages : [];// if no census data, let it be empty list
          const median_income = ageMap[id] ? (ageMap[id].median_income ? ageMap[id].median_income.toFixed(0) : null) : null;
          const mode_group = ageMap[id] ? ageMap[id].main_group : null; 
          return {
            ...feature,
            properties: {
              ...feature.properties,
              age: ageDistributionArray,// age: [7, 5, 4, 6, 5, 4, 6, 5, 4, 5, 7, 6, 4, 5, 5, 4, 6, 4, 5, 6]
              average_income: median_income,//change the name later coz it affects other functionalities
              mode_group: mode_group,//'females_25_34'
              impression: {
                realTime: {
                  totalValue,
                  items: detail,
                },
                adTime: {
                  // totalValue,
                  // items: [...detail],
                  totalValue: 0,
                  items: [],
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

        setAllZones(processedGeojson);
      } catch (error) {
        console.error(error);
      };
    };

    updateData();
  }, [impressionMap, ageMap, data_GEOM]);

  // Change filteredZones when filters, allZone, realTime, adTimeMode change
  useEffect(() => {
    console.log("UseEffect: Change filteredZones when filters, allZoneRef, realTime, adTimeMode change");
    console.log("filters", filters);
    console.log("adTimeMode:", adTimeMode);
    console.log("realTime:", realTime);
    console.log("allZones:",allZones);

    if (!allZones) {
      return;
    }

    setSelectedZone(null);

    const filter_borough = filters.boroughs; // use borough name to match
    const filter_age = filters.groups; // e.g. [0, 1, 2] reps the first 3 age-sex range
    const filter_income = filters.income; // e.g. [300, 500] reps the income range

    // Filter zones according to borough
    let filteredFeatures = allZones.features.filter(feature => {
      return filter_borough.includes(feature.properties.borough);
    });

    // Filter zones according to income
    filteredFeatures = filteredFeatures.filter(feature => {
      return ((feature.properties.average_income >= filter_income[0]) && (feature.properties.average_income <= filter_income[1]));
    });

    // Calculate valid impression according to target customers
    // get the valid percentage for each feature
    filteredFeatures = filteredFeatures.map(feature => {

      let validPercentage = 0;
      for (let i = 0; i < filter_age.length; i++) {
        validPercentage += feature.properties.age[filter_age[i]];
      }
      validPercentage = validPercentage / 100;

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
        const realTimeItem = realTimeImpression.items.find(item => item.time === realTime);
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
            },
            targetPerc: validPercentage,
          }
        }
      };
    });

    // Create new structured GeoJSON
    const filteredGeojson = {
      ...allZones,
      features: filteredFeatures
    };
    console.log("filteredGeojson:", filteredGeojson);

    setFilteredZones(filteredGeojson);
  }, [filters, allZones, adTimeMode, realTime]);


  // Change allZonesRef when adTime change
  // fetch data to chnage allZones (impression.adTime) when time range change (ad time)
  useEffect(() => {
    console.log("UseEffect:Change allZonesRef when adTime change");
    console.log("adTime:", adTime);
    if (!adTimeMode) {
      return;
    }
    const updateData = async () => {
      let data = {};
      function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
      }
      if (!arraysEqual(adTime, ['', ''])) {
        // setIsFetchingAdTimeData(true);
        // // set url here
        // axios.post('', {time_range: ''})
        // .then((response) => {
        //   if (response.data.status !== "1") {
        //     throw new Error("Can't fetch impression data for ad time now!");
        //   }
        //   data = JSON.parse(response.data.data);
        // }).catch((error) => {
        //   console.log(error);
        // }).finally(() => {
        //   setIsFetchingAdTimeData(false);
        // });
        data = generateAdTimeData().data;
      }

      // change the total impression in ad time field (the valid impression would be changed in other useEffect automatically since allZones changed)
      const updatedFeatures = allZones.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          impression: {
            ...feature.properties.impression,
            adTime: {
              ...feature.properties.impression.adTime,
              totalValue: data[String(feature.id)] || 0
            }
          }
        }
      }));

      setAllZones({
        ...allZones,
        features: updatedFeatures
      });
    };

    updateData();

  }, [adTime]);

  // fetch collection data
  useEffect(()=>{
    const fetchData = async () => {
      let data = [];

      // axios.get('')
      // .then((response)=> {
      //   if (response.data.status !== "1") {
      //     throw new Error("Can't fetch collection data for current user now!");
      //   }
      //   data = response.data.data;
      // }).catch(error => {
      //   console.log(error);
      // });

      data = generateAllCollection().data;

      setCollection(data.map(zone => zone.zoneID));
      
    };

    fetchData();

  }, []);

  const handleClickLikeFab = () => {
    const currentURL = window.location.href;
    const urlObject = new URL(currentURL);
    const likeUrl = new URL('/saved', urlObject);
    window.open(likeUrl, '_blank');
  };

  const handleClickDifference = () => {
    setOpenCompareBoard(true);
  };

  const handleCloseCompareBoard = () => {
    setOpenCompareBoard(false);
  };

  const handleClickMore = (zone) => {
    console.log("zone:", zone);
    setOpenZoneBoard(zone);
  };  

  const handleCloseZoneBoard = () => {
    setOpenZoneBoard(null);
  };

  const addCollection = (zoneID) => {
    const updateData = async (id) => {

      let isUpdated = false;

      // axios.get('')
      // .then(response => {
      //   if (response.data.status !== "1") {
      //     throw new Error("Failed to add collection!");
      //   }
      //   isUpdated = true;
      // })
      // .catch(error => {
      //   console.log(error);
      // });

      isUpdated = true;

      if (isUpdated) {
        setCollection(prev => [...prev, id]);
        console.log("Collection added succussfully!");
      }

    };
    updateData(zoneID);
  };

  const deleteCollection = (zoneID) => {
    const updateData = async (id) => {

      let isUpdated = false;

      // axios.get('')
      // .then(response => {
      //   if (response.data.status !== "1") {S
      //     throw new Error("Failed to delete collection!");
      //   }
      //   isUpdated = true;
      // })
      // .catch(error => {
      //   console.log(error);
      // });

      isUpdated = true;

      if (isUpdated) {
        setCollection(prev => prev.filter(item => item !== id));
        console.log("Collection removed succussfully!");
      }

    };
    updateData(zoneID);
  };

  return (
    <ThemeProvider theme={uiTheme}>
    <SolutionsContext.Provider 
    value={{ realTime, setRealTime, adTime, setAdTime, adTimeMode, setAdTimeMode, 
    handleClickMore, filteredZones, compareZones, setCompareZones, setOpenCompareBoard,
    collection, addCollection, deleteCollection }}
    >
      <div className="solutions-content">      
        <FunctionModule filters={filters} setFilters={setFilters}/>
        <div className="map-info-container">
          <Grid container>
            <Grid item xs={12} md={12} lg={9}>
              <MapModule 
                zones={filteredZones} 
                selectedZone={selectedZone} 
                setSelectedZone={setSelectedZone}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                style={{ height: isMobile ? '380px' : '750px' }} // change the height based on the screen size
              />

{/* {selectedZone ?
        <div id="mapillary" style={{display: 'block'}}></div> :
        <div id="mapillary" style={{display: 'none'}}></div>
      } */}

            </Grid>
            <Grid item xs={12} md={12} lg={3} style={{ height: isMobile ? 'auto' : '750px' }}>
              <InfoModule 
                zones={filteredZones} 
                selectedZone={selectedZone} 
                setSelectedZone={setSelectedZone} 
                isLoading={isLoading} 
              />
            </Grid>
          </Grid>
        </div>
        <Box className='floating-button'>
          <Tooltip title='Go to compare'>      
          <Fab color="primary" aria-label="compare" onClick={handleClickDifference}>
            <Badge badgeContent={compareZones.filter(zone => zone !== null).length} color="primary">
              <DifferenceIcon />
            </Badge>
          </Fab>
          </Tooltip>
          <Tooltip title='Go to collection'>          
          <Fab color='secondary' aria-label="like" onClick={handleClickLikeFab}>
            <Badge badgeContent={collection.length} color="secondary">
              <FavoriteIcon />
            </Badge>
          </Fab>
          </Tooltip> 
        </Box>
        <Dialog open={openCompareBoard} onClose={handleCloseCompareBoard} fullScreen={fullScreen} maxWidth='lg'>
          <DialogTitle>Compare Board</DialogTitle>
          <DialogContent>
            <CompareBoard />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCompareBoard}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={!!openZoneBoard} onClose={handleCloseZoneBoard} fullScreen={fullScreen} maxWidth='lg'>
          <DialogTitle>Zone Board</DialogTitle>
          <DialogContent>
            {openZoneBoard ? <ZoneBoard zone={openZoneBoard} /> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseZoneBoard}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </SolutionsContext.Provider>
    </ThemeProvider>
  );
};

export default SolutionsContent;


