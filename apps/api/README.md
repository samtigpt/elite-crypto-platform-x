# ECPX API Application

FastAPI REST and WebSocket server for the ECPX dashboard and external consumers.

## Status

**Milestone 0:** Placeholder only. No application code exists yet.

## Planned Responsibilities (M2+)

- REST endpoints for symbols, candles, signals, scores, and reports
- WebSocket streams for live price and score updates
- Authentication middleware (single operator in v1)
- API documentation via FastAPI auto-generated OpenAPI

## Planned Structure

```
apps/api/
├── src/
│   ├── main.py
│   ├── routes/          # Dashboard API endpoints
│   └── websocket/       # Live price/score streams
├── pyproject.toml
└── Dockerfile
```

## Related Documentation

- [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- [docs/DATA_MODEL.md](../../docs/DATA_MODEL.md)
