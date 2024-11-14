import React, { useState, useEffect } from 'react';
import { Shield, Key, Users } from 'lucide-react';
import PrivateKeyReveal from './PrivateKeyReveal';
import ChatComposer from './ChatComposer';
import ChatMessage from './ChatMessage';
import { generateRandomKey } from '../utils/crypto';

interface Message {
  id: number;
  sender: string;
  text: string;
  encrypted: string;
  decrypted: boolean;
}

interface Player {
  username: string;
  publicKey: string;
  privateKey: string;
  hasSeenKey: boolean;
}

export default function CryptoChat() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [joiningPlayer, setJoiningPlayer] = useState<string>('');
  
  const handleJoinGame = (username: string) => {
    const newPublicKey = generateRandomKey();
    const newPrivateKey = generateRandomKey();
    
    const newPlayer: Player = {
      username,
      publicKey: newPublicKey,
      privateKey: newPrivateKey,
      hasSeenKey: false
    };
    
    setPlayers(prev => [...prev, newPlayer]);
    setShowPrivateKey(true);
    
    setTimeout(() => {
      setShowPrivateKey(false);
      setPlayers(prev => 
        prev.map(p => 
          p.username === username ? { ...p, hasSeenKey: true } : p
        )
      );
    }, 5000);
  };

  const handleSendMessage = (text: string, encrypted: string) => {
    const newMessage = {
      id: Date.now(),
      sender: players[currentPlayer].username,
      text,
      encrypted,
      decrypted: false,
    };
    setMessages(prev => [...prev, newMessage]);
    setCurrentPlayer(prev => (prev + 1) % players.length);
  };

  if (players.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex items-center justify-center p-8">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold">Secure Chat Game</h1>
              <p className="text-sm opacity-75">Player {players.length + 1} of 2</p>
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full bg-black bg-opacity-50 p-3 rounded text-white mb-4"
            value={joiningPlayer}
            onChange={(e) => setJoiningPlayer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && joiningPlayer && handleJoinGame(joiningPlayer)}
          />
          
          <button
            onClick={() => joiningPlayer && handleJoinGame(joiningPlayer)}
            disabled={!joiningPlayer}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg transition"
          >
            Join Game
          </button>
        </div>
      </div>
    );
  }

  const currentPlayerData = players[currentPlayer];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8">
      {showPrivateKey && players.length > 0 && (
        <PrivateKeyReveal 
          privateKey={players[players.length - 1].privateKey} 
          timeLeft={5}
          username={players[players.length - 1].username}
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Secure Chat Game</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-purple-800 px-4 py-2 rounded-lg">
              Current Turn: {currentPlayerData.username}
            </div>
            <div className="flex items-center gap-2 bg-purple-800 px-4 py-2 rounded-lg">
              <Key className="w-4 h-4" />
              <code className="text-sm">{currentPlayerData.publicKey}</code>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 h-[500px] overflow-y-auto">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.sender === players[currentPlayer].username}
              privateKey={players[currentPlayer].privateKey}
              recipient={players[(currentPlayer + 1) % players.length].username}
            />
          ))}
        </div>

        <ChatComposer
          onSend={handleSendMessage}
          publicKey={players[(currentPlayer + 1) % players.length].publicKey}
          disabled={!players[currentPlayer].hasSeenKey}
          recipient={players[(currentPlayer + 1) % players.length].username}
        />
      </div>
    </div>
  );
}