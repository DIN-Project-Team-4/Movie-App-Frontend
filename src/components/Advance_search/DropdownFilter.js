import React from 'react';

const DropdownFilter = ({ label, options }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        <strong>{label}</strong>
        <select style={{ marginLeft: '10px', padding: '5px' }}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropdownFilter;