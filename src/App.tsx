import React, { useState, useEffect } from 'react';
import PromptPanel from './PromptPanel';
import LivePreview from './LivePreview';
import DownloadButton from './DownloadButton';
import { parseMultiFileResponse } from './utils/parser';
import FileExplorer from './FileExplorer';

function App() {
  // Map of filename -> content
  const [files, setFiles] = useState<Record<string, string>>({});
  // Currently selected file in the explorer
  const [activeFile, setActiveFile] = useState<string>('index.html');
  // Content of active file for preview & download
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  // When files update, ensure active file exists & update code
  useEffect(() => {
    if (files[activeFile]) {
      setCode(files[activeFile]);
    } else if (files['index.html']) {
      setActiveFile('index.html');
    }
  }, [files, activeFile]);

  // Handle file content edits
  const handleEdit = (newContent: string) => {
    setFiles(prev => ({ ...prev, [activeFile]: newContent }));
    setCode(newContent);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Prompt Panel for generating project files */}
      <PromptPanel setFiles={setFiles} />

      {/* File Explorer & Editor */}
      <FileExplorer
        files={files}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        code={code}
        onEdit={handleEdit}
        showCode={showCode}
      />

      {/* Live Preview and Actions */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowCode(!showCode)}
            style={{ backgroundColor: '#0f172a', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
          <DownloadButton code={code} />
        </div>
        <div style={{ width: '100%', height: '100%', opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
          {showCode ? <pre style={{ padding: '1rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{code}</pre>
                    : <LivePreview code={code} />}
        </div>
      </div>
    </div>
  );
}

export default App;
