
// import { Box, Button, Stack, Typography } from '@mui/material';
// import React, { useEffect, useRef, useState } from 'react';
// import BriefZoneCard from '../Cards/BriefZoneCard';
// import DetailedZoneCard from '../Cards/DetailedZoneCard';



// function InfoModule({ zones, selectedZone, setSelectedZone, isLoading, handleClickMore }) {

//   const [sortedZones, setSortedZones] = useState([]);
//   const [selectedZoneDetail, setSelectedZoneDetail] = useState(null);
//   const selectedZoneRef = useRef(null);
//   const [info, setInfo] = useState('');
//   const [detailMode, setDetailMode] = useState(false);

//   // update detailMode when selectedZone change
//   useEffect(() => {
//     console.log("selectedZoneRef", selectedZoneRef);
//     console.log("selectedZone", selectedZone);
//     console.log(!selectedZoneRef && selectedZone);
//     console.log(selectedZoneRef && !selectedZone);
//     if (!selectedZoneRef.current && selectedZone) {
//       setDetailMode(true);
//     }
//     if (selectedZoneRef.current && !selectedZone) {
//       setDetailMode(false)
//     }
//     selectedZoneRef.current = selectedZone;
//   }, [selectedZone]);  

//   // update displayed data (top 5 zones or zone detail) according to raw data
//   useEffect(() => {

//     if (Object.keys(zones).length !== 0) {
//       const sortedZonesArray = zones.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
//       setSortedZones(sortedZonesArray);
//     } else {
//       setSortedZones([]);
//     }

//     console.log("!selectedZone", !selectedZone);
//     if (selectedZone) {
//       // request to get details to set currentZone
//       setSelectedZoneDetail(selectedZone);
//     } else {
//       setSelectedZoneDetail(null);
//     }
//     console.log("selectedZoneDetail", selectedZoneDetail);
//   }, [zones, selectedZone]);

//   // update info according to changes from status and data
//   useEffect(() => {
//     // console.log();
//     if (detailMode) {
//       if (isLoading) {
//         const skeleton = <DetailedZoneCard zone={null} handleClickMore={handleClickMore}/>;
//         setInfo(skeleton);
//       } else {
//         const detailedZoneCard = <DetailedZoneCard zone={selectedZoneDetail} handleClickMore={handleClickMore}/>;
//         setInfo(detailedZoneCard);
//       }

//     } else {
//       if (isLoading) {
//         const emptyZones = Array.from({ length: 5 }, () => ({}));
//         const skeleton = emptyZones.map((emptyZone, index) => <BriefZoneCard key={index} zone={emptyZone} />)
//         setInfo(skeleton);
//       } else {
//         const zoneCards = sortedZones.map(zone => <BriefZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
//         setInfo(zoneCards);
//       }
//     }

//   }, [isLoading, detailMode, selectedZoneDetail, sortedZones]);
  
//   return (
//     <div className="info-module">
//       <Stack spacing={1}>
//         {info}
//         {detailMode && (
//           <Button variant="outlined" onClick={() => setSelectedZone(null)}>
//             Back to All Zones
//           </Button>
//         )}
//       </Stack>
//     </div>
//   );
  
// }

// export default InfoModule;





import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import BriefZoneCard from '../Cards/BriefZoneCard';
import DetailedZoneCard from '../Cards/DetailedZoneCard';



function InfoModule({ zones, selectedZone, setSelectedZone, isLoading }) {

  const [sortedZones, setSortedZones] = useState([]);
  const [selectedZoneDetail, setSelectedZoneDetail] = useState(null);
  const selectedZoneRef = useRef(null);
  const [info, setInfo] = useState('');
  const [detailMode, setDetailMode] = useState(false);

  // update detailMode when selectedZone change
  useEffect(() => {
    // console.log("selectedZoneRef", selectedZoneRef.current);
    // console.log("selectedZone", selectedZone);
    // console.log(!selectedZoneRef && selectedZone);
    // console.log(selectedZoneRef && !selectedZone);
    if (!selectedZoneRef.current && selectedZone) {
      setDetailMode(true);
    }
    if (selectedZoneRef.current && !selectedZone) {
      setDetailMode(false)
    }
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);  

  // update displayed data (top 5 zones or zone detail) according to raw data
  useEffect(() => {

    if (Object.keys(zones).length !== 0) {
      const sortedZonesArray = zones.features.sort((b, a) => a.properties.impression.display.valid - b.properties.impression.display.valid).slice(0, 5);
      setSortedZones(sortedZonesArray);
    } else {
      setSortedZones([]);
    }

    console.log("!selectedZone", !selectedZone);
    if (selectedZone) {
      // request to get details to set currentZone
      setSelectedZoneDetail(selectedZone);
    } else {
      setSelectedZoneDetail(null);
    }
    // console.log("selectedZoneDetail", selectedZoneDetail);
  }, [zones, selectedZone]);

  // update info according to changes from status and data
  useEffect(() => {
    // console.log();
    if (detailMode) {
      if (isLoading) {
        const skeleton = <DetailedZoneCard zone={null}/>;
        setInfo(skeleton);
      } else {
        const detailedZoneCard = <DetailedZoneCard zone={selectedZoneDetail}/>;
        setInfo(detailedZoneCard);
      }

    } else {
      if (isLoading) {
        const emptyZones = Array.from({ length: 5 }, () => ({}));
        const skeleton = emptyZones.map((emptyZone, index) => <BriefZoneCard key={index} zone={emptyZone} />)
        setInfo(skeleton);
      } else {
        const zoneCards = sortedZones.map(zone => <BriefZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
        setInfo(zoneCards);
      }
    }

  }, [isLoading, detailMode, selectedZoneDetail, sortedZones]);
  
  return (
    <div className="info-module">
      <Stack spacing={1}>
        {info}
        {detailMode && (
          <Button variant="outlined" onClick={() => setSelectedZone(null)}>
            Back to All Zones
          </Button>
        )}
      </Stack>
    </div>
  );
  
}

export default InfoModule;




