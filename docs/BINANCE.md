# ECPX Binance Integration Strategy

Documentation for Binance API integration in Elite Crypto Platform X.

> **Milestone 0:** Strategy documentation only. **No Binance API calls, connector code, or credentials exist yet.** Implementation begins in Milestone 1.

## Scope (v1.0 — Read-Only)

ECPX uses Binance **public market data endpoints only**. No authenticated trading endpoints are used.

| Binance API | Purpose | Used By |
|-------------|---------|---------|
| `GET /api/v3/exchangeInfo` | Tradable symbols, filters, status | Symbol Scanner |
| `GET /api/v3/ticker/24hr` | 24h volume, price change | Top 200 ranking, momentum |
| `GET /api/v3/klines` | Historical OHLCV candles | TA Engine (all timeframes) |
| WebSocket: `<symbol>@kline_<interval>` | Live candle updates | Dashboard live view |
| WebSocket: `<symbol>@ticker` | Live price | Alert triggers, dashboard |
| `GET /api/v3/depth` (limited) | Order book depth | Volume/liquidity analysis |

### Explicitly NOT Used in v1

- `POST /api/v3/order` — order placement
- Wallet or account endpoints
- Any endpoint requiring trading permissions
- Futures or margin endpoints (spot only in v1)

## Market Scope

| Parameter | Value |
|-----------|-------|
| Market type | Spot |
| Quote currency | USDT pairs only |
| Universe | Top 200 by 24h quote volume |
| Status filter | `TRADING` only |

## Connector Design

Binance is accessed through an exchange-agnostic connector interface in `packages/connectors/`.

```
AbstractExchangeConnector
├── get_symbols() → List[RawSymbol]
├── get_ticker_24h() → List[RawTicker]
├── get_klines(symbol, timeframe, limit) → List[RawKline]
├── get_order_book(symbol, depth) → RawOrderBook
└── subscribe_klines(symbols, timeframe) → AsyncStream

BinanceConnector implements AbstractExchangeConnector
```

The **Normalizer** in `packages/market_data/` converts all raw exchange objects into internal domain models (`Symbol`, `Candle`, etc.). Analysis and scoring code never imports Binance-specific types.

## Library Choice

| Library | Role |
|---------|------|
| **ccxt** (primary) | Unified exchange API; supports 100+ exchanges for future expansion |
| **python-binance** (optional fallback) | Binance-native features not covered by ccxt |

## Rate Limit Strategy

Binance REST limit: **1,200 request weight per minute** per IP.

| Technique | Detail |
|-----------|--------|
| Central rate limiter | Shared token bucket in Redis; all workers respect it |
| Weight tracking | klines = weight 2–10 depending on limit; tracked per call |
| Batch intelligently | Top 200 × 3 timeframes = ~600 kline requests; spread over ~1 minute |
| Cache aggressively | Redis: hot candles TTL 30s–5m depending on timeframe |
| WebSocket for live | REST only for historical/backfill and scheduled scans |
| Exponential backoff | On 429/ban responses, pause and retry |
| Scheduled windows | Daily full scan at low-traffic UTC hour |

## Top 200 Universe Algorithm

Daily process (implemented in Milestone 3):

1. Fetch all USDT spot pairs via `exchangeInfo`
2. Filter: `status == TRADING`, minimum liquidity threshold
3. Exclude stablecoin pairs (USDCUSDT, etc.)
4. Rank by **24h quote volume** (descending)
5. Select top 200 → today's scan universe
6. Diff against yesterday's universe → flag new entrants

## Timeframes

| Timeframe | Binance Interval | Primary Use |
|-----------|-----------------|-------------|
| 1H | `1h` | Intraday analysis, intraday refresh |
| 4H | `4h` | Confirmation pass, trend alignment |
| 1D | `1d` | Daily trend, regime detection |

Additional timeframes (1m, 15m) may be added in later milestones for finer granularity.

## WebSocket Strategy

- Subscribe to kline streams for watchlist symbols during market hours
- Subscribe to ticker streams for live price on dashboard
- Reconnect with exponential backoff on disconnect
- Fallback to REST polling if WebSocket unavailable

## Error Handling

| Error | Response |
|-------|----------|
| HTTP 429 (rate limit) | Back off, respect `Retry-After` header |
| HTTP 418 (IP ban) | Pause all requests, alert operator |
| Symbol not found | Log and skip; continue scan |
| Incomplete kline data | Skip symbol for this scan cycle |
| Network timeout | Retry up to 3 times with backoff |

## Security

- No API keys required for public endpoints
- If optional authenticated endpoints are added later, keys stored in `.env` only
- Keys must have **read-only** permissions if used
- Never log API keys or secrets

## Implementation Milestones

| Milestone | Binance Work |
|-----------|-------------|
| M0 | Documentation only (this file) |
| M1 | `BinanceConnector` via ccxt, Normalizer, CLI test (Top 10 tickers) |
| M2 | OHLCV backfill for Top 200, store in TimescaleDB |
| M3 | Universe builder, daily Top 200 scan job |
| M7+ | WebSocket live streams for dashboard |

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — Connector placement in system
- [DATA_MODEL.md](DATA_MODEL.md) — Normalized entity shapes
- [config/scan_criteria.yaml](../config/scan_criteria.yaml) — Universe filters
