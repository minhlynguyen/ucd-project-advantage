import React, { useContext } from 'react';
import Switch from '@mui/material/Switch';
import { Slider, Stack, Typography } from '@mui/material';
import DateTimeSelect from './DateTimeSelect';
import SolutionsContext from './SolutionsContext';
import { setHourInTimeString, getNYCHourFromTimeString, getCurrentTimeInNY } from '../../utils/dateTimeUtils';


export default function TimeControl() {

  const { realTime, setRealTime, adTimeMode, setAdTimeMode } = useContext(SolutionsContext);
  const [sliderValue, setSliderValue] = React.useState(getNYCHourFromTimeString(realTime));

  const handleModeChange = (event) => {
    setAdTimeMode(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    const newRealTime = setHourInTimeString(getCurrentTimeInNY(), newValue);
    setRealTime(newRealTime);
    setSliderValue(newValue);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{padding:'8px 0'}}>
        <Typography variant='body2'>(NYC) Real time</Typography>
        <Switch
        checked={adTimeMode}
        onChange={handleModeChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='body2'>Ad time</Typography>
        <span>:   </span>
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
