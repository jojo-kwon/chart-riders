v1.8: Rebuild gameplay layout using native iOS screenshot as reference. Single centered original logo, original ready character asset, round and balance HUD, company/date above chart, MA legend, volume chart, progress line and two trade buttons. Existing six-language selection remains outside gameplay. This is a browser reimplementation, not pixel-identical Flutter rendering. Upload all extracted files to repository root.

## v1.9
Both store download buttons now link to the official URLs provided by the developer. Upload all extracted files to the repository root, replacing existing files.


v2.0: distinct warm gold/orange App Store gradient and mint/turquoise Google Play gradient, both full-width and with touch feedback. Original logo gently double-pulses in the native game header and on the result screen. Reduced-motion accessibility supported. Store URLs retained.


v2.3: Cat shifted left to reveal R; Korean tutorial copy simplified with intentional sentence breaks. Other languages unchanged.

Version 2.4: Korean tutorial and result copy changed to concise, neutral noun-phrase style. Existing layout, animations, assets and store links retained.

Version 2.5: The end-of-round modal shows only the localized end title and result button; all other tutorials and result UI remain unchanged.

Version 2.7: Result screen removes the redundant round-ended label and shows the original cat rider asset in its place.

Version 2.8:
- Fixes: store icons are inline SVG (Apple glyph no longer breaks on Android/Windows); status/ROUND labels localized in all six languages; progress bar now spans the 90 trading days; balance follows unrealized P&L while holding; result shows "no trade" / "auto-sold" notes; empty support link is hidden instead of showing the store notice.
- New: PLAY AGAIN (skips tutorial) and SHARE (result image via Web Share on mobile, clipboard fallback); OS-aware store buttons (iPhone shows App Store only, Android shows Google Play only, desktop shows both); "Galaxy" renamed "Android".
- New: Open Graph/Twitter preview (og-image.jpg), favicon and apple-touch-icon.
- New: optional GA4 events via config.js gaId (demo_start, demo_buy, demo_sell, demo_auto_sell, demo_no_trade, demo_result, demo_replay, demo_share_click, store_click, language_change).
- Chart canvas renders at device pixel ratio without stretching; axis labels readable.
- Images converted to WebP (~1.5 MB -> ~140 KB); red edge fringe removed from the cat; cat bottom edge fades out. Unused 1.9 MB app icon removed.
- config.js: fill supportUrl (privacy policy), siteUrl and gaId. For KakaoTalk/Facebook previews, change og:image in index.html to an absolute URL.
Upload all extracted files to the repository root and delete the old .png assets.
