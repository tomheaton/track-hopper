import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const SERVICES_NEW: {
  key: string;
  domain: string;
  link: string;
  label: string;
}[] = [
  {
    key: "spotify",
    domain: "open.spotify.com",
    link: "https://open.spotify.com/",
    label: "Spotify",
  },
  {
    key: "deezer",
    domain: "deezer.com",
    link: "https://deezer.com/",
    label: "Deezer",
  },
  {
    key: "appleMusic",
    domain: "music.apple.com",
    link: "https://music.apple.com/",
    label: "Apple Music",
  },
  // TODO: add support for youtube music
  // {
  //   key: "youtubeMusic",
  //   domain: "music.youtube.com",
  //   link: "https://music.youtube.com/",
  //   label: "YouTube Music",
  // },
  // TODO: add support for youtube
  // {
  //   key: "youtube",
  //   domain: "youtube.com",
  //   link: "https://youtube.com/",
  //   label: "YouTube",
  // },
  // TODO: add support for tidal
  // {
  //   key: "tidal",
  //   domain: "tidal.com",
  //   link: "https://tidal.com/",
  //   label: "Tidal",
  // },
];

// TODO: swap to SERVICES_NEW
const SERVICES = {
  spotify: {
    key: "spotify",
    domain: "open.spotify.com",
    link: "https://open.spotify.com/",
    label: "Spotify",
  },
  deezer: {
    key: "deezer",
    domain: "deezer.com",
    link: "https://deezer.com/",
    label: "Deezer",
  },
  appleMusic: {
    key: "appleMusic",
    domain: "music.apple.com",
    link: "https://music.apple.com/",
    label: "Apple Music",
  },
} as const;

function Popup() {
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentUrl(tabs[0].url);
    });
  }, []);

  function changeStreamingService(key: keyof typeof SERVICES) {
    const toService = SERVICES[key];

    if (!currentUrl) {
      chrome.tabs.create({ url: toService.link });
      return;
    }

    const currentDomain = new URL(currentUrl).hostname.replace("www.", "");

    const fromService = Object.values(SERVICES).find(
      (service) => service.domain === currentDomain,
    );

    if (!fromService) {
      chrome.tabs.create({ url: toService.link });
      return;
    }

    if (fromService.key === "appleMusic") {
      const search = currentUrl?.split("/search?term=")[1];

      if (!search) {
        chrome.tabs.create({ url: toService.link });
        return;
      }

      if (toService.key === "appleMusic") {
        const url = new URL("/search", toService.link);
        url.searchParams.append("term", search);
        chrome.tabs.create({ url: url.toString() });
        return;
      }

      const url = new URL(`/search/${search}`, toService.link);
      chrome.tabs.create({ url: url.toString() });
      return;
    }

    const search = currentUrl?.split("/search/")[1];

    if (!search) {
      chrome.tabs.create({ url: toService.link });
      return;
    }

    if (toService.key === "appleMusic") {
      const url = new URL("/search", toService.link);
      url.searchParams.append("term", search);
      chrome.tabs.create({ url: url.toString() });
      return;
    }

    const url = new URL(`/search/${search}`, toService.link);
    chrome.tabs.create({ url: url.toString() });
  }

  return (
    <>
      <h1>Track Hopper</h1>
      <ul>
        <li>Current URL: {currentUrl}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <div style={{ display: "flex" }}>
        {Object.keys(SERVICES).map((key) => (
          <button
            key={key}
            onClick={() => changeStreamingService(key as keyof typeof SERVICES)}
            style={{ marginRight: "10px" }}
          >
            {SERVICES[key as keyof typeof SERVICES].label}
          </button>
        ))}
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
