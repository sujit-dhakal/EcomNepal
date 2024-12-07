"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const ChatInterface = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentMessage,
          session_id: sessionId,
          model: "gpt-4o-mini",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const aiMessage: Message = {
        text: data.answer,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "Sorry, something went wrong. Please try again.",
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      if (!prev) {
        setSessionId(uuidv4());
        setMessages([]);
      }
      return !prev;
    });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        isMinimized ? "w-[100px] h-[100px]" : "w-[450px] h-[600px]"
      } flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg transition-all`}
    >
      {isMinimized ? (
        <button
          className="w-full h-full flex items-center justify-center bg-black text-white rounded-lg"
          onClick={toggleMinimize}
        >
          Chatbot Support
        </button>
      ) : (
        <>
          {/* Chat Header with Minimize Button */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat Interface
            </h2>
            <button
              onClick={toggleMinimize}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Message Display Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`
                  max-w-[80%] p-3 rounded-lg
                  ${
                    message.sender === "user"
                      ? "bg-blue-100 ml-auto text-right rounded-br-none"
                      : "bg-gray-100 mr-auto text-left rounded-bl-none"
                  }
                `}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500 italic">
                Thinking...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4 flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
