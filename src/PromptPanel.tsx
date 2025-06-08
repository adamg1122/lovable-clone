import React, { useState } from 'react';
import { fetchGeneratedCode } from './api';

const PromptPanel = ({ setCode }: { setCode: (code: string) => void }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    const response = await fetchGeneratedCode(prompt);
    setCode(response);
  };

  return (
    <div style={{
      width: '320px',
      padding: '1rem',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Your Prompt</h2>
      <textarea
        style={{
          width: '100%',
          height: '180px',
          padding: '0.75rem',
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          border: 'none',
          borderRadius: '8px',
          resize: 'vertical'
        }}
        value={prompt}
        placeholder="Describe your idea here..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        style={{
          backgroundColor: '#3b82f6',
          border: 'none',
          padding: '0.75rem',
          borderRadius: '8px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Generate
      </button>
    </div>
  );
};

export default PromptPanel;
