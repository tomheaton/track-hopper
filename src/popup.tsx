import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const SERVICES = {
  spotify: "https://open.spotify.com/",
  deezer: "https://www.deezer.com/",
  appleMusic: "https://music.apple.com/",
  youtube: "https://www.youtube.com/",
} as const;

function Popup() {
  const [count, setCount] = useState<number>(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  function changeStreamingService(name: keyof typeof SERVICES) {
    chrome.tabs.create({ url: SERVICES[name] });
  }

  return (
    <>
      <ul>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button onClick={() => setCount(count + 1)}>count</button>
      {Object.keys(SERVICES).map((key) => (
        <button
          key={key}
          onClick={() => changeStreamingService(key as keyof typeof SERVICES)}
        >
          {key}
        </button>
      ))}
    </>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
