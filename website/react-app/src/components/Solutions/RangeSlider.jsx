import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import {ALL_AGES, ALL_INCOMES} from '../../constants';



// export default function RangeSlider({ label, setTempFilters, reset}) {
//     const defaultValues = {
//         "Age": [0, 3],
//         "Income": [0, 3],
//     };
//     // const defaultValue = [0, 10];
//     const defaultValue = defaultValues[label];
//     const [value, setValue] = useState(defaultValue);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         setTempFilters(prevFilters => ({
//             ...prevFilters,
//             [label]: newValue
//         }));
//     };


//     useEffect(() => {
//         setTempFilters(prevFilters => ({
//             ...prevFilters,
//             [label]: value
//         }));
//     }, []);

//     useEffect(() => {
//         setValue(defaultValue);
//     }, [reset]);

//     return (
//         <Box sx={{ width: 300 }}>
//             <Typography variant='body2'>{label}({value[0]} - {value[1] === defaultValue[1] ? 'Any' : value[1]})</Typography>
//             {/* <Typography variant='body2'>{label}({value[0]} - {value[1]})</Typography> */}
//             <Slider
//                 max={defaultValue[1]} min={defaultValue[0]}
//                 getAriaLabel={() => {label}}
//                 value={value}
//                 onChange={handleChange}
//                 valueLabelDisplay="auto"
//                 size='small'
//             />
//         </Box>
        
//     );
// }

export default function RangeSlider({ label, setTempFilters, reset}) {
    const labelsMap = {
        "Age": ["0", "18", "30", "Any"],
        "Income": ["0", "1000", "2000", "Any"],
    };
    const defaultValues = {
        "Age": [0, 1, 2],
        "Income": [0, 1, 2],
    };
    const defaultValue = defaultValues[label];
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event, newValue) => {
        // here I can change to the format I want
        const processed_value = [newValue[0], newValue[1] - 1];
        setValue(processed_value);
        setTempFilters(prevFilters => ({
            ...prevFilters,
            [label]: processed_value
        }));
        // setValue(newValue);
        // setTempFilters(prevFilters => ({
        //     ...prevFilters,
        //     [label]: newValue
        // }));
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
            <Typography variant='body2'>
                {label}({labelsMap[label][value[0]]} - {value[1] === defaultValue[1] ? 'Any' : labelsMap[label][value[1]]})
            </Typography>
            <Slider
                max={defaultValue[1]} min={defaultValue[0]}
                getAriaLabel={() => {label}}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                size='small'
                valueLabelFormat={(value) => labelsMap[label][value]}
            />
        </Box>
    );
}
