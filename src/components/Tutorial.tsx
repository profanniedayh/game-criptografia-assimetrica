import React from 'react';
import { Brain, Key, Lock, Unlock } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

export default function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-800 p-8 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          Welcome to Crypto Challenge!
        </h2>
        <p className="mb-4">Experience asymmetric cryptography in action:</p>
        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-3">
            <Key className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <strong>Key Pairs:</strong> Each player gets a public and private key pair
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <strong>Write & Encrypt:</strong> Type messages and see them get encrypted with your public key
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Unlock className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <strong>Decrypt:</strong> Use your private key to decrypt messages and earn points
            </div>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}