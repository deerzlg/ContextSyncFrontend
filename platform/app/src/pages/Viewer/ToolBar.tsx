import { Button } from 'antd';

import { useToolContext } from '@/context/toolManager';

interface ToolBarProps {
  ws: WebSocket | null;
  isWebSocketSync: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({ ws, isWebSocketSync }) => {
  const { toolState, toolDispatch } = useToolContext();

  const tools = [
    'Rectangle',
    'Circle',
    'Polygon',
    'Freehand',
    'Angle',
    'Length',
  ];

  const handleClick = (tool: string) => {
    if (isWebSocketSync) {
      ws?.send(
        JSON.stringify({
          dispatch: 'toolDispatch',
          type: 'SET_ACTIVE_TOOL',
          payload: tool,
        }),
      );
    }
    toolDispatch({ type: 'SET_ACTIVE_TOOL', payload: tool });
  };

  return (
    <div className="flex justify-center items-center">
      {tools.map((tool) => (
        <Button
          key={tool}
          onClick={() => handleClick(tool)}
          type={toolState.activeTool === tool ? 'primary' : 'default'}
        >
          {tool}
        </Button>
      ))}
    </div>
  );
};

export default ToolBar;
