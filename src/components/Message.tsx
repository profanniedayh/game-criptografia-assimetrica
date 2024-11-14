import React from 'react';
import { Lock, Unlock, Send } from 'lucide-react';

interface MessageProps {
  id: number;
  text: string;
  encrypted: string;
  solved: boolean;
  onDecrypt: (id: number) => void;
}

export default function Message({ id, text, encrypted, solved, onDecrypt }: MessageProps) {
  return (
    <div
      className={`bg-white bg-opacity-10 p-6 rounded-lg transition ${
        solved ? 'border-2 border-green-500' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        {solved ? (
          <Unlock className="w-6 h-6 text-green-400" />
        ) : (
          <Lock className="w-6 h-6 text-red-400" />
        )}
        <h3 className="text-lg font-semibold">
          {solved ? 'Decrypted Message' : 'Encrypted Message'}
        </h3>
      </div>
      
      <code className="block bg-black bg-opacity-50 p-3 rounded mb-4">
        {solved ? text : encrypted}
      </code>
      
      {!solved && (
        <button
          onClick={() => onDecrypt(id)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Attempt Decryption
        </button>
      )}
    </div>
  );
}