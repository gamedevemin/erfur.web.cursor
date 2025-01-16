import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: number | string;
  text: string;
  sender: 'user' | 'admin' | 'system';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high';
}

interface ChatStore {
  messages: Message[];
  unreadCount: number;
  isAdminMode: boolean;
  notifications: Message[];
  addMessage: (message: Message) => void;
  markAsRead: (messageId: number | string) => void;
  toggleAdminMode: () => void;
  clearNotifications: () => void;
  addNotification: (message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      unreadCount: 0,
      isAdminMode: false,
      notifications: [],
      
      addMessage: (message) => set((state) => {
        const newUnreadCount = message.sender !== 'user' ? state.unreadCount + 1 : state.unreadCount;
        return {
          messages: [...state.messages, message],
          unreadCount: newUnreadCount,
        };
      }),

      markAsRead: (messageId) => set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      })),

      toggleAdminMode: () => set((state) => ({
        isAdminMode: !state.isAdminMode,
      })),

      clearNotifications: () => set({ notifications: [] }),

      addNotification: (message) => set((state) => ({
        notifications: [...state.notifications, message],
      })),
    }),
    {
      name: 'chat-storage',
    }
  )
);