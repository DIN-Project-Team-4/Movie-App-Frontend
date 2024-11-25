import React from 'react';

const DropdownFilterLanguage = ({ label, options, onChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        <strong>{label}</strong>
        <select onChange={onChange} style={{ marginLeft: '10px', padding: '5px' }}>
          {options.map((option, index) => (
            <option key={index} value={option.iso_639_1}>
              {option.english_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropdownFilterLanguage;