// import React from 'react';

// function InfoModule() {
//   return (
//     <div className="info-module">
//         InfoModule
//     </div>
//   );
// };

// export default InfoModule;
import React, { useEffect, useState } from 'react';
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


function InfoModule() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    // const apiurl = 'http://127.0.0.1:8000/api/zones/';
    const apiurl = './data.json';
    axios.get(apiurl)
      .then(response => {
        const data = response.data;
        const sortedZones = data.features.sort((a, b) => a.properties.pk - b.properties.pk).slice(0, 5);
        setZones(sortedZones);
      });
  }, []);

  return (
    <div className="info-module">
      {zones.map(zone => <ZoneCard key={zone.id} zone={zone} />)}
    </div>
  );
}

export default InfoModule;



