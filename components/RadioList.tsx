import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

interface RadioListProps {
  data: string[];
  checkedItems: { [key: string]: boolean };
  onCheckedItemsChange: (checkedItems: { [key: string]: boolean }) => void;
}

function RadioList({ data, checkedItems, onCheckedItemsChange }: RadioListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    onCheckedItemsChange({ [name]: true }); // Set the checked item to true
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup>
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Radio checked={checkedItems[item] || false} onChange={handleChange} name={item} />}
            label={item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioList;
