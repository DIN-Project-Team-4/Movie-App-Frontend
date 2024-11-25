import React from 'react';

const DropdownFilterGenre = ({ label, options, onChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        <strong>{label}</strong>
        <select onChange={onChange} style={{ marginLeft: '10px', padding: '5px' }}>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropdownFilterGenre;