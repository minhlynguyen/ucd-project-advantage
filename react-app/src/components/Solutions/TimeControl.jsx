import React, { useContext } from 'react';
import Switch from '@mui/material/Switch';
import { Box, Slider, Stack, Typography, Tooltip } from '@mui/material';
import DateTimeSelect from './DateTimeSelect';
import SolutionsContext from './SolutionsContext';
import { setHourInTimeString, getNYCHourFromTimeString, getCurrentTimeInNY } from '../../utils/dateTimeUtils';
import InfoIcon from '@mui/icons-material/Info';

export default function TimeControl() {

  const { realTime, setRealTime, adTimeMode, setAdTimeMode } = useContext(SolutionsContext);
  const [sliderValue, setSliderValue] = React.useState(getNYCHourFromTimeString(realTime));

  const handleModeChange = (event) => {
    setAdTimeMode(event.target.checked);
  };

  // when slider value changed, convert to NYC time and set as realtime
  const handleSliderChange = (event, newValue) => {
    const newRealTime = setHourInTimeString(getCurrentTimeInNY(), newValue);
    setRealTime(newRealTime);
    setSliderValue(newValue);
  };

  return (
    <div className='time-control' style={{marginTop: '5px'}}>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center" >

        <Box display="flex" alignItems="center">
        <Typography variant='body2'>(NYC</Typography>
        <Tooltip title="All the time on our website is NYC time">
        <InfoIcon fontSize='small' color='primary'/>
        </Tooltip>
        
        <Typography variant='body2'>) Real time</Typography>
        <Switch
        checked={adTimeMode}
        onChange={handleModeChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='body2'>Ad time</Typography>
        <span>:   </span>
        </Box>

        {adTimeMode ? 
          <DateTimeSelect/> :
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant='body2'>0</Typography>
            <Slider 
              max={23} 
              min={0} 
              sx={{ width: '200px' }} 
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
    </div>
  );
}
