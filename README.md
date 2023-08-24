<p align="center">
  <img src="./resources/web/icon-512.png" height="128" alt="Track Hopper Icon">
</p>

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/dmlbdjeaoiacdfdifankjfaapeoanloa">
    <img src="https://img.shields.io/chrome-web-store/users/dmlbdjeaoiacdfdifankjfaapeoanloa" alt="Track Hopper Chrome Web Store Users">
  </a>
</p>

<h1 align="center">Track Hopper</h1>
<p align="center">Hop between music streaming services.</p>

## Notes

- Only works for search pages within music streaming sites (other pages are in the works).
- Hopping to Apple Music will default to the US region to prevent search parameter issues (this will be fixed in the future).
- Regions where service domains are unique have not been tested.

## Development Setup

Install the dependencies:

```bash
pnpm install
```

Build the extension:

```bash
pnpm build
```

Load the extension:

Go to [`chrome://extensions/`](chrome://extensions/), enable `Developer mode`, click `Load unpacked`, and select the `dist` folder.
