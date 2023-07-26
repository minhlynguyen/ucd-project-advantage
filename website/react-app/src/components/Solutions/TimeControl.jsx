// import * as React from 'react';
// import Switch from '@mui/material/Switch';
// import { Slider, Stack, Typography } from '@mui/material';
// import DateTimeSelect from './DateTimeSelect';
// import BasicSwitch from './BasicSwitch';

// export default function TimeControl({setRealTime}) {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//     // setRealTime(!checked);
//   };

//   return (
//     <Stack direction="row" spacing={1} alignItems="center">
//         <Typography variant='body2'>Real time</Typography>
//         <Switch
//         checked={checked}
//         onChange={handleChange}
//         inputProps={{ 'aria-label': 'controlled' }}
//         />
//         <Typography variant='body2'>Ad time :</Typography>
//         <span>   </span>
//         {checked ? 
//           <DateTimeSelect /> :
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant='body2'>0</Typography>
//             <Slider max={23} min={0} sx={{ width: 300 }} size="small" defaultValue={7} aria-label="Small" valueLabelDisplay="auto" />
//             <Typography variant='body2'>24h</Typography>
//           </Stack> }
//     </Stack>
//   );
// }

import React, { useContext } from 'react';
import Switch from '@mui/material/Switch';
import { Slider, Stack, Typography } from '@mui/material';
import DateTimeSelect from './DateTimeSelect';
import BasicSwitch from './BasicSwitch';
import SolutionsContext from './SolutionsContext';
import { formatTimeWithOffset } from '../../utils/dateTimeUtils';


export default function TimeControl() {

  const { realTime, setRealTime, adTimeMode, setAdTimeMode } = useContext(SolutionsContext);
  const [sliderValue, setSliderValue] = React.useState(new Date(realTime).getHours());

  const handleModeChange = (event) => {
    setAdTimeMode(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    const newRealTime = formatTimeWithOffset(new Date(realTime), newValue);
    setRealTime(newRealTime);
    setSliderValue(newValue);
    console.log("newRealTime when Slider change:", newRealTime);
  };

  console.log("initial real time: ", realTime);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant='body2'>Real time</Typography>
        <Switch
        checked={adTimeMode}
        onChange={handleModeChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='body2'>Ad time :</Typography>
        <span>   </span>
        {adTimeMode ? 
          <DateTimeSelect/> :
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant='body2'>0</Typography>
            <Slider 
              max={23} 
              min={0} 
              sx={{ width: 300 }} 
              size="small" 
              defaultValue={sliderValue} 
              value={sliderValue}
              onChange={handleSliderChange}
              aria-label="Small" 
              valueLabelDisplay="auto" 
            />
            <Typography variant='body2'>24h</Typography>
          </Stack> 
        }
    </Stack>
  );
}
