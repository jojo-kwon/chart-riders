# Chart Riders Web Demo v1.1

Open `index.html` in a browser, or upload all files to a static host.

## Based on the supplied iOS Flutter source
- Original US stock asset files: `us_AAPL.txt`, `us_NVDA.txt`, `us_TSLA.txt`.
- 16 randomly chosen valid 120-session historical windows per stock.
- First 30 sessions are the historical warmup; the remaining 90 are trading sessions.
- One buy and one sell; initial virtual balance $10,000.
- 5-second countdown, 3 tutorial pauses, 6 languages, Trading IQ mystery reel.
- This is a browser adaptation, not a Flutter build. Candlestick animation is simplified relative to the native intraday tick interpolation.

## Before publishing
Edit `config.js` to add the verified App Store, Google Play and support/privacy URLs.
No backend or API key required. Historical data is bundled in `historical-data.js`.

## Language selection
On first visit, detects browser language preferences (ko, en, ja, fr, es, Traditional Chinese). Unsupported languages fall back to English. Manual changes persist in localStorage and are applied on subsequent visits. Changing language does not reset the game.
