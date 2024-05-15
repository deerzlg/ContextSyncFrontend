import { createContext, useContext, useState } from 'react';

// 定义Context的类型，包括状态和状态更新函数
interface AppConfigContextType {
  appConfig: any;
  setAppConfig: React.Dispatch<React.SetStateAction<any>>;
}
const appConfigContext = createContext<AppConfigContextType | null>(null);
const { Provider } = appConfigContext;

interface AppConfigProviderProps {
  children: React.ReactNode;
  value: any;
}
const AppConfigProvider: React.FC<AppConfigProviderProps> = ({
  children,
  value: initAppConfig,
}) => {
  const [appConfig, setAppConfig] = useState(initAppConfig);

  return <Provider value={{ appConfig, setAppConfig }}>{children}</Provider>;
};

export const useAppConfig = () => useContext(appConfigContext);
export { AppConfigProvider };
export default AppConfigProvider;
