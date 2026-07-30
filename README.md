# Elite Crypto Platform X (ECPX)

**ECPX** is a read-only professional crypto market intelligence, scanning, and trading-analysis platform.

It scans Binance USDT spot markets, runs multi-timeframe technical analysis, scores setups with the Elite Scoring Engine, and delivers alerts and daily reports — **without executing trades or holding user funds**.

> **Current milestone:** M0 (Foundation) — structure and documentation only. No application logic yet.

## Repository

- **GitHub:** https://github.com/samtigpt/elite-crypto-platform-x.git
- **Branch:** `main`

## What ECPX Does (v1.0)

| Capability | Description |
|------------|-------------|
| Live market data | Normalized OHLCV and ticker data from Binance |
| Top 200 scan | Daily universe of top Binance USDT spot pairs by 24h volume |
| Technical analysis | Multi-timeframe indicators (1H, 4H, 1D) |
| Elite scoring | Weighted composite score (0–100) with transparent breakdown |
| Breakout Hunter | Detect high-potential breakout setups |
| Fake breakout detection | Penalize false breakouts in scoring |
| Entry / exit / risk | Entry zones, stop-loss, take-profit, risk/reward |
| Alerts | In-app and email notifications for elite setups |
| Daily report | Professional trading report at 00:15 UTC |
| Dashboard | Web interface for scan results, signals, and reports |

## What ECPX Does NOT Do (v1.0)

- Execute trades or orders
- Hold wallets or custody user funds
- Require trading API keys (read-only public data only)

## Architecture Overview

```
Binance (read-only)
       ↓
Market Data Engine → Normalizer
       ↓
Analysis Engines (TA, Multi-TF, Volume, Breakout, Regime)
       ↓
Elite Scoring → Entry/Exit/Risk → Candidate Ranking
       ↓
Alerts + Daily Report + Web Dashboard
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full system design.

## Monorepo Structure

```
elite-crypto-platform-x/
├── apps/
│   ├── api/          # FastAPI REST + WebSocket (M2+)
│   ├── scanner/      # Celery batch scan workers (M3+)
│   └── web/          # Next.js dashboard (M8+)
├── packages/
│   ├── core/         # Shared domain models
│   ├── connectors/   # Exchange adapters (Binance in M1)
│   ├── market_data/  # Market Data Engine + Normalizer
│   ├── analysis/     # TA, breakout, regime engines
│   ├── intelligence/ # Scoring, entry/exit, ranking
│   └── output/       # Alerts, reports, performance tracking
├── config/           # Scoring weights, scan criteria, alert rules
├── docs/             # Architecture and product documentation
└── scripts/          # CLI and maintenance scripts (future)
```

## Approved v1 Decisions

| Decision | Value |
|----------|-------|
| Exchange | Binance first (not implemented in M0) |
| Quote currency | USDT spot pairs only |
| Scan universe | Top 200 by 24h quote volume |
| Users | Single operator for v1 |
| Daily report | 00:15 UTC |
| Architecture | Read-only |

## Getting Started (Milestone 0)

No dependencies are installed in M0. Use the Makefile for foundation checks:

```bash
make help       # Show available commands
make validate   # Run foundation validation
make dev-info   # Show milestone status
```

Copy the environment template when implementing later milestones:

```bash
cp .env.example .env
```

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/VISION.md](docs/VISION.md) | Product vision and 20 core goals |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and data flow |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Conceptual entity definitions |
| [docs/SCORING.md](docs/SCORING.md) | Elite Score factors and tiers |
| [docs/BINANCE.md](docs/BINANCE.md) | Binance integration strategy (M1+) |

## Development Milestones

| Milestone | Focus |
|-----------|-------|
| **M0** | Foundation (current) — structure, docs, config |
| M1 | Binance read-only connection |
| M2 | Database and OHLCV storage |
| M3 | Symbol Scanner (Top 200) |
| M4 | Technical Analysis Engine |
| M5 | Breakout Hunter + Fake Breakout Detector |
| M6 | Elite Scoring + Entry/Exit/Risk |
| M7 | Full automated scan pipeline |
| M8 | Web Dashboard |
| M9 | Alerts |
| M10 | Daily Report + Performance Tracking |
| M11 | Polish and deploy |

## License

To be determined.
