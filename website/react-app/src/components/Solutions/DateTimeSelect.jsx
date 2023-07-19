import {React, useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack, Typography } from '@mui/material';

export default function DateTimeSelect() {
  const [dateTimeStart, setDateTimeStart] = useState('');
  const [dateTimeEnd, setDateTimeEnd] = useState('');
  
  const style = {
    border: '1px solid #ccc', 
    borderRadius: '10px', 
    'fontSize': '12px',
    'backgroundColor': 'white',
    width: "20",
    padding: "0.5em"

  }
    
  return (
    <div className='datetime-select'>

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            label="Start DateTime"
            slotProps={{ textField: { size: 'small' } }}
        />
        </LocalizationProvider> */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="End DateTime"
                slotProps={{ textField: { size: 'small' } }}
            />
        </LocalizationProvider> */}
            {/* <input
              type="datetime-local"
              value={dateTimeStart}
              onChange={(e) => setDateTimeStart(e.target.value)}
              className="map-form-input"
            /> */}
            {/* <Stack spacing={1} direction="row"> */}
              <input
                type="datetime-local"
                value={dateTimeStart}
                onChange={(e) => setDateTimeStart(e.target.value)}
                className="map-form-input"
                style={style}
              />
              <span>-</span>
              <input
                type="datetime-local"
                value={dateTimeEnd}
                onChange={(e) => setDateTimeEnd(e.target.value)}
                className="map-form-input"
                style={style}
              />
            {/* </Stack> */}

    </div>
  );
}
