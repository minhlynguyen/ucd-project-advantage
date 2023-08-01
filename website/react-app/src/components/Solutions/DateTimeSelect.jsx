// import {React, useState, useContext} from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import SolutionsContext from './SolutionsContext';



// export default function DateTimeSelect() {

//   const { adTime, setAdTime } = useContext(SolutionsContext);
  
//   const style = {
//     border: '1px solid #ccc', 
//     borderRadius: '10px', 
//     'fontSize': '12px',
//     'backgroundColor': 'white',
//     width: "20",
//     padding: "0.5em"

//   }
    
//   return (
//     <div className='datetime-select'>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateTimePicker
//               disablePast={true}
//               views={['year', 'month', 'day', 'hours']}
//               viewRenderers={{
//                 hours: renderTimeViewClock,
//               }}
//               label="Start DateTime"
//               slotProps={{ textField: { size: 'small' } }}
//           />
//         </LocalizationProvider>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateTimePicker
//                 views={['year', 'month', 'day', 'hours']}
//                 viewRenderers={{
//                   hours: renderTimeViewClock,
//                 }}
//                 label="End DateTime"
//                 slotProps={{ textField: { size: 'small' } }}
//             />
//         </LocalizationProvider>
//     </div>
//   );
// }

// import {React, useState, useContext} from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import SolutionsContext from './SolutionsContext';
// import Button from '@mui/material/Button';
// import { getTimeString } from '../../utils/dateTimeUtils';

// export default function DateTimeSelect() {

//   const { adTime, setAdTime } = useContext(SolutionsContext);
//   const [startTime, setStartTime] = useState(adTime[0]);
//   const [endTime, setEndTime] = useState(adTime[1]);

//   const style = {
//     border: '1px solid #ccc', 
//     borderRadius: '10px', 
//     'fontSize': '12px',
//     'backgroundColor': 'white',
//     width: "20",
//     padding: "0.5em"
//   };

//   const handleConfirm = () => {
//     if (startTime && endTime) {
//       setAdTime([getTimeString(startTime.toDate()), getTimeString(endTime.toDate())]);
//       console.log("new ad time:", [getTimeString(startTime.toDate()), getTimeString(endTime.toDate())]);
//     } else {
//       console.error('startTime or endTime is not defined');
//     }
//   };
  
  
//   return (
//     <div className='datetime-select'>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateTimePicker
//               // disablePast={true}
//               views={['year', 'month', 'day', 'hours']}
//               viewRenderers={{
//                 hours: renderTimeViewClock,
//               }}
//               label="Start DateTime"
//               slotProps={{ textField: { size: 'small' } }}
//               value={startTime}
//               onChange={setStartTime}
//           />
//         </LocalizationProvider>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateTimePicker
//                 // disablePast={true}
//                 views={['year', 'month', 'day', 'hours']}
//                 viewRenderers={{
//                   hours: renderTimeViewClock,
//                 }}
//                 label="End DateTime"
//                 slotProps={{ textField: { size: 'small' } }}
//                 value={endTime}
//                 onChange={setEndTime}
//             />
//         </LocalizationProvider>
//         <Button onClick={handleConfirm}>Confirm</Button>
//     </div>
//   );
// }

import React, { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import SolutionsContext from './SolutionsContext';
import Button from '@mui/material/Button';
import { getTimeString } from '../../utils/dateTimeUtils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
// import dayjs from 'dayjs';

// Register the plugin
dayjs.extend(minMax);


export default function DateTimeSelect() {
  const { adTime, setAdTime } = useContext(SolutionsContext);
  const [startTime, setStartTime] = useState(adTime[0] ? dayjs(adTime[0]) : null);
  const [endTime, setEndTime] = useState(adTime[1] ? dayjs(adTime[1]) : null);
  

  const style = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    'fontSize': '12px',
    'backgroundColor': 'white',
    width: '20',
    padding: '0.5em'
  };

  const handleConfirm = () => {
    if (startTime && endTime) {
      setAdTime([getTimeString(startTime.toDate()), getTimeString(endTime.toDate())]);
      console.log('new ad time:', [
        getTimeString(startTime.toDate()),
        getTimeString(endTime.toDate())
      ]);
    } else {
      console.error('startTime or endTime is not defined');
    }
  };


  return (
    <div className='datetime-select'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          views={['year', 'month', 'day', 'hours']}
          viewRenderers={{
            hours: renderTimeViewClock
          }}
          label='Start DateTime'
          slotProps={{ textField: { size: 'small' } }}
          value={startTime}
          onChange={setStartTime}

        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          views={['year', 'month', 'day', 'hours']}
          viewRenderers={{
            hours: renderTimeViewClock
          }}
          label='End DateTime'
          slotProps={{ textField: { size: 'small' } }}
          value={endTime}
          onChange={setEndTime}
          minDateTime={startTime}
          maxDateTime={dayjs().add(2, 'month')}

        />
      </LocalizationProvider>
      <Button variant='outlined' onClick={handleConfirm} sx={{marginLeft: '10px'}}>Confirm</Button>
    </div>
  );
}


