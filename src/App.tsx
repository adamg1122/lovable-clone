import React, { useState, useEffect } from 'react';
import PromptPanel from './PromptPanel';
import LivePreview from './LivePreview';
import CodeOutput from './CodeOutput';
import DownloadButton from './DownloadButton';

function App() {
  // Hold parsed multi-file responses
  const [files, setFiles] = useState<Record<string, string>>({});
  // The code string for preview & download (using index.html by default)
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  // When files update, use index.html content for preview and code output
  useEffect(() => {
    if (files['index.html']) {
      setCode(files['index.html']);
    }
  }, [files]);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* PromptPanel now sets multiple files */}
      <PromptPanel setFiles={setFiles} />

      <div style={{ flex: 1, position: 'relative' }}>
        {/* Action buttons: toggle code view and download */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              backgroundColor: '#0f172a',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
          <DownloadButton code={code} />
        </div>

        <div style={{
          width: '100%',
          height: '100%',
          opacity: 1,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          {showCode ? <CodeOutput code={code} /> : <LivePreview code={code} />}
        </div>
      </div>
    </div>
  );
}

export default App;
