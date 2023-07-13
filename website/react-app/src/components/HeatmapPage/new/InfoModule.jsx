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
import axios from 'axios';

function ZoneCard({ zone }) {
  return (
    <div className="zone-card">
      <h3>{zone.properties.name}</h3>
      <p>ID: {zone.id}</p>
      <p>Borough: {zone.properties.borough}</p>
      <p>PK: {zone.properties.pk}</p>
    </div>
  );
}


function InfoModule({ zones }) {
  const [sortedZones, setSortedZones] = useState([]);

  useEffect(() => {
    if (Object.keys(zones).length !== 0) {
      const sortedZonesArray = zones.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
      setSortedZones(sortedZonesArray);
      console.log("sortedZones:", sortedZonesArray);
    }
  }, [zones]);

  return (
    <div className="info-module">
      {sortedZones.map(zone => <ZoneCard key={zone.id} zone={zone} />)}
    </div>
  );
}

export default InfoModule;




