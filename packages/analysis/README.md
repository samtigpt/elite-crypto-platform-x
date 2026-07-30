# ECPX Analysis Package

Technical analysis, breakout detection, and market regime engines.

## Status

**Milestone 0:** Placeholder only. No analysis code exists yet.

## Planned Responsibilities (M4–M5)

| Module | Milestone | Description |
|--------|-----------|-------------|
| `technical.py` | M4 | RSI, MACD, EMA, ATR, Bollinger Bands, ADX |
| `multi_timeframe.py` | M4 | 4H + 1D confirmation logic |
| `volume_liquidity.py` | M5 | Relative volume, spread, depth analysis |
| `breakout_hunter.py` | M5 | Resistance break + volume surge detection |
| `fake_breakout.py` | M5 | False breakout identification and penalty |
| `regime.py` | M6 | Market regime detection (bull/bear/sideways) |

## Planned Structure

```
packages/analysis/
└── src/ecpx_analysis/
    ├── technical.py
    ├── multi_timeframe.py
    ├── volume_liquidity.py
    ├── breakout_hunter.py
    ├── fake_breakout.py
    └── regime.py
```

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/SCORING.md](../../docs/SCORING.md)
- [config/scan_criteria.yaml](../../config/scan_criteria.yaml)
