// import * as React from 'react';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';


const theme = createTheme({
  typography: {
    fontSize: 14,
  },
});

export default function MultiSelect({ setTempFilters, reset }) {
    const defaultValue = allBoroughs;
    const [selectedOptions, setSelectedOptions] = React.useState(defaultValue);

    useEffect(() => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            boroughs: selectedOptions.map(option => option.id)
        }));
    }, []);

    useEffect(() => {
        setSelectedOptions(defaultValue);
    }, [reset]);
  
    return (
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
        //   id="select-borough"
          options={allBoroughs}
          value={selectedOptions}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 5 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          style={{ width: 600 }}
          size="small"
          onChange={(event, newSelectedOptions) => {
            setSelectedOptions(newSelectedOptions);
            setTempFilters(prevFilters => ({
              ...prevFilters,
              boroughs: newSelectedOptions.map(option => option.id)
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Locate in" />
          )}
        />
      </ThemeProvider>
    );
  }
  
  


const allBoroughs = [
  { name: 'Manhattan', id: 1 },
  { name: 'Brooklyn', id: 2 },
  { name: 'Queens', id: 3 },
  { name: 'Bronx', id: 4 },
  { name: 'Staten Island', id: 5 },
];