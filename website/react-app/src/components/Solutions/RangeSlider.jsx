import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export default function RangeSlider({ label, setTempFilters, reset}) {
    const defaultValue = [0, 10];
    const [value, setValue] = useState(defaultValue);

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
    }, [reset]);

    return (
        <Box sx={{ width: 300 }}>
            <Typography variant='body2'>{label}({value[0]} - {value[1]})</Typography>
            <Slider
                max={10} min={0}
                getAriaLabel={() => {label}}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                size='small'
            />
        </Box>
        
    );
}