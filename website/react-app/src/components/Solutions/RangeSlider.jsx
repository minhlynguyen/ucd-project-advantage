import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export default function RangeSlider({ setTempFilters, reset}) {

    // const defaultValue = [0, 2000];
    const defaultValue = [0, 100000];
    const [value, setValue] = useState(defaultValue);
    const label = 'income';

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTempFilters(prevFilters => ({
            ...prevFilters,
            [label]: newValue
        }));
    };

    useEffect(() => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            [label]: value
        }));
    }, []);

    useEffect(() => {
        setValue(defaultValue);
        setTempFilters(prevFilters => ({
            ...prevFilters,
            [label]: defaultValue
          }));
    }, [reset]);

    return (
        <Box
        sx={{
            width: {
              xs: '100%', 
              sm: '75%',  
              md: '50%',  
              lg: '50%',  
            },
          }}
        >
            <Typography variant='body2'>
                {"Median income"}({`$${value[0]}`} - {value[1] === defaultValue[1] ? 'Any' : `$${value[1]}`})
            </Typography>
            <Slider
                max={defaultValue[1]} min={defaultValue[0]}
                getAriaLabel={() => {label}}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                size='small'
                valueLabelFormat={(value) => `$${value}`}
            />
        </Box>
    );
}
