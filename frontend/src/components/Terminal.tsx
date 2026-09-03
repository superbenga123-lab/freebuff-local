export function Terminal() {
  return (
    <div className="flex flex-col h-full bg-black">
      <div className="p-3 border-b border-red-500 font-orbitron text-sm text-white">Terminal</div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-green-400 bg-black">
        <div>$ Terminal ready</div>
      </div>
      <div className="p-2 border-t border-red-500">
        <input
          type="text"
          placeholder="$ command"
          className="w-full bg-black border border-red-500 text-green-400 px-3 py-1 rounded text-sm focus:outline-none font-mono"
        />
      </div>
    </div>
  );
}
