# ECPX Scanner Application

Celery batch workers that orchestrate the daily scan pipeline.

## Status

**Milestone 0:** Placeholder only. No application code exists yet.

## Planned Responsibilities (M3+)

- Scheduled scan jobs: universe, full, confirmation, intraday refresh
- Pipeline orchestration across all analysis and intelligence engines
- Error handling and partial failure recovery
- Scan status logging and monitoring

## Planned Structure

```
apps/scanner/
├── src/
│   ├── main.py          # Celery worker entry
│   ├── tasks/           # Scheduled scan jobs
│   └── pipeline/        # Full scan flow orchestration
└── pyproject.toml
```

## Scan Job Types

| Job | Schedule | Milestone |
|-----|----------|-----------|
| `universe_scan` | Daily 00:05 UTC | M3 |
| `full_scan` | Daily 00:10 UTC | M7 |
| `confirmation_scan` | 4H / 1D close + offset | M6 |
| `intraday_refresh` | Every 30 min | M7 |
| `performance_resolve` | Daily | M10 |

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [config/scan_criteria.yaml](../../config/scan_criteria.yaml)
