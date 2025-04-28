
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { email: string } | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email, password) => {
        // Hardcoded credentials as requested
        if (email === 'h2307190100015@gmail.com' && password === 'amitkumar123') {
          set({ user: { email }, isLoggedIn: true });
          return { success: true, message: 'Login successful! Welcome back, Amit.' };
        }
        return { success: false, message: 'Invalid email or password.' };
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
