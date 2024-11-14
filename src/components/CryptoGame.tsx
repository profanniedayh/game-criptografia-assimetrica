import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Tutorial from './Tutorial';
import KeyDisplay from './KeyDisplay';
import Message from './Message';
import MessageComposer from './MessageComposer';
import { generateRandomKey, encrypt, decrypt } from '../utils/crypto';

interface Message {
  id: number;
  text: string;
  encrypted: string;
  solved: boolean;
}

export default function CryptoGame() {
  const [score, setScore] = useState(0);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [level, setLevel] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);

  const generateKeyPair = () => {
    setPublicKey(generateRandomKey());
    setPrivateKey(generateRandomKey());
  };

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      encrypted: encrypt(text, publicKey),
      solved: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleDecrypt = (id: number) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === id && !msg.solved) {
        const decrypted = decrypt(msg.encrypted, privateKey);
        if (decrypted === msg.text) {
          setScore(s => s + 10);
          return { ...msg, solved: true };
        }
      }
      return msg;
    }));
  };

  useEffect(() => {
    generateKeyPair();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8">
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-3xl font-bold">Crypto Challenge</div>
          <div className="flex items-center gap-4">
            <div className="bg-purple-800 px-4 py-2 rounded-lg">
              Level: {level}
            </div>
            <div className="bg-purple-800 px-4 py-2 rounded-lg">
              Score: {score}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <KeyDisplay title="Public Key" value={publicKey} variant="public" />
          <KeyDisplay title="Private Key" value={privateKey} variant="private" />
        </div>

        <MessageComposer 
          onSend={handleSendMessage}
          publicKey={publicKey}
          encrypt={encrypt}
        />

        <div className="space-y-4">
          {messages.map(message => (
            <Message
              key={message.id}
              id={message.id}
              text={message.text}
              encrypted={message.encrypted}
              solved={message.solved}
              onDecrypt={handleDecrypt}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={generateKeyPair}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate New Key Pair
          </button>
        </div>
      </div>
    </div>
  );
}