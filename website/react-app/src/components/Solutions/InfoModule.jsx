// import React from 'react';

// function InfoModule() {
//   return (
//     <div className="info-module">
//         InfoModule
//     </div>
//   );
// };

// export default InfoModule;
import React, { useEffect, useRef, useState } from 'react';

function ZoneCard({ zone, setSelectedZone }) {

  const handleClick = (clickedZone) => {
    return () => setSelectedZone(clickedZone);
  }
  return (
    <div className="zone-card">
      <h3>{zone.properties.name}</h3>
      <p>ID: {zone.id}</p>
      <p>Borough: {zone.properties.borough}</p>
      <p>PK: {zone.properties.pk}</p>
      <button onClick={handleClick(zone)}>click to pick</button>
    </div>
  );
}

function DetailedZoneCard({ zone }) {
  return (
    <div className='detailed-zone-card'>
      <h3>This is the detailed zone card</h3>
      <p>ID: {zone.id}</p>
      <p>Borough: {zone.properties.borough}</p>
      <p>PK: {zone.properties.pk}</p>

    </div>
  );
}


function InfoModule({ zones, selectedZone, setSelectedZone }) {
  const [sortedZones, setSortedZones] = useState([]);
  const currentZoneRef = useRef(null);
  const [info, setInfo] = useState('');

  // When zones change, get top 5 zones and set a list of ZoneCards in info
  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
      // Reset current zone
      currentZoneRef.current = null;
      const sortedZonesArray = zones.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
      setSortedZones(sortedZonesArray);
      
      const zoneCards = sortedZonesArray.map(zone => <ZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
      setInfo(zoneCards);
    }
  }, [zones]);

  // When selectedZone change, set a list of ZoneCards in info when it's null and set DetailedZoneCard otherwise
  useEffect(() => {
    if (selectedZone) {
      const detailedZoneCard = <DetailedZoneCard zone={selectedZone}/>;
      setInfo(detailedZoneCard);
    } else {
      const zoneCards = sortedZones.map(zone => <ZoneCard key={zone.id} zone={zone} setSelectedZone={setSelectedZone}/>);
      setInfo(zoneCards);
    }
  }, [selectedZone]);

  return (
    <div className="info-module">
      {info}
    </div>
  );
}

export default InfoModule;




