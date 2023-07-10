import React, { useState } from 'react';

function FunctionArea() {

    // set hooks
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [incomeRange, setIncomeRange] = useState('');
    const [merchantCountRange, setMerchantCountRange] = useState('');
  
    // handle events
    const handleToggleFilterClick = () => {
      setFilterVisible(!isFilterVisible);
    };
  
    const handleApplyClick = () => {
      console.log(`Apply filter with income range ${incomeRange} and merchant count range ${merchantCountRange}`);
    };
  
    const handleIncomeRangeChange = event => {
      setIncomeRange(event.target.value);
    };
  
    const handleMerchantCountRangeChange = event => {
      setMerchantCountRange(event.target.value);
    };
  
    const handleResetClick = () => {
      setIncomeRange('');
      setMerchantCountRange('');
    };
  
    const handleCompareClick = () => {
      console.log("Compare button clicked.");
    };
  
    const handleSavedClick = () => {
      console.log("Saved button clicked.");
    };
  
    const handleSearch = event => {
      console.log(`Search for ${event.target.value}`);
    };
  
    // return component
    return (
      <div className='FunctionArea'>
        <button onClick={handleToggleFilterClick}>{isFilterVisible ? 'Hide Filters' : 'Show Filters'}</button>
        <button onClick={handleCompareClick}>Compare</button>
        <button onClick={handleSavedClick}>Saved</button>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        {isFilterVisible && (
          <div className='Filters'>
            <label>
              <span>Income Range:</span>
              <input type="text" value={incomeRange} onChange={handleIncomeRangeChange} />
            </label>
            <label>
              Merchant Count Range:
              <input type="text" value={merchantCountRange} onChange={handleMerchantCountRangeChange} />
            </label>
            <button onClick={handleResetClick}>Reset</button>
            <button onClick={handleApplyClick}>Apply</button>
          </div>
        )}
      </div>
    );
  }

  export default FunctionArea;