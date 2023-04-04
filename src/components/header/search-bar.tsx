import React, {useState} from 'react';
import InputSelect from '@/components/ui/input-select';
import {useGetAllDevicesQuery} from '@/api/deviceAPI';
import {useSearchDebounce} from '@/hooks/useSearchDebounce';
import {useNavigate} from 'react-router-dom';
import {SelectOptions} from '@/models';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const debouncedValue = useSearchDebounce(value);
  const {data, isLoading} = useGetAllDevicesQuery({query: debouncedValue}, {
    skip: debouncedValue.length < 2,
    refetchOnFocus: false
  });

  const options = data?.rows.map(device =>
    ({ key: device.id.toString(), label: device.name, value: device.name })
  );

  return (
    <InputSelect
      options={options}
      onSearch={(search) => setValue(search)}
      onSelect={(option: SelectOptions) => navigate(`device/${option.key}`)}
      isLoading={isLoading}
      placeholder='Найти товар...'
    />
  );
};

export default SearchBar;