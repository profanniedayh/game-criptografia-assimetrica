import React, { useEffect, useState } from 'react';
import { Key, AlertTriangle } from 'lucide-react';

interface PrivateKeyRevealProps {
  privateKey: string;
  timeLeft: number;
  username: string;
}

export default function PrivateKeyReveal({ privateKey, timeLeft, username }: PrivateKeyRevealProps) {
  const [countdown, setCountdown] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-800 p-8 rounded-lg max-w-md w-full">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Private Key Reveal</h2>
            <p className="text-sm text-gray-600">For {username}</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          This key will disappear in {countdown} seconds. You'll need it to decrypt messages sent to you!
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Your Private Key:</span>
          </div>
          <code className="block text-lg font-mono bg-white p-3 rounded border-2 border-purple-200 text-center">
            {privateKey}
          </code>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Write this down or memorize it - you won't see it again!
        </p>
      </div>
    </div>
  );
}