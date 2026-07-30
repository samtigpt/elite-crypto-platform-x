# ECPX Scripts

CLI and maintenance scripts for ECPX operations.

## Status

**Milestone 0:** Placeholder only. No scripts exist yet.

## Planned Scripts

| Script | Milestone | Purpose |
|--------|-----------|---------|
| `seed_symbols.py` | M2 | One-time Binance symbol import |
| `backfill_ohlcv.py` | M2 | Historical candle backfill for Top 200 |
| `test_connector.py` | M1 | CLI: fetch Top 10 tickers and print normalized output |
| `analyze_symbol.py` | M4 | CLI: analyze one symbol, print indicator values |

## Usage (Future)

Scripts will be run from the repository root once Python packages are installed in later milestones:

```bash
# Example (M1+)
python scripts/test_connector.py
python scripts/backfill_ohlcv.py --timeframe 1d --limit 200
```

## Related Documentation

- [docs/BINANCE.md](../docs/BINANCE.md)
- [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)
