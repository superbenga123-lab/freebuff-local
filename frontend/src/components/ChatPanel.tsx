export function ChatPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-red-500 font-orbitron text-sm text-white">Chat</div>
      <div className="flex-1 overflow-y-auto p-4 text-gray-400 text-sm">Chat messages will appear here</div>
      <div className="p-3 border-t border-red-500">
        <input
          type="text"
          placeholder="Ask Freebuff..."
          className="w-full bg-black border border-red-500 text-white px-3 py-2 rounded text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
