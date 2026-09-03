import { useEffect, useState } from 'react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { filesApi } from '../api/files';
import { ChevronRight } from 'lucide-react';

interface FileItem {
  type: 'file' | 'directory';
  name: string;
  path: string;
  children?: FileItem[];
}

function FileTreeItem({ item, level = 0 }: { item: FileItem; level?: number }) {
  const [expanded, setExpanded] = useState(false);
  const { setActiveFile } = useWorkspaceStore();

  const handleClick = () => {
    if (item.type === 'directory') {
      setExpanded(!expanded);
    } else {
      setActiveFile(item.path);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center py-1 px-2 hover:bg-gray-900 cursor-pointer text-sm"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {item.type === 'directory' && (
          <ChevronRight
            size={16}
            className={`mr-1 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        )}
        <span className="text-white">{item.name}</span>
      </div>
      
      {item.type === 'directory' && expanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem key={child.path} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </>
  );
}

export function FileExplorer() {
  const { projectId, fileTree } = useWorkspaceStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const loadTree = async () => {
      try {
        setLoading(true);
        const result = await filesApi.getTree(projectId);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load files');
      } finally {
        setLoading(false);
      }
    };

    loadTree();
  }, [projectId]);

  if (loading) return <div className="p-4 text-gray-400">Loading...</div>;
  if (error) return <div className="p-4 text-red-400 text-xs">{error}</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-red-500 font-orbitron text-sm text-white">Explorer</div>
      <div className="flex-1 overflow-y-auto">
        {fileTree.map((item) => (
          <FileTreeItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
}
