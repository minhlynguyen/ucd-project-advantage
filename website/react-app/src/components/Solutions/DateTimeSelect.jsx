import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Typography } from '@mui/material';

export default function DateTimeSelect() {
    
  return (
    <div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            label="Start DateTime"
            slotProps={{ textField: { size: 'small' } }}
        />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="End DateTime"
                slotProps={{ textField: { size: 'small' } }}
            />
        </LocalizationProvider>


    </div>
  );
}
