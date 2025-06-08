// src/FileExplorer.tsx
import React from 'react';

interface FileExplorerProps {
  files: Record<string, string>;
  activeFile: string;
  setActiveFile: (name: string) => void;
  code: string;
  onEdit: (newContent: string) => void;
  showCode: boolean;
}

const FileExplorer = ({
  files,
  activeFile,
  setActiveFile,
  code,
  onEdit,
  showCode
}: FileExplorerProps) => (
  <div style={{
    width: '300px',
    borderRight: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <h3 style={{
      padding: '1rem',
      margin: 0,
      backgroundColor: '#e2e8f0'
    }}>Files</h3>
    <ul style={{
      listStyle: 'none',
      padding: '0 1rem',
      margin: 0,
      flex: 1,
      overflowY: 'auto'
    }}>
      {Object.keys(files).map(name => (
        <li
          key={name}
          onClick={() => setActiveFile(name)}
          style={{
            padding: '0.5rem',
            cursor: 'pointer',
            backgroundColor: name === activeFile ? '#cbd5e1' : 'transparent'
          }}
        >
          {name}
        </li>
      ))}
    </ul>

    {showCode && (
      <textarea
        value={code}
        onChange={e => onEdit(e.target.value)}
        style={{
          width: '100%',
          height: '30%',
          border: 'none',
          padding: '1rem',
          fontFamily: 'monospace'
        }}
      />
    )}
  </div>
);

export default FileExplorer;
