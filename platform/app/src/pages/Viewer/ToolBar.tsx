import { Button } from 'antd';

import { useToolStore } from '@/context/toolManager';

interface ToolBarProps {
  ws: WebSocket | null;
  isWebSocketSync: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({ ws, isWebSocketSync }) => {
  const { activeTool, setActiveTool } = useToolStore();

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
          dispatch: 'setActiveTool',
          payload: tool,
        }),
      );
    }
    setActiveTool(tool);
  };

  return (
    <div className="flex justify-center items-center">
      {tools.map((tool) => (
        <Button
          key={tool}
          onClick={() => handleClick(tool)}
          type={activeTool === tool ? 'primary' : 'default'}
        >
          {tool}
        </Button>
      ))}
    </div>
  );
};

export default ToolBar;
