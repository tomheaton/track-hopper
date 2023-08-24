# Track Hopper

Hop between music streaming services.

## Notes

- Only works for search pages (other pages are in the works).
- Hopping to Apple Music will default to the US region.
- Regions where service domains are unique have not been tested.

## Development

Install dependencies:

```bash
pnpm install
```

Build the extension:

```bash
pnpm build
```

Run the extension:

Go to [`chrome://extensions/`](chrome://extensions/), enable `Developer mode`, click `Load unpacked`, and select the `dist` folder.
