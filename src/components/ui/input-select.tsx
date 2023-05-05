import {FC} from 'react';
import {AutoComplete, Spin} from 'antd';
import cn from 'classnames';
import {SelectOptions} from '@/models';
import styles from '@/styles/ui/input-select.module.scss';

interface InputSelectProps {
  placeholder?: string;
  disabled?: boolean;

  isLoading?: boolean;
  options?: SelectOptions[];
  onSearch: (value: string) => void;
  onSelect?: (option: SelectOptions) => void;
  className?: string;
}

const InputSelect: FC<InputSelectProps> = ({
                                                   placeholder,
                                                   disabled,
                                                   isLoading,
                                                   options,
                                                   onSearch,
                                                   onSelect,
                                                   className
                                                 }) => {
  const classes = cn(styles.select, className);

  return (
    <AutoComplete
      placeholder={placeholder}
      disabled={disabled}
      notFoundContent={isLoading ? <Spin size="small"/> : 'Ничего не найдено'}
      options={options}
      allowClear={true}
      showArrow={true}
      showSearch={true}
      onSearch={(search) => onSearch(search)}
      onSelect={(val, option) => onSelect && onSelect(option)}
      className={classes}
    />
  );
};

export default InputSelect;