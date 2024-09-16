import { useState, useEffect } from 'react';

const useLoadScript = (url) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already added
    const existingScript = document.querySelector(`script[src="${url}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;

      script.onload = () => {
        setScriptLoaded(true);
      };

      script.onerror = () => {
        console.error(`Failed to load script: ${url}`);
        setScriptLoaded(false);
      };

      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }

    // Cleanup function
    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', () => setScriptLoaded(true));
      }
    };
  }, [url]);

  return scriptLoaded;
};

export default useLoadScript;
