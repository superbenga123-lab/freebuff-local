import { useWorkspaceStore } from '../store/workspaceStore';
import { useEffect, useState } from 'react';
import { filesApi } from '../api/files';

export function Editor() {
  const { projectId, activeFile } = useWorkspaceStore();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || !activeFile) return;

    const loadFile = async () => {
      try {
        setLoading(true);
        const result = await filesApi.read(projectId, activeFile);
        setContent(result.data.content);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load file');
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [projectId, activeFile]);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>;
  if (error) return <div className="p-4 text-red-400 text-sm">{error}</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-red-500 font-orbitron text-sm text-white flex items-center justify-between">
        <span>{activeFile}</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-black text-green-400 p-4 font-mono text-sm focus:outline-none resize-none"
        placeholder="Select a file to edit"
      />
    </div>
  );
}
