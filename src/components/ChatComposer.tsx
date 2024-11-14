import React, { useState } from 'react';
import { Send, Lock } from 'lucide-react';
import { encrypt } from '../utils/crypto';

interface ChatComposerProps {
  onSend: (text: string, encrypted: string) => void;
  publicKey: string;
  disabled: boolean;
  recipient: string;
}

export default function ChatComposer({ onSend, publicKey, disabled, recipient }: ChatComposerProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const encrypted = encrypt(message, publicKey);
      onSend(message, encrypted);
      setMessage('');
    }
  };

  if (disabled) {
    return (
      <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
        <Lock className="w-6 h-6 mx-auto mb-2" />
        <p>Wait for your private key to be revealed...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-6 rounded-lg">
      <div className="text-sm mb-4">
        Sending to: <span className="font-semibold">{recipient}</span>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your secure message..."
          className="flex-1 bg-black bg-opacity-50 p-3 rounded text-white"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </form>
  );
}