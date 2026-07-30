# ECPX Product Vision

## What Is ECPX?

**Elite Crypto Platform X (ECPX)** is a professional crypto market intelligence, scanning, and trading-analysis platform.

ECPX helps a single operator discover high-potential setups across Binance USDT spot markets every day — through automated scanning, multi-timeframe analysis, elite scoring, and actionable alerts — **without executing trades or holding funds**.

## Core Constraint (v1.0)

**Read-only architecture.** ECPX v1.0 provides intelligence and analysis only:

- No order execution
- No wallets or custody
- No trading API keys with write permissions
- Public market data only

## The 20 Core Goals

1. **Live crypto market data** — Real-time and historical OHLCV from Binance
2. **Binance Top 200 Scan** — Daily universe of top USDT spot pairs by volume
3. **Discover new coins** — Identify symbols newly entering the Top 200 each day
4. **High-potential setups** — Flag explosive breakout and momentum candidates
5. **Multi-timeframe technical analysis** — Indicators across 1H, 4H, and 1D
6. **Elite scoring system** — Weighted composite score (0–100) with breakdown
7. **Breakout Hunter** — Detect resistance breaks with volume confirmation
8. **Fake breakout detection** — Identify and penalize false breakouts
9. **Volume and liquidity analysis** — Relative volume, spread, order book depth
10. **Momentum analysis** — RSI slope, MACD histogram, rate of change
11. **Entry zones** — Defined price ranges for potential entries
12. **Stop-loss levels** — ATR-based stop-loss recommendations
13. **Take-profit targets** — Multiple TP levels with R:R context
14. **Risk/reward calculation** — R:R ratio for every signal
15. **Entry alerts** — Notify when setups appear or price enters entry zone
16. **4H and 1D confirmation** — Higher-timeframe alignment checks
17. **Daily Professional Trading Report** — Structured daily summary at 00:15 UTC
18. **Market regime detection** — Bull/bear/sideways context for scoring
19. **Watchlist and candidate ranking** — Ranked list of today's best setups
20. **Historical signal performance tracking** — Track outcomes (TP hit, SL hit, expired)

## Target User (v1.0)

- **Single operator** — One user running the platform for personal trading research
- Multi-user and subscription features are deferred to later versions

## Market Scope (v1.0)

| Parameter | Value |
|-----------|-------|
| Exchange | Binance (first integration) |
| Market type | Spot |
| Quote currency | USDT pairs only |
| Daily universe | Top 200 by 24h quote volume |
| Design principle | Exchange-agnostic via normalized data layer |

## Pipeline Overview

```
Binance
  ↓
Market Data Layer
  ↓
Normalizer
  ↓
Technical Indicators
  ↓
Signal Engine
  ↓
Elite Scoring Engine
  ↓
Breakout Hunter
  ↓
Risk / Entry / Exit Engine
  ↓
Alert Engine
  ↓
Daily Report
  ↓
Web Dashboard
```

## Success Criteria for v1.0

- Daily Top 200 scan runs unattended
- Elite scores and signal breakdowns are visible on the dashboard
- Entry/SL/TP and R:R are computed for ranked candidates
- Alerts fire for S-tier setups (score ≥ 85)
- Daily report generates at 00:15 UTC with all sections
- Historical signals show outcome tracking (TP/SL/expired)
- No trading or custody functionality exists anywhere in the system

## Out of Scope for v1.0

- Order execution on any exchange
- Wallet management or private key storage
- Futures, margin, or derivatives (spot only in v1)
- Mobile native apps
- Multi-exchange support (architecture supports it; Binance only in v1)
- Telegram / Web Push alerts (v1.1)

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — System design and modules
- [SCORING.md](SCORING.md) — Elite Score formula and tiers
- [DATA_MODEL.md](DATA_MODEL.md) — Entity definitions
- [BINANCE.md](BINANCE.md) — Binance integration strategy
