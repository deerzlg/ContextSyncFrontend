import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Test } from '@webviewer/extension-cornerstone';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer className="h-full w-full">
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Test />
      </div>
    </PageContainer>
  );
};

export default HomePage;
