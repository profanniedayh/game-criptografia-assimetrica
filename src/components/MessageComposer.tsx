import React, { useState, useEffect } from 'react';
import { Send, Lock, ArrowRight } from 'lucide-react';

interface MessageComposerProps {
  onSend: (text: string) => void;
  publicKey: string;
  encrypt: (text: string, key: string) => string;
}

export default function MessageComposer({ onSend, publicKey, encrypt }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (message) {
      setPreview(encrypt(message, publicKey));
    } else {
      setPreview('');
    }
  }, [message, publicKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Compose Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Original Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-black bg-opacity-50 p-3 rounded text-white"
            placeholder="Type your message here..."
          />
        </div>

        {message && (
          <div className="relative">
            <div className="absolute inset-y-0 left-1/2 -ml-4 flex items-center">
              <ArrowRight className="w-8 h-8 text-purple-400" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Lock className="w-4 h-4" />
                  Encrypted with Public Key:
                </div>
                <code className="block bg-black bg-opacity-50 p-3 rounded break-all">
                  {preview}
                </code>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Encrypted Message
        </button>
      </form>
    </div>
  );
}