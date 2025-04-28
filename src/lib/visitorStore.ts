
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface VisitorState {
  visitorCount: number;
  hasVisited: boolean;
  subscribers: Subscriber[];
  incrementVisitor: () => void;
  addSubscriber: (email: string) => { success: boolean; message: string };
  getTotalSubscribers: () => number;
}

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set, get) => ({
      visitorCount: 0,
      hasVisited: false,
      subscribers: [],
      
      incrementVisitor: () => {
        // Only increment if this is a new session
        if (!get().hasVisited) {
          set(state => ({ 
            visitorCount: state.visitorCount + 1,
            hasVisited: true
          }));
        }
      },
      
      addSubscriber: (email) => {
        const normalizedEmail = email.toLowerCase().trim();
        const existingSubscriber = get().subscribers.find(
          sub => sub.email.toLowerCase() === normalizedEmail
        );
        
        if (existingSubscriber) {
          return {
            success: false,
            message: "This email is already subscribed."
          };
        }
        
        set(state => ({
          subscribers: [
            ...state.subscribers,
            {
              id: uuidv4(),
              email: normalizedEmail,
              subscribedAt: new Date().toISOString()
            }
          ]
        }));
        
        return {
          success: true,
          message: "Thank you for subscribing!"
        };
      },
      
      getTotalSubscribers: () => {
        return get().subscribers.length;
      }
    }),
    {
      name: 'visitor-storage'
    }
  )
);
