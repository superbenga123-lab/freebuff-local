import { useState } from 'react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { projectsApi } from '../api/projects';
import { filesApi } from '../api/files';

export function ProjectOpen() {
  const [path, setPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setProjectId, setFileTree } = useWorkspaceStore();

  const handleOpenProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path) return;

    setLoading(true);
    setError(null);

    try {
      const result = await projectsApi.open(path);
      const projectId = result.data.projectId;
      
      setProjectId(projectId);
      
      const tree = await filesApi.getTree(projectId);
      setFileTree(tree.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to open project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="border-2 border-red-500 p-8 rounded w-96">
        <h1 className="text-2xl font-orbitron text-white mb-6">FREEBUFF</h1>
        
        <form onSubmit={handleOpenProject}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Project Path</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/path/to/project"
              className="w-full bg-black border border-red-500 text-white px-3 py-2 rounded focus:outline-none focus:border-red-300"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-900 border border-red-500 text-red-200 text-sm rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || !path}
            className="w-full bg-red-600 text-white py-2 rounded font-orbitron hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Opening...' : 'Open Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
