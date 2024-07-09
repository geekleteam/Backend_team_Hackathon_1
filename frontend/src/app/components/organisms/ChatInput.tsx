import React, { useState } from "react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl overflow-auto min-h-[200px]">
      <label htmlFor="chat" className="block text-white mb-2">
        Tell me more about your project:
      </label>
      <input
        type="text"
        id="chat"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-1/2 p-2 rounded-lg bg-gray-700 text-white"
      />
    </form>
  );
};

export default ChatInput;
