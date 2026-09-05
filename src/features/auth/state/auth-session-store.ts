import type { AuthSession } from '@/features/auth/types';
import { create } from 'zustand';

type AuthSessionState = {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  signOut: () => void;
};

export const useAuthSessionStore = create<AuthSessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signOut: () => set({ session: null }),
}));
