// import React, { useState } from 'react';

// function FunctionModule() {
//   const [filtersVisible, setFiltersVisible] = useState(false);

//   return (
//     <div className='function-module'>
//       <button onClick={() => setFiltersVisible(!filtersVisible)}>
//         Filters
//       </button>
//       <input type="text" placeholder="Search..." />
//       {filtersVisible && (
//         <div>
//           <p>conditions here...</p>
//         </div>
//       )}
      
//     </div>
//   );
// }

// export default FunctionModule;
// import React, { useState } from 'react';

// function FunctionModule() {
//   // set hooks
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const [incomeRange, setIncomeRange] = useState('');
//   const [merchantCountRange, setMerchantCountRange] = useState('');

//   // handle events
//   const handleToggleFilterClick = () => {
//     setFiltersVisible(!filtersVisible);
//   };

//   const handleApplyClick = () => {
//     console.log(`Apply filter with income range ${incomeRange} and merchant count range ${merchantCountRange}`);
//   };

//   const handleIncomeRangeChange = event => {
//     setIncomeRange(event.target.value);
//   };

//   const handleMerchantCountRangeChange = event => {
//     setMerchantCountRange(event.target.value);
//   };

//   const handleResetClick = () => {
//     setIncomeRange('');
//     setMerchantCountRange('');
//   };

//   const handleSearch = event => {
//     console.log(`Search for ${event.target.value}`);
//   };

//   // return component
//   return (
//     <div className='function-module'>
//       <button onClick={handleToggleFilterClick}>
//         {filtersVisible ? 'Hide Filters' : 'Show Filters'}
//       </button>
//       <input type="text" placeholder="Search..." onChange={handleSearch} />
//       {filtersVisible && (
//         <div>
//           <label>
//             <span>Income Range:</span>
//             <input type="text" value={incomeRange} onChange={handleIncomeRangeChange} />
//           </label>
//           <label>
//             Merchant Count Range:
//             <input type="text" value={merchantCountRange} onChange={handleMerchantCountRangeChange} />
//           </label>
//           <button onClick={handleResetClick}>Reset</button>
//           <button onClick={handleApplyClick}>Apply</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FunctionModule;

import React, { useState } from 'react';

function FunctionModule() {
  // set hooks
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [incomeRange, setIncomeRange] = useState('');
  const [merchantCountRange, setMerchantCountRange] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [includedBusinesses, setIncludedBusinesses] = useState({
    A: { included: false, min: 0, max: 0 },
    B: { included: false, min: 0, max: 0 },
    C: { included: false, min: 0, max: 0 },
    D: { included: false, min: 0, max: 0 },
    E: { included: false, min: 0, max: 0 },
  });

  // handle events
  const handleToggleFilterClick = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleApplyClick = () => {
    const requestBody = {
      incomeRange,
      merchantCountRange,
      startTime,
      endTime,
      includedBusinesses,
    };
    console.log('POST request body:', requestBody);
  };

  const handleIncomeRangeChange = event => {
    setIncomeRange(event.target.value);
  };

  const handleMerchantCountRangeChange = event => {
    setMerchantCountRange(event.target.value);
  };

  const handleStartTimeChange = event => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = event => {
    setEndTime(event.target.value);
  };

  const handleIncludedBusinessesChange = (businessType, included, min, max) => {
    setIncludedBusinesses({
      ...includedBusinesses,
      [businessType]: { included, min, max },
    });
  };

  const handleResetClick = () => {
    setIncomeRange('');
    setMerchantCountRange('');
    setStartTime('');
    setEndTime('');
    setIncludedBusinesses({
      A: { included: false, min: 0, max: 0 },
      B: { included: false, min: 0, max: 0 },
      C: { included: false, min: 0, max: 0 },
      D: { included: false, min: 0, max: 0 },
      E: { included: false, min: 0, max: 0 },
    });
  };

  const handleSearch = event => {
    console.log(`Search for ${event.target.value}`);
  };

  // return component
  return (
    <div className='function-module'>
      <button onClick={handleToggleFilterClick}>
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
      <button>Compare</button>
      <button>Saved</button>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      <button>Search</button>
      {filtersVisible && (
        <div>
          <label>
            Income Range:
            <input type="text" value={incomeRange} onChange={handleIncomeRangeChange} />
          </label>
          <label>
            Merchant Count Range:
            <input type="text" value={merchantCountRange} onChange={handleMerchantCountRangeChange} />
          </label>
          <label>
            Start Time:
            <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
          </label>
          {Object.entries(includedBusinesses).map(([businessType, { included, min, max }]) => (
            <div key={businessType}>
              <label>
                {businessType} Included:
                <input type="checkbox" checked={included} onChange={event => handleIncludedBusinessesChange(businessType, event.target.checked, min, max)} />
              </label>
              {included && (
                <>
                  <label>
                    {businessType} Min:
                    <input type="number" value={min} onChange={event => handleIncludedBusinessesChange(businessType, included, event.target.value, max)} />
                  </label>
                  <label>
                    {businessType} Max:
                    <input type="number" value={max} onChange={event => handleIncludedBusinessesChange(businessType, included, min, event.target.value)} />
                  </label>
                </>
              )}
            </div>
          ))}
          <button onClick={handleResetClick}>Reset</button>
          <button onClick={handleApplyClick}>Apply</button>
        </div>
      )}
    </div>
  );
}

export default FunctionModule;
