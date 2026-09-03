import { useEffect, useState } from 'react';
import { useWorkspaceStore } from './store/workspaceStore';
import { apiClient } from './api/client';
import { Workbench } from './workbench/Workbench';
import { ProjectOpen } from './project-bootstrap/ProjectOpen';
import './App.css';

function App() {
  const { projectId } = useWorkspaceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await apiClient.get('/control/health');
        setBackendReady(true);
      } catch (error) {
        console.error('Backend not available:', error);
        setBackendReady(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBackend();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <div className="text-white text-center">
          <div className="mb-4 text-2xl font-orbitron">FREEBUFF</div>
          <div className="text-red-500 border-2 border-red-500 px-4 py-2 rounded">Loading...</div>
        </div>
      </div>
    );
  }

  if (!backendReady) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <div className="text-white text-center">
          <div className="mb-4 text-2xl font-orbitron">FREEBUFF</div>
          <div className="text-red-500 border-2 border-red-500 px-4 py-2 rounded">
            Backend not available
          </div>
          <div className="text-gray-400 mt-4 text-sm">Make sure backend is running on port 3001</div>
        </div>
      </div>
    );
  }

  if (!projectId) {
    return <ProjectOpen />;
  }

  return <Workbench />;
}

export default App;
