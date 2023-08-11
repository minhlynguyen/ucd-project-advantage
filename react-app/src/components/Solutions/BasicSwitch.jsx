import React from "react";
import Switch from '@mui/material/Switch';
import { Stack, Typography } from '@mui/material';

function BasicSwitch({label1, label2}) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant='body2'>{label1}</Typography>
            <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant='body2'>{label2}</Typography>
        </Stack>
      );

}
export default BasicSwitch;