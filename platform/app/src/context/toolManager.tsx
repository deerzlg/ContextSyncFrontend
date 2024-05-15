import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

interface ToolState {
  activeTool: string | null;
}

interface ToolAction {
  type: 'SET_ACTIVE_TOOL';
  payload: string | null;
}

type ToolReducer = (state: ToolState, action: ToolAction) => ToolState;

const initialState: ToolState = { activeTool: null };

const ToolContext = createContext<{
  toolState: ToolState;
  toolDispatch: Dispatch<ToolAction>;
} | null>(null);

export const ToolProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toolReducer: ToolReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_TOOL':
        return { ...state, activeTool: action.payload };
      default:
        return state;
    }
  };

  const [toolState, toolDispatch] = useReducer(toolReducer, initialState);

  return (
    <ToolContext.Provider value={{ toolState, toolDispatch }}>
      {children}
    </ToolContext.Provider>
  );
};

export function useToolContext() {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
}
