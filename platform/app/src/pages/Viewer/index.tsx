import { useViewportGridContext } from '@/context';
import { useToolStore } from '@/context/toolManager';
import { Checkbox, notification } from 'antd';
import { useEffect, useState } from 'react';
import LayoutSelectorButton from './LayoutSelector';
import ToolBar from './ToolBar';
import ViewportGrid from './ViewportGrid';

import type { CheckboxProps } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Page() {
  const [isWebSocketSync, setIsWebSocketSync] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { setActiveTool } = useToolStore();
  const { viewportGridDispatch } = useViewportGridContext();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, mes: string) => {
    api[type]({
      message: mes,
    });
  };

  const onChange: CheckboxProps['onChange'] = (e) => {
    setIsWebSocketSync(e.target.checked);
  };

  const onSetLayout = (Layout: { numRows: number; numCols: number }) => {
    if (isWebSocketSync) {
      ws?.send(
        JSON.stringify({
          dispatch: 'viewportGridDispatch',
          type: 'SET_LAYOUT',
          payload: { rows: Layout.numRows, columns: Layout.numCols },
        }),
      );
    }
    viewportGridDispatch({
      type: 'SET_LAYOUT',
      payload: { rows: Layout.numRows, columns: Layout.numCols },
    });
  };

  const onSetActiveViewport = (viewportId: string) => {
    if (isWebSocketSync) {
      ws?.send(
        JSON.stringify({
          dispatch: 'viewportGridDispatch',
          type: 'SET_ACTIVE_VIEWPORT',
          payload: { activeViewportId: viewportId },
        }),
      );
    }
    viewportGridDispatch({
      type: 'SET_ACTIVE_VIEWPORT',
      payload: { activeViewportId: viewportId },
    });
  };

  useEffect(() => {
    if (isWebSocketSync) {
      const newWs = new WebSocket('ws://localhost:7000/ws');
      setWs(newWs);
      newWs.onopen = () => {
        openNotification('success', 'WebSocket Connected');
      };
      newWs.onerror = () => {
        openNotification('error', 'WebSocket Failed');
      };
      newWs.onmessage = (event) => {
        // 当接收到消息时，解析消息并调用 对应的dispatch
        const message = JSON.parse(event.data);
        const { dispatch, type, payload } = message;
        if (dispatch === 'setActiveTool') {
          setActiveTool(payload);
        } else if (dispatch === 'viewportGridDispatch') {
          viewportGridDispatch({ type, payload });
        }
      };
    } else {
      ws?.close();
    }

    return () => {
      ws?.close();
    };
  }, [isWebSocketSync]);

  return (
    <div className=" h-screen  w-screen flex flex-col">
      {contextHolder}
      <div className="py-6 flex justify-center items-center">
        <ToolBar ws={ws} isWebSocketSync={isWebSocketSync} />
        <LayoutSelectorButton setLayoutGrid={onSetLayout} />
        <div className="ml-6">
          <Checkbox onChange={onChange}>WebSocketSync</Checkbox>
        </div>
      </div>
      <ViewportGrid onSetActiveViewport={onSetActiveViewport} />
    </div>
  );
}
