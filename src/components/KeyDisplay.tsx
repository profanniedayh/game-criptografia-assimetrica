import React from 'react';
import { Key } from 'lucide-react';

interface KeyDisplayProps {
  title: string;
  value: string;
  variant: 'public' | 'private';
}

export default function KeyDisplay({ title, value, variant }: KeyDisplayProps) {
  const bgColor = variant === 'public' ? 'bg-indigo-800' : 'bg-purple-800';
  
  return (
    <div className={`${bgColor} bg-opacity-50 p-6 rounded-lg`}>
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <code className="block bg-black bg-opacity-50 p-3 rounded">
        {value}
      </code>
    </div>
  );
}