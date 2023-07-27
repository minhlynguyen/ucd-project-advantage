import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ALL_BOROUGHS } from '../../constants';

const theme = createTheme({
  typography: {
    fontSize: 14,
  },
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({ setTempFilters, reset }) {
    const defaultValue = ALL_BOROUGHS;
    const [selectedOptions, setSelectedOptions] = React.useState(defaultValue);
    
    useEffect(() => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            boroughs: selectedOptions.map(option => option.name)
        }));
    }, []);

    useEffect(() => {
        setSelectedOptions(defaultValue);
        setTempFilters(prevFilters => ({
          ...prevFilters,
          boroughs: defaultValue.map(option => option.name)
        }));
    }, [reset]);

    const handleSelectChange = (event, newSelectedOptions) => {
        setSelectedOptions(newSelectedOptions);
        setTempFilters(prevFilters => ({
            ...prevFilters,
            boroughs: newSelectedOptions.map(option => option.name)
        }));
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          options={ALL_BOROUGHS}
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
          size="small"
          onChange={handleSelectChange}
          renderInput={(params) => (
            <TextField {...params} label="Locate in" />
          )}
        />
      </ThemeProvider>
    );
}
