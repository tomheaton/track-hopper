import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

type Options = {
  showSpotify: boolean;
  showDeezer: boolean;
  showAppleMusic: boolean;
  showYouTube: boolean;
};

const DEFAULT_OPTIONS: Options = {
  showSpotify: true,
  showDeezer: true,
  showAppleMusic: true,
  showYouTube: true,
};

function Options() {
  const [status, setStatus] = useState<string>("");
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);

  useEffect(() => {
    chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
      setOptions((prev) => ({ ...prev, items }));
    });
  }, []);

  function saveOptions() {
    chrome.storage.sync.set(options, () => {
      setStatus("Options Saved!");
      const timeout = setTimeout(() => {
        setStatus("");
      }, 1000);
      return () => clearTimeout(timeout);
    });
  }

  return (
    <>
      <div>
        {Object.keys(options).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={options[key as keyof Options]}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, [key]: e.target.checked }))
              }
            />
            {key}
          </label>
        ))}
      </div>
      {status && <p>{status}</p>}
      <button onClick={saveOptions}>Save</button>
    </>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
