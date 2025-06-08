import React from 'react';

const CodeOutput = ({ code }: { code: string }) => {
  return (
    <div style={{
      height: '100%',
      padding: '1rem',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      overflowY: 'scroll',
      fontFamily: 'monospace'
    }}>
      <pre style={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontSize: '0.9rem'
      }}>{code}</pre>
    </div>
  );
};

export default CodeOutput;
