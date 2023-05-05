import {FC} from 'react';
import styles from '@/styles/ui/logo.module.scss';

const Logo: FC = () => {
  return (
    <h1 className={styles.logo}>
      <span>ONLINE</span>
      <span>store</span>
    </h1>
  );
};

export default Logo;