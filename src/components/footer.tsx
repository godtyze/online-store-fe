import {FC} from 'react';
import {Layout} from 'antd';
import styles from '@/styles/components/footer.module.scss';

const Footer: FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
      Ant Design ©2023 Created by Ant UED
    </Layout.Footer>
  );
};

export default Footer;