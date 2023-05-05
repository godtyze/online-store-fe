import {FC} from 'react';
import {Row, Spin, SpinProps} from 'antd';
import cnBind from 'classnames/bind';
import styles from '@/styles/ui/loader.module.scss';

interface LoaderProps extends SpinProps {

  isCenter?: boolean;
}

const cx = cnBind.bind(styles);

const Loader: FC<LoaderProps> = ({size, isCenter, wrapperClassName}) => {
  const classes = cx(wrapperClassName, {
    [styles.container]: isCenter
  });

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