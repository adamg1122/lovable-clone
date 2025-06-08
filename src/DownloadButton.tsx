import React from 'react';

const DownloadButton = ({ code }: { code: string }) => {
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        backgroundColor: '#10b981',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}
    >
      Download HTML
    </button>
  );
};

export default DownloadButton;
