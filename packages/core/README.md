# ECPX Core Package

Shared Python domain models, enums, and utilities used across all packages.

## Status

**Milestone 0:** Placeholder only. No application code exists yet.

## Planned Responsibilities (M1+)

- Domain models: `Symbol`, `Candle`, `Signal`, `Score`, `Alert`
- Enums: `Timeframe`, `SignalType`, `Tier`, `MarketRegime`
- Pydantic schemas for pipeline stage contracts
- Shared validation and serialization utilities

## Planned Structure

```
packages/core/
└── src/ecpx_core/
    ├── models/          # Symbol, Candle, Signal, Score, Alert
    └── enums/           # Timeframe, SignalType, Regime
```

## Related Documentation

- [docs/DATA_MODEL.md](../../docs/DATA_MODEL.md)
