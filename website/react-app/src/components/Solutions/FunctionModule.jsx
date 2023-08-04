import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultiSelect from './MultiSelect';
import RangeSlider from './RangeSlider';
import TimeControl from './TimeControl';
import { Box, Button, Container, Grid, Slider, Stack } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import DateTimeSelect from './DateTimeSelect';

function FunctionModule( {filters, setFilters }) {
  // set hooks
  const [tempFilters, setTempFilters] = useState({});// change when free, it should be ref not state
  const [reset, setReset] = useState(false)
  // const [realTime, setRealTime] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  // handle events
  const handleReset = () => {
    setReset(prevReset => !prevReset);  // Toggle the value of reset
  }

  const handleApplyClick = () => {//map doesn't refresh？
    setFilters(tempFilters);//need to refresh map even the filters are the same. (or cancel selected zone)
    setAccordionExpanded(false);
  };
  const handleAccordionChange = (event, isExpanded) => {
    setAccordionExpanded(isExpanded);
  };

  return (
    <div className='function-module'>
      <Accordion expanded={accordionExpanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon /> } sx={{bgcolor: "#32435f"}}>
          <Typography sx={{color: "white"}}>Target Customers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MultiSelect setTempFilters={setTempFilters} reset={reset} type={'boroughs'}/>
          <MultiSelect setTempFilters={setTempFilters} reset={reset} type={'groups'}/>
          <Grid container>
            {/* <Grid item xs={12} md={6} lg={6}>
              <RangeSlider label={'Age'} setTempFilters={setTempFilters} reset={reset}/>
            </Grid> */}
            <Grid item xs={12} md={6} lg={6}>
              <RangeSlider setTempFilters={setTempFilters} reset={reset}/>
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
      <TimeControl/>
    </div>
  );
}

export default FunctionModule;
