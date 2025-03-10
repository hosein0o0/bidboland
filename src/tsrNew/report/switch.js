import { useEffect, useState } from 'react';
import Select from 'react-select';

export const Switch = ({ setValue, list = [], multi = false }) => {
  const [selectedOption, setSelectedOption] = useState(multi ? [] : null);

  useEffect(() => {
    if (list.length > 0) {
      setSelectedOption(multi ? [list[0]] : list[0]);
    } else {
      setSelectedOption(multi ? [] : null);
    }
  }, [list, multi]);

  useEffect(() => {
    if (selectedOption) {
      setValue(
        multi
          ? selectedOption.map((item) => item.value).join(',')
          : selectedOption.value
      );
    } else {
      setValue('');
    }
  }, [selectedOption, setValue, multi]);

  const handleChange = (newValue) => {
    setSelectedOption(newValue || (multi ? [list[0]] : list[0]));
  };

  return (
    <div className="my-1 p-0 d-block" style={{ width: 400 }}>
      <Select
        onChange={handleChange}
        isMulti={multi}
        value={selectedOption}
        options={list}
        className="basic-multi-select w-100 pr-3 font-mediumx"
        classNamePrefix="select"
        placeholder=""
      />
    </div>
  );
};
