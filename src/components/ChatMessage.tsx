import React, { useState } from 'react';
import { Lock, Unlock, Send } from 'lucide-react';
import { decrypt } from '../utils/crypto';

interface ChatMessageProps {
  message: {
    sender: string;
    encrypted: string;
    decrypted: boolean;
    text: string;
  };
  isOwn: boolean;
  privateKey: string;
  recipient: string;
}

export default function ChatMessage({ message, isOwn, privateKey, recipient }: ChatMessageProps) {
  const [attemptedKey, setAttemptedKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    try {
      if (attemptedKey === privateKey) {
        const decrypted = decrypt(message.encrypted, privateKey);
        setDecryptedText(decrypted);
        setIsDecrypted(true);
        setError('');
      } else {
        setError('Incorrect private key');
      }
    } catch {
      setError('Decryption failed');
    }
  };

  const alignmentClass = isOwn ? 'ml-auto' : 'mr-auto';
  const bgClass = isOwn ? 'bg-purple-600' : 'bg-indigo-600';

  return (
    <div className={`max-w-[80%] ${alignmentClass} mb-4`}>
      <div className={`${bgClass} rounded-lg p-4`}>
        <div className="flex justify-between text-sm opacity-75 mb-2">
          <span>From: {message.sender}</span>
          <span>To: {isOwn ? recipient : 'You'}</span>
        </div>
        
        {isDecrypted ? (
          <div className="flex items-center gap-2 mb-2">
            <Unlock className="w-4 h-4 text-green-300" />
            <span>{decryptedText}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              <code className="text-sm break-all">{message.encrypted}</code>
            </div>
            
            {!isOwn && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter private key to decrypt"
                  value={attemptedKey}
                  onChange={(e) => setAttemptedKey(e.target.value)}
                  className="w-full bg-black bg-opacity-30 p-2 rounded text-white text-sm mb-2"
                />
                {error && <div className="text-red-300 text-sm mb-2">{error}</div>}
                <button
                  onClick={handleDecrypt}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition flex items-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Decrypt Message
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}