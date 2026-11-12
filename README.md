# Chart Riders Web Demo v3.1

Browser demo of the Chart Riders iOS game: one round, then install or replay.

## Files
- index.html — markup only
- style.css — single stylesheet (mobile first; no version-by-version overrides)
- app.js — game engine (port of game_controller.dart), game screen, result, share, GA4 events
- chart.js — candle chart (port of candle_chart.dart)
- i18n.js — all copy for en / ko / ja / fr / es / zh-Hant
- config.js — store URLs, support/privacy URL, public site URL
- historical-data.js — real daily prices (AAPL, NVDA, TSLA; 16 × 120-day windows each)
- images: chart_riders_header_logo.webp, ready/buy/sell/profit/loss_closeup.webp, og-image.jpg, favicon-32.png, apple-touch-icon.png

## Game rules (match the iOS game)
- 120 daily candles: 30 warm-up (5 s countdown) + 90 trading
- 9 price ticks per candle; 2 ticks per 16 ms frame while trading (~6.5 s for 90 days)
- One BUY, one SELL. SELL locks the return; the chart keeps running to the end, then the round ends
- Holding at the end = auto-sell on the last price
- Each web round starts at $10,000 (independent one-round demo)

## v3.0 changes
- Engine rewritten on requestAnimationFrame with a capped frame delta: a stalled or hidden tab pauses the game instead of skipping ahead
- Manual SELL no longer ends the round; the chart continues as in the app ("Sold" status, S marker)
- Chart Y padding restored to 25% of the visible range (v2.7 rule); B/S labels moved off the price axis
- No-trade rounds show "No trade" instead of +0.00%
- Trading IQ slots spin once and settle on "???"; tap to spin again
- Share image follows the result screen: logo, cat, return, balance, IQ ???, challenge line, site URL
- Disclaimer and Support & Privacy footer visible on desktop and on the result screen
- CSS rewritten as one stylesheet; copy moved to i18n.js and reviewed in all six languages
- GA4 removed

## Deploy
Upload all files to the repository root, replacing existing files. index.html loads every script/stylesheet with ?v=<build>; bump it on each release so browsers never mix a new index.html with cached old files. Delete files that are no longer used
(old .png images from v2.7).

## v3.1 — aligned with the iOS source (ChartRiders_iOS_Full)
Verified against lib/game/game_controller.dart, lib/widgets/candle_chart.dart, lib/main.dart, lib/data/stock_parser.dart.
- Price data: all 48 windows match assets/stocks_all/US/us_{AAPL,NVDA,TSLA}.txt exactly and pass the app's window rules
- Warm-up: one tick every 18 ms (270 ticks ≈ 4.86 s); the race starts the moment the 30th candle completes
- SELL: round result is recorded at once (finish card + falling 🏁/🍾), the chart keeps playing behind it, the action bar becomes "View Results"
- HUD balance and return are realized values (change only on sell); the live return is in the status line, as in the app
- Status line, last-5-second warning ("Auto sell in Ns" / "Race ends in Ns"), race track, Day N, stock names and in-game copy are the app's own
- Chart: eased viewport with hysteresis (25% padding, expand at 8% edge, zoom back after 20 candles), 20→60 slot fit, desaturated warm-up candles,
  app colors/line widths, MA legend, volume axis, B/S pills
- Character poses: ready / buy / sell (520 ms) / profit / loss
- Leaving the tab pauses the game; a Resume card brings it back (manual resume, like the app)
- Buttons and store CTA use the app colors (#4FBA8A buy, #D9697D sell)
- GA4 restored without a cookie banner: Consent Mode denies analytics storage in the EEA, UK and Switzerland (cookieless pings), grants it elsewhere; ad signals off
- Web-only, intentionally different from the app: first-round tutorial (pauses the game), single independent round, result/install screen, cat not mirrored

## v3.2 — result screen
- Hero: the rider sits in front of the logo, as in the game header (profit / loss / no-trade pose)
- Verdict chip by return (🏆 ≥20%, 🚀 ≥5%, 👍 >0%, 😅 >-5%, 🔥 ≤-5%, 🧘 no trade)
- Round card: stock, real dates, full 120-day chart with the holding zone and B/S points, plus "Buy & hold" and "Perfect timing" returns for the same window
- Compact Trading IQ ??? strip; App Store / Google Play CTA; gold "Challenge a friend" share button + Play again
- Share image (1080×1350) uses the same blocks and the same mini-chart renderer
- Asset URLs bumped to ?v=3.2

## v3.3 — trading-card teaser
- Result screen shows the app's tier card (layout, frame, tier labels, colours and epithets from trading_card.dart / trading_tier.dart / card_copy.dart)
- Centre card flips through the 8 tier families (DRIFTER → CHALLENGER) with a holo sheen; IQ, balance and return stay "???" and a "🔒 In the app" badge invites the install
- Store buttons read "Get my card in the app"
- Tier artworks: card_<cell>.webp (8 files, cropped from trading_art_*_v3.png), kept in the root so no folder upload is needed

## v3.4 — one-screen result
- Result screen fits one phone screen without scrolling (checked 360×640, 375×667, 390×844, 412×915); the card fan takes the leftover height and the cards are sized in JS
- Removed: separate Trading IQ ??? strip (the tier card already carries IQ ???), stats tiles folded into one line inside the round card, "Can you beat my score?" line
- Share image: hero, verdict, return, money, round card with buy & hold / perfect timing, site URL — no IQ row, no challenge line
- Asset URLs bumped to ?v=3.4

## v3.5 — link previews by language
- index.html = English preview ("Are you a born trader?", og-en-v1.jpg); ko.html = Korean preview ("타고난 트레이딩 자질 테스트", og-ko-v1.jpg)
- Both pages run the same game; the in-game language still follows the visitor's device
- Share button: Korean players share ko.html, everyone else shares the root URL
- ko.html must stay identical to index.html except the <head> meta tags — regenerate it whenever index.html changes

## v3.6 — six link-preview pages
- index.html (English, default), ko.html, ja.html, fr.html, es.html, zh.html; each has its own title, description and og-<lang>.jpg
- Pages differ only in <head>; the game and its auto language detection are the same everywhere
- Share button sends the page in the player's language (English → root URL)
- Pages and preview images are generated together by a build script, so later changes are applied to all six at once
