import React, { useState } from 'react';
import { TextField, FormControl } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [radius, setRadius] = useState('');

  const handleRadiusChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setRadius(inputValue);
      const radiusValue = inputValue ? Math.max(0, Number(inputValue)) : '';
      if (onSearch) {
        onSearch(radiusValue);
      }
    }
  };

  return (
    <div className="mb-8 mt-8 flex max-w-sm items-center space-x-2">
      <FormControl variant="outlined" fullWidth>
        <TextField
          label="Radius"
          type="text"
          value={radius}
          onChange={handleRadiusChange}
          slotProps={{
            inputLabel: {
              sx: { color: '#fedb3a', '&.Mui-focused': { color: '#fedb3a' } },
            },
          }}
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fedb3a',
              },
              '&:hover fieldset': {
                borderColor: '#fedb3a',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fedb3a',
              },
            },
            '& .MuiInputBase-input': {
              color: 'black',
            },
          }}
          placeholder="Enter search radius"
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
