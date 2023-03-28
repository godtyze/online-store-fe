import React from 'react';
import {AutoComplete, Spin} from 'antd';
import cn from 'classnames';
import styles from '@/styles/ui/input-select.module.scss';

interface Options {
  key: string;
  label: React.ReactNode | string;
}

interface InputSelectProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;

  isLoading?: boolean;
  options?: Options[];
  onSearch: (value: string) => void;
  className?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
                                                   value,
                                                   placeholder,
                                                   disabled,
                                                   isLoading,
                                                   options,
                                                   onSearch,
                                                   className
                                                 }) => {
  const classes = cn(styles.select, className);

  return (
    <AutoComplete
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      notFoundContent={isLoading ? <Spin size="small"/> : 'Ничего не найдено'}
      options={options}
      allowClear={true}
      showArrow={true}
      showSearch={true}
      onSearch={(search) => onSearch(search)}
      className={classes}
    />
  );
};

export default InputSelect;