import React from 'react';
import {Row, Spin} from 'antd';
import cnBind from 'classnames/bind';
import styles from '@/styles/ui/loader.module.scss';

interface LoaderProps {
  size?: 'small' | 'large' | 'default';
  isCenter?: boolean;
  className?: string;
}

const cx = cnBind.bind(styles);

const Loader: React.FC<LoaderProps> = ({size, isCenter, className}) => {
  const classes = cx(className, {
    [styles.container]: isCenter
  });

  console.log(classes)

  if (isCenter) {
    return (
      <Row justify='center' align='middle' className={classes}>
        <Spin size={size} />
      </Row>
    );
  }

  return (
    <Spin
      size={size}
      className={classes}
    />
  );
};

export default Loader;