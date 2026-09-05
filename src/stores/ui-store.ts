import { create } from 'zustand';

type UiState = {
  isOffline: boolean;
  setOffline: (isOffline: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isOffline: false,
  setOffline: (isOffline) => set({ isOffline }),
}));
