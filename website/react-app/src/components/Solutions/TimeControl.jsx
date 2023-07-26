// import * as React from 'react';
// import Switch from '@mui/material/Switch';
// import { Slider, Stack, Typography } from '@mui/material';
// import DateTimeSelect from './DateTimeSelect';
// import BasicSwitch from './BasicSwitch';

// export default function TimeControl({setRealTime}) {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//     // setRealTime(!checked);
//   };

//   return (
//     <Stack direction="row" spacing={1} alignItems="center">
//         <Typography variant='body2'>Real time</Typography>
//         <Switch
//         checked={checked}
//         onChange={handleChange}
//         inputProps={{ 'aria-label': 'controlled' }}
//         />
//         <Typography variant='body2'>Ad time :</Typography>
//         <span>   </span>
//         {checked ? 
//           <DateTimeSelect /> :
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant='body2'>0</Typography>
//             <Slider max={23} min={0} sx={{ width: 300 }} size="small" defaultValue={7} aria-label="Small" valueLabelDisplay="auto" />
//             <Typography variant='body2'>24h</Typography>
//           </Stack> }
//     </Stack>
//   );
// }

import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Slider, Stack, Typography } from '@mui/material';
import DateTimeSelect from './DateTimeSelect';
import BasicSwitch from './BasicSwitch';

export default function TimeControl({ setAdTimeMode, adTimeMode, setAdTime, adTime}) {
  // const [checked, setChecked] = React.useState(adTimeMode);

  const handleChange = (event) => {
    // setChecked(event.target.checked);
    // setRealTime(!checked);
    setAdTimeMode(event.target.checked)
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant='body2'>Real time</Typography>
        <Switch
        checked={adTimeMode}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='body2'>Ad time :</Typography>
        <span>   </span>
        {adTimeMode ? 
          <DateTimeSelect setAdTime={setAdTime} adTime={adTime}/> :
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant='body2'>0</Typography>
            <Slider max={23} min={0} sx={{ width: 300 }} size="small" defaultValue={7} aria-label="Small" valueLabelDisplay="auto" />
            <Typography variant='body2'>24h</Typography>
          </Stack> }
    </Stack>
  );
}
