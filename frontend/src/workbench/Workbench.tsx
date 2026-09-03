import { useWorkspaceStore } from '../store/workspaceStore';
import { FileExplorer } from '../components/FileExplorer';
import { Editor } from '../components/Editor';
import { ChatPanel } from '../components/ChatPanel';
import { Terminal } from '../components/Terminal';
import { Preview } from '../components/Preview';

export function Workbench() {
  const { projectId, activeFile } = useWorkspaceStore();

  if (!projectId) {
    return <div>No project loaded</div>;
  }

  return (
    <div className="flex w-full h-full bg-black">
      <div className="flex-1 flex border-r border-red-500">
        <div className="w-64 border-r border-red-500 overflow-y-auto">
          <FileExplorer />
        </div>
        
        <div className="flex-1 border-r border-red-500 overflow-hidden">
          {activeFile ? <Editor /> : <div className="flex items-center justify-center h-full text-gray-400">Select a file</div>}
        </div>
      </div>

      <div className="w-1/3 flex flex-col">
        <div className="flex-1 border-b border-red-500 overflow-hidden">
          <Preview />
        </div>
        
        <div className="h-1/4 border-b border-red-500 overflow-hidden">
          <Terminal />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-1/3 h-1/4 border-t border-red-500 border-r bg-black">
        <ChatPanel />
      </div>
    </div>
  );
}
