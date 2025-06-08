import React, { useEffect, useRef } from 'react';

const LivePreview = ({ code }: { code: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Live Preview"
    />
  );
};

export default LivePreview;
