import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

interface ViewportGridState {
  rows: number;
  columns: number;
  activeViewportId: string | null;
}

interface ViewportGridAction {
  type: 'SET_LAYOUT' | 'SET_ACTIVE_VIEWPORT';
  payload: Partial<ViewportGridState>;
}

type ViewportGridReducer = (
  state: ViewportGridState,
  action: ViewportGridAction,
) => ViewportGridState;

const initialViewportGridState: ViewportGridState = {
  rows: 1,
  columns: 1,
  activeViewportId: null,
};

const ViewportGridContext = createContext<{
  viewportGridState: ViewportGridState;
  viewportGridDispatch: Dispatch<ViewportGridAction>;
} | null>(null);

export const ViewportGridProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const viewportGridReducer: ViewportGridReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LAYOUT':
        return {
          ...state,
          rows: action.payload.rows ?? state.rows,
          columns: action.payload.columns ?? state.columns,
        };
      case 'SET_ACTIVE_VIEWPORT':
        return {
          ...state,
          activeViewportId:
            action.payload.activeViewportId ?? state.activeViewportId,
        };
      default:
        return state;
    }
  };

  const [viewportGridState, viewportGridDispatch] = useReducer(
    viewportGridReducer,
    initialViewportGridState,
  );

  return (
    <ViewportGridContext.Provider
      value={{ viewportGridState, viewportGridDispatch }}
    >
      {children}
    </ViewportGridContext.Provider>
  );
};

export function useViewportGridContext() {
  const context = useContext(ViewportGridContext);
  if (!context) {
    throw new Error(
      'useViewportGridContext must be used within a ViewportGridProvider',
    );
  }
  return context;
}
