# ECPX Market Data Package

Market Data Engine and Normalizer — fetches, caches, and normalizes exchange data.

## Status

**Milestone 0:** Placeholder only. No application code exists yet.

## Planned Responsibilities (M1+)

- Fetch OHLCV, tickers, and order book data from connectors
- Normalize raw exchange objects into internal domain models
- Redis cache for hot market data with configurable TTL
- Serve normalized data to analysis engines and API

## Planned Structure

```
packages/market_data/
└── src/ecpx_market_data/
    ├── engine.py        # Market Data Engine
    ├── normalizer.py    # Raw → internal model conversion
    └── cache.py         # Redis cache layer
```

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/DATA_MODEL.md](../../docs/DATA_MODEL.md)
- [docs/BINANCE.md](../../docs/BINANCE.md)
