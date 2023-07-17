// import React, { useState } from 'react';

// function FunctionModule() {
//   const [filtersVisible, setFiltersVisible] = useState(false);

//   return (
//     <div className='function-module'>
//       <button onClick={() => setFiltersVisible(!filtersVisible)}>
//         Filters
//       </button>
//       <input type="text" placeholder="Search..." />
//       {filtersVisible && (
//         <div>
//           <p>conditions here...</p>
//         </div>
//       )}
      
//     </div>
//   );
// }

// export default FunctionModule;

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultiSelect from './MultiSelect';
import RangeSlider from './RangeSlider';
import TimeControl from './TimeControl';
import SearchBar from './SearchBar';
import { Box, Button, Container, Grid, Slider } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import DateTimeSelect from './DateTimeSelect';

function FunctionModule( {filters, setFilters}) {
  // set hooks

  const [tempFilters, setTempFilters] = useState({});
  const [reset, setReset] = useState(false)
  // const [realTime, setRealTime] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(false);


  console.log("tempFilters in functionModule:", tempFilters);
  // handle events
  const handleReset = () => {
    setReset(prevReset => !prevReset);  // Toggle the value of reset
  }

  const handleApplyClick = () => {//map doesn't refresh？
    const requestBody = tempFilters;
    setFilters(requestBody);//need to refresh map even the filters are the same. (or cancel selected zone)
    console.log('POST request body:', requestBody);
    setAccordionExpanded(false);
  };
  const handleAccordionChange = (event, isExpanded) => {
    setAccordionExpanded(isExpanded);
  };

  return (
    <div className='function-module'>
      <Accordion expanded={accordionExpanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon /> } sx={{bgcolor: "#32435f", color: "white"}}>
          <Typography>Filters for Zones</Typography>
        </AccordionSummary>
        <AccordionDetails>  
          <MultiSelect setTempFilters={setTempFilters} reset={reset}/>

          <Typography variant='subtitle2'>Busiess Included:</Typography>
          <Grid container>
            <Grid item xs={4}>
              <RangeSlider label={'Schools'} setTempFilters={setTempFilters} reset={reset}/>
            </Grid>
            <Grid item xs={4}>
              <RangeSlider label={'Cafe'} setTempFilters={setTempFilters} reset={reset}/>
            </Grid>
          </Grid>

          <Typography variant='subtitle2'>Target Customers:</Typography>
          <Grid container>
            <Grid item xs={4}>
              <RangeSlider label={'Age'} setTempFilters={setTempFilters} reset={reset}/>
            </Grid>
            <Grid item xs={4}>
              <RangeSlider label={'Income'} setTempFilters={setTempFilters} reset={reset}/>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={handleReset}>Reset</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<CheckIcon />} onClick={handleApplyClick}>Apply</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid container justifyContent="flex-start" spacing={15}>
        <Grid item>
          <SearchBar />
          {/* <TimeControl /> */}
        </Grid>
        <Grid item>
          {/* <SearchBar /> */}
          <TimeControl />
        </Grid>
      </Grid>
    </div>
  );
}

export default FunctionModule;