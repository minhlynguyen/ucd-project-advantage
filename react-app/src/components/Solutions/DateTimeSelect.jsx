import React, { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import SolutionsContext from './SolutionsContext';
import Button from '@mui/material/Button';
import { getTimeString } from '../../utils/dateTimeUtils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { Stack } from '@mui/material';
// Register the plugin
dayjs.extend(minMax);
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { notify } from '../../utils/notify';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '0px', 
          fontSize: '0.9rem'
        },
        inputSizeSmall: {
          padding: '0px',
          fontSize: '0.9rem'
        },
        readOnly:  {
          padding: '0px',
          fontSize: '0.9rem'
        },
        root: {
          padding: '1px 5px',
          paddingRight: '5px'
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '0px', 
        },
      },
    },
    MuiFormLabel : {
      styleOverrides: {
        root : {
          fontSize: '0.9rem',
          lineHeight: '0.7rem'
        }
      },
    }
  },
});


export default function DateTimeSelect() {
  const { adTime, setAdTime } = useContext(SolutionsContext);
  const [startTime, setStartTime] = useState(adTime[0] ? dayjs(adTime[0]) : null);
  const [endTime, setEndTime] = useState(adTime[1] ? dayjs(adTime[1]) : null);

  const handleConfirm = () => {
    if (startTime && endTime) {
      setAdTime([getTimeString(startTime.toDate()), getTimeString(endTime.toDate())]);
      console.log('new ad time:', [
        getTimeString(startTime.toDate()),
        getTimeString(endTime.toDate())
      ]);
    } else {
      console.error('startTime or endTime is not defined');
      notify('startTime or endTime is not defined', 'warn');
    }
  };


  return (
    <ThemeProvider theme={theme}>
    <div className='datetime-select'>
      <Stack direction={{lg: 'row', xs: 'column', md: 'row'}} spacing={1.1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          views={['year', 'month', 'day', 'hours']}
          viewRenderers={{
            hours: renderTimeViewClock
          }}
          label='Start DateTime'
          slotProps={{ textField: { size: 'small' } }}
          value={startTime}
          onChange={setStartTime}

        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          views={['year', 'month', 'day', 'hours']}
          viewRenderers={{
            hours: renderTimeViewClock
          }}
          label='End DateTime'
          slotProps={{ textField: { size: 'small' } }}
          value={endTime}
          onChange={setEndTime}
          minDateTime={startTime}
          maxDateTime={dayjs().add(2, 'month')}
        />
      </LocalizationProvider>
      <Button variant='outlined' onClick={handleConfirm} sx={{ height: '1.6rem', fontSize: '0.9rem', padding: '10px' }}>Confirm</Button>
      </Stack>
    </div>
    </ThemeProvider>
  );
}


