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

function SolutionsContent() {

  const [filters, setFilters] = useState({});
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
  

  useEffect(() => {
    setSelectedZone(null);
    setIsLoading(true);
    const fetchData = async () => {
      console.log("filters are:", filters);
      //logic to wrap filters in request
      // const url = "./data.json";
      // const url = "./map-initialising.json";
      const url = "http://127.0.0.1:8000/main/zones";
      const response = await axios.get(url);
      const data = JSON.parse(response.data.data);
      setFilteredZones(data);
      setIsLoading(false);
    }
    fetchData();
  }, [filters]);

  // // Fetch data for initialising
  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     // const url = "./data.json";
  //     const url = "./map-initialising.json";
  //     // const url = "http://127.0.0.1:8000/main/zones";
  //     const response = await axios.get(url);
  //     const data = JSON.parse(response.data.data);

  //     // process data to the format I want here....

  //     allZonesRef.current = data;
  //     setIsLoading(false);

  //   }
  //   fetchData();
  // }, []);

  // // Filter data according to borough and calculate valid impression according to target customers
  // useEffect(() => {

  //   setSelectedZone(null);

  //   const filter_borough = filters.boroughs; // use borough name to match
  //   const filter_age = filters.Age; // e.g. [1, 2, 3] reps the first 3 age range
  //   const filter_income = filters.Income; // e.g. [1, 2, 3] reps the first 3 income range
  //   // Filter data according to borough
  //   let filteredGeojson = {
  //       ...allZonesRef.current,
  //       features: allZonesRef.current.features.filter(feature => {
  //           return filter_borough.includes(feature.properties.borough);
  //       })
  //   };
  //   // Calculate valid impression according to target customers
  //   // get the valid percentage for each feature
  //   // change valid value
  //   // ...

  //   setFilteredZones(filteredGeojson);
  // }, [filters, allZonesRef.current]);

  // // chnage allZones when time range change (ad time)
  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     // url for updating impression in allZones for ad time
  //     const url = "";
  //     const response = await axios.get(url);
  //     const data = JSON.parse(response.data.data);

  //     // process data to the format I want here....
  //     // change the impression in ad time field
  //     // ...

  //     allZonesRef.current = data;
  //     setIsLoading(false);

  //   }

  // }, [adTime]);






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
    <div className="solutions-content">
      {/* <FunctionModule filters={filters} setFilters={setFilters} /> */}
      <FunctionModule filters={filters} setFilters={setFilters} setAdTimeMode={setAdTimeMode} adTimeMode={adTimeMode} setAdTime={setAdTime} adTime={adTime}/>
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
  );
};

export default SolutionsContent;


