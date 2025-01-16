import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bell, Shield, CheckCircle2 } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';
import { supabase } from '../lib/supabase';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    addMessage, 
    unreadCount, 
    isAdminMode, 
    toggleAdminMode, 
    markAsRead,
    notifications,
    addNotification,
    clearNotifications 
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Supabase gerçek zamanlı dinleyici
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = {
              id: payload.new.id,
              text: payload.new.text,
              sender: payload.new.sender,
              timestamp: payload.new.created_at,
              read: false,
              priority: payload.new.priority || 'normal'
            };

            // Yeni mesaj bildirimi
            if (payload.new.sender === 'admin' && !isOpen) {
              addNotification(newMessage);
              // Tarayıcı bildirimi
              if (Notification.permission === 'granted') {
                new Notification('Yeni Mesaj', {
                  body: payload.new.text,
                  icon: '/logo.png'
                });
              }
            }

            addMessage(newMessage);
          }
        }
      )
      .on('presence', { event: 'sync' }, () => {
        // Kullanıcı durumu senkronizasyonu
      })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        setIsTyping(payload.isTyping);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addMessage, isOpen, addNotification]);

  // Bildirim izinleri
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const timestamp = new Date().toISOString();
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: isAdminMode ? 'admin' : 'user',
      timestamp,
      read: false,
      priority: 'normal'
    };

    try {
      // Mesajı Supabase'e kaydet
      const { error } = await supabase
        .from('messages')
        .insert([{
          text: message,
          sender: isAdminMode ? 'admin' : 'user',
          read: false,
          priority: 'normal',
          email: isAdminMode ? 'admin@erfur.com' : 'ziyaretci@erfur.com'
        }]);

      if (error) throw error;

      addMessage(newMessage);
      setMessage('');

      // Email bildirimi gönder
      if (!isAdminMode) {
        await supabase.functions.invoke('send-notification', {
          body: { 
            message: newMessage.text,
            timestamp: newMessage.timestamp
          }
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Hata bildirimi göster
      addNotification({
        id: Date.now(),
        text: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
        sender: 'system',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high'
      });
    }
  };

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    const channel = supabase.channel('messages');
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: { isTyping: e.target.value.length > 0 }
    });
  };

  return (
    <>
      {/* Bildirim Badge'i */}
      {!isOpen && unreadCount > 0 && (
        <div className="fixed bottom-16 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {unreadCount}
        </div>
      )}

      {/* Admin Modu Göstergesi */}
      {isAdminMode && (
        <div className="fixed bottom-16 right-16 bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1">
          <Shield className="w-4 h-4" />
          Admin Modu
        </div>
      )}

      {/* Chat Butonu */}
      <button
        onClick={() => {
          setIsOpen(true);
          clearNotifications();
        }}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Bildirimler */}
      {notifications.length > 0 && !isOpen && (
        <div className="fixed bottom-24 right-4 w-80 bg-background rounded-lg shadow-xl z-50 border">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-3 border-b last:border-b-0">
              <p className="text-sm">{notification.text}</p>
              <span className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chat Penceresi */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-background rounded-lg shadow-xl z-50 border">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">
                ERFUR {isAdminMode ? 'Admin Panel' : 'Müşteri Desteği'}
              </h3>
              <button
                onClick={toggleAdminMode}
                className="p-1 rounded-full hover:bg-gray-100"
                title={isAdminMode ? 'Admin Modunu Kapat' : 'Admin Modunu Aç'}
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground/60 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === (isAdminMode ? 'admin' : 'user') ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === (isAdminMode ? 'admin' : 'user')
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                    {msg.read && <CheckCircle2 className="w-3 h-3 opacity-75" />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-gray-500">
                Karşı taraf yazıyor...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                placeholder={isAdminMode ? 'Admin olarak yanıtla...' : 'Mesajınızı yazın...'}
                className="flex-1 bg-background text-foreground border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}