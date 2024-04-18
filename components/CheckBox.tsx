import React, { useEffect, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

interface CheckBoxListProps {
  data: string[];
  checkedItems:{ [key: string]: boolean }
  onCheckedItemsChange: (checkedItems: { [key: string]: boolean }) => void;
}


function CheckBoxList({ data, checkedItems,onCheckedItemsChange }: CheckBoxListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      // 체크되었으면 해당 항목을 checkedItems에 추가
      onCheckedItemsChange({ ...checkedItems, [name]: checked });
    } else {
      // 체크가 해제되면 해당 항목을 checkedItems에서 삭제
      const updatedCheckedItems = { ...checkedItems };
      delete updatedCheckedItems[name];

      onCheckedItemsChange(updatedCheckedItems);
    }
  };

  return (
    <FormGroup>
      {data.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={checkedItems[item] || false}
              onChange={handleChange}
              name={item}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}

export default CheckBoxList;
