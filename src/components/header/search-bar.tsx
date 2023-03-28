import React, {useState} from 'react';
import InputSelect from '@/components/ui/input-select';
import {useGetAllDevicesQuery} from '@/api/deviceAPI';
import {useSearchDebounce} from '@/hooks/useSearchDebounce';

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useSearchDebounce(value);
  const {data, isLoading} = useGetAllDevicesQuery({query: debouncedValue}, {
    skip: debouncedValue.length < 2,
    refetchOnFocus: false
  });

  const options = data?.rows.map(device => ({ key: device.name, label: device.name }));

  return (
    <InputSelect
      value={value}
      options={options}
      onSearch={(search) => setValue(search)}
      isLoading={isLoading}
      placeholder='Найти товар...'
    />
  );
};

export default SearchBar;