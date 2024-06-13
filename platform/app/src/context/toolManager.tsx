import { create } from 'zustand';

interface ToolState {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

// Creating the zustand store
export const useToolStore = create<ToolState>((set) => ({
  activeTool: null,
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
