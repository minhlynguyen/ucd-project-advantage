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


  console.log("tempFilters in functionModule:", tempFilters);
  // handle events
  const handleReset = () => {
    setReset(prevReset => !prevReset);  // Toggle the value of reset
  }

  const handleApplyClick = () => {//??????没刷新地图？
    const requestBody = tempFilters;
    setFilters(requestBody);//就算条件没变，地图也需要刷新
    console.log('POST request body:', requestBody);
  };

  // return component
//   return (
//     <div className='function-module'>
//       <button onClick={handleToggleFilterClick}>
//         {filtersVisible ? 'Hide Filters' : 'Show Filters'}
//       </button>
//       <button>Compare</button>
//       <button>Saved</button>
//       <input type="text" placeholder="Search..." onChange={handleSearch} />
//       <button>Search</button>
//       {filtersVisible && (
//         <div>
//           <label>
//             Income Range:
//             <input type="text" value={incomeRange} onChange={handleIncomeRangeChange} />
//           </label>
//           <label>
//             Merchant Count Range:
//             <input type="text" value={merchantCountRange} onChange={handleMerchantCountRangeChange} />
//           </label>
//           <label>
//             Start Time:
//             <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
//           </label>
//           <label>
//             End Time:
//             <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
//           </label>
//           {Object.entries(includedBusinesses).map(([businessType, { included, min, max }]) => (
//             <div key={businessType}>
//               <label>
//                 {businessType} Included:
//                 <input type="checkbox" checked={included} onChange={event => handleIncludedBusinessesChange(businessType, event.target.checked, min, max)} />
//               </label>
//               {included && (
//                 <>
//                   <label>
//                     {businessType} Min:
//                     <input type="number" value={min} onChange={event => handleIncludedBusinessesChange(businessType, included, event.target.value, max)} />
//                   </label>
//                   <label>
//                     {businessType} Max:
//                     <input type="number" value={max} onChange={event => handleIncludedBusinessesChange(businessType, included, min, event.target.value)} />
//                   </label>
//                 </>
//               )}
//             </div>
//           ))}
//           <button onClick={handleResetClick}>Reset</button>
//           <button onClick={handleApplyClick}>Apply</button>
//         </div>
//       )}
//     </div>
//   );
  return (
    <div className='function-module'>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{bgcolor: "#32435f", color: "white"}}>
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

      <Grid container justifyContent="flex-start" spacing={10}>
        <Grid item>
          <TimeControl />
        </Grid>
        <Grid item>
          <SearchBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default FunctionModule;
