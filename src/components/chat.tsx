'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatApiService } from '@/lib/api';
import { formatTime } from '@/lib/utils';
import type { Message } from '@/types';

const POLL_INTERVAL = Number(process.env.NEXT_PUBLIC_POLL_INTERVAL) || 30000;

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // Load messages on mount and set up polling
  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const savedAuthor = localStorage.getItem('chatAuthor');
    if (savedAuthor) {
      setAuthor(savedAuthor);
    }
  }, []);



  const loadMessages = async () => {
    try {
      const fetchedMessages = await ChatApiService.getMessages();
      setMessages(fetchedMessages);
      setError(null);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !author.trim()) {
      return;
    }

    setIsSending(true);

    try {
      await ChatApiService.postMessage({ message: newMessage.trim(), author: author.trim() });
      localStorage.setItem('chatAuthor', author.trim());
      setNewMessage('');
      scrollToBottom();
      await loadMessages();
      inputRef.current?.focus();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-image.png')" }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
        <div className="flex flex-col gap-3">
          {error && (
            <div role="alert" className="relative z-10 mx-4 mt-2 rounded-lg bg-red-50 px-4 py-2 text-xs text-red-500 shadow-sm">
              {error}
            </div>
          )}
          {messages.length === 0 && (
            <p className="mt-16 text-center text-sm text-gray-400">No messages yet. Say hello! 👋</p>
          )}

          {messages.map((message) => {
            const isMe = message.author === author;
            return (
              <div key={message._id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={[
                    'max-w-[72%] rounded-2xl px-4 py-2.5 shadow-sm',
                    isMe
                      ? 'rounded-tr-sm bg-[#d9f7be]'
                      : 'rounded-tl-sm bg-white',
                  ].join(' ')}
                >

                  {!isMe && (
                    <p className="mb-0.5 text-xs font-semibold text-gray-400">{message.author}</p>
                  )}

                  <p className="text-[15px] font-medium leading-snug text-gray-900">{message.message}</p>

                  <p className={`mt-1 text-[10px] text-gray-400 ${isMe ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}

          <div
            ref={messagesEndRef}
            className="  py-6"
          ></div>
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0 bg-[#1b9adb] px-3 py-6">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            maxLength={1000}
            aria-label="Message"
            className="flex-1 rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim() || !author.trim()}
            aria-label="Send message"
            className={[
              'rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all',
              newMessage.trim() && author.trim()
                ? 'bg-[#f4603a] hover:bg-[#e04e28] active:scale-95'
                : 'cursor-not-allowed bg-[#f4603a]/50',
            ].join(' ')}
          >
            {isSending ? '…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
