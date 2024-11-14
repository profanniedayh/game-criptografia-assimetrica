// Simplified crypto functions for educational purposes
export const generateRandomKey = () => {
  const length = 12;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
};

export const encrypt = (text: string, key: string) => {
  // For educational purposes, we're using a simple reversible encryption
  // In real applications, use proper cryptographic libraries
  const encoded = new TextEncoder().encode(text);
  const base64 = btoa(String.fromCharCode(...encoded));
  return base64.split('').reverse().join('');
};

export const decrypt = (text: string, key: string) => {
  // Reverse the encryption process
  const reversed = text.split('').reverse().join('');
  const decoded = atob(reversed);
  return decoded;
};