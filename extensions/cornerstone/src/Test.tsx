import { useAppConfig } from '@/context/appConfig';
import { Button } from 'antd';

const Test = () => {
  const { appConfig } = useAppConfig();

  const handleClick = () => {
    console.log('appConfig', appConfig);
  };
  return (
    <div>
      <Button onClick={handleClick}>Test</Button>
    </div>
  );
};

export default Test;
