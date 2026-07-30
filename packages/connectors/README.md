# ECPX Connectors Package

Exchange adapter interfaces and implementations.

## Status

**Milestone 0:** Placeholder only. No connector code exists yet. **No Binance API calls.**

## Planned Responsibilities (M1+)

- `AbstractExchangeConnector` interface
- `BinanceConnector` implementation via ccxt (read-only public endpoints)
- Connector registry / factory for future exchange expansion
- Rate limit tracking integration

## Planned Structure

```
packages/connectors/
└── src/ecpx_connectors/
    ├── base.py          # Abstract connector interface
    ├── binance.py       # Binance implementation (M1)
    └── registry.py      # Connector factory
```

## Design Principle

Analysis and scoring code **never imports exchange-specific types**. All raw exchange data is converted to internal models by the Normalizer in `packages/market_data/`.

## Related Documentation

- [docs/BINANCE.md](../../docs/BINANCE.md)
- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
