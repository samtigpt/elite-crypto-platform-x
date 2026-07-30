# ECPX Output Package

Alert delivery, daily report generation, and historical signal performance tracking.

## Status

**Milestone 0:** Placeholder only. No output code exists yet.

## Planned Responsibilities (M9–M10)

| Module | Milestone | Description |
|--------|-----------|-------------|
| `alert_engine.py` | M9 | Rule evaluation, deduplication, dispatch |
| `daily_report.py` | M10 | 9-section daily professional trading report |
| `performance_tracker.py` | M10 | Signal outcome resolution (TP/SL/expired) |

## Planned Structure

```
packages/output/
└── src/ecpx_output/
    ├── alert_engine.py
    ├── daily_report.py
    └── performance_tracker.py
```

## Configuration

- Alert rules: [config/alert_rules.yaml](../../config/alert_rules.yaml)
- Report schedule: 00:15 UTC (see [config/scan_criteria.yaml](../../config/scan_criteria.yaml))

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/VISION.md](../../docs/VISION.md)
