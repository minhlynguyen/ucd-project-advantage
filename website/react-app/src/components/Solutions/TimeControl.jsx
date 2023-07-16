import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Stack, Typography } from '@mui/material';

export default function TimeControl({setRealTime}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setRealTime(!checked);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Real time</Typography>
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>Ad time</Typography>
    </Stack>
  );
}