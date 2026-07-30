# ECPX Web Dashboard

Next.js web application for viewing scan results, signals, scores, and daily reports.

## Status

**Milestone 0:** Placeholder only. No application code exists yet.

## Planned Responsibilities (M8+)

- Dashboard home with today's top candidates
- Signal detail pages with score breakdown, entry/SL/TP
- Candlestick charts with indicator overlays (Lightweight Charts)
- Candidate ranking table with tier and score filters
- Daily report viewer
- Watchlist management
- In-app alert notifications

## Planned Structure

```
apps/web/
├── src/
│   ├── app/             # Pages: dashboard, scanner, signals, reports
│   ├── components/      # Charts, tables, score cards
│   └── lib/             # API client
└── package.json
```

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/SCORING.md](../../docs/SCORING.md)
