import { history, useIntl } from '@umijs/max';
import { Button, Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  const intl = useIntl();

  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={3} className={'m-auto'}>
          <Button
            className="text-pink-800"
            onClick={() => {
              history.push('/viewer');
            }}
          >
            {intl.formatMessage({ id: 'common.Ok' })}
          </Button>
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
