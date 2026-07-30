# ECPX Data Model

Conceptual entity definitions for Elite Crypto Platform X v1.0.

> **Milestone 0:** This document defines entities conceptually. Database schema, migrations, and ORM models are implemented in Milestone 2+.

## Design Notes

- All entities use a **normalized internal format** — exchange-specific details are converted at ingestion.
- **Immutable snapshots** — Signals and scan results are stored with full context at generation time.
- **TimescaleDB** stores high-volume OHLCV candle data as a hypertable.
- **PostgreSQL** stores signals, scores, alerts, settings, and metadata.

## Core Entities

### Symbol

Represents a tradable pair on an exchange.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `exchange` | string | e.g. `binance` |
| `base` | string | Base asset, e.g. `BTC` |
| `quote` | string | Quote asset, e.g. `USDT` |
| `symbol` | string | Exchange symbol, e.g. `BTCUSDT` |
| `status` | enum | `TRADING`, `BREAK`, `HALT` |
| `rank` | int | Current rank in Top 200 (nullable) |
| `volume_24h` | decimal | 24h quote volume in USDT |
| `created_at` | timestamp | First seen in universe |
| `updated_at` | timestamp | Last metadata update |

### Candle (OHLCV)

Normalized candlestick data. Stored in TimescaleDB hypertable.

| Field | Type | Description |
|-------|------|-------------|
| `symbol_id` | UUID | FK → Symbol |
| `timeframe` | enum | `1m`, `15m`, `1h`, `4h`, `1d` |
| `timestamp` | timestamp | Candle open time (UTC) |
| `open` | decimal | Open price |
| `high` | decimal | High price |
| `low` | decimal | Low price |
| `close` | decimal | Close price |
| `volume` | decimal | Base asset volume |
| `quote_volume` | decimal | Quote asset volume |

### IndicatorSnapshot

Computed indicator values for a symbol at a point in time.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `symbol_id` | UUID | FK → Symbol |
| `timeframe` | enum | Timeframe used |
| `timestamp` | timestamp | Snapshot time |
| `rsi` | decimal | Relative Strength Index |
| `macd` | decimal | MACD line |
| `macd_signal` | decimal | MACD signal line |
| `macd_histogram` | decimal | MACD histogram |
| `ema_20` | decimal | 20-period EMA |
| `ema_50` | decimal | 50-period EMA |
| `ema_200` | decimal | 200-period EMA |
| `atr` | decimal | Average True Range |
| `adx` | decimal | Average Directional Index |
| `bb_upper` | decimal | Bollinger Band upper |
| `bb_lower` | decimal | Bollinger Band lower |
| `indicators_json` | jsonb | Additional computed values |

### ScanRun

Represents one execution of a scan job.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `scan_type` | enum | `universe`, `full`, `confirmation`, `intraday` |
| `started_at` | timestamp | Job start time |
| `completed_at` | timestamp | Job end time (nullable) |
| `status` | enum | `running`, `completed`, `failed`, `partial` |
| `symbols_scanned` | int | Count of symbols processed |
| `symbols_failed` | int | Count of failures |
| `metadata_json` | jsonb | Job-specific metadata |

### ScanResult

Per-symbol result from a scan run.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `scan_id` | UUID | FK → ScanRun |
| `symbol_id` | UUID | FK → Symbol |
| `timestamp` | timestamp | Result time |
| `passed_filters` | boolean | Passed pre-filters |
| `is_new_entrant` | boolean | New to Top 200 today |
| `elite_score` | decimal | Composite score 0–100 |
| `tier` | enum | `S`, `A`, `B`, `C`, `D` |
| `analysis_json` | jsonb | Full analysis snapshot |

### Signal

A trading setup recommendation (read-only — no execution).

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `symbol_id` | UUID | FK → Symbol |
| `scan_id` | UUID | FK → ScanRun |
| `type` | enum | `breakout`, `momentum`, `reversal` |
| `direction` | enum | `long`, `short` |
| `timeframes_confirmed` | array | e.g. `["4h", "1d"]` |
| `entry_zone_low` | decimal | Entry zone lower bound |
| `entry_zone_high` | decimal | Entry zone upper bound |
| `stop_loss` | decimal | Recommended stop-loss |
| `take_profit_1` | decimal | First take-profit target |
| `take_profit_2` | decimal | Second take-profit target (nullable) |
| `risk_reward` | decimal | Risk/reward ratio |
| `elite_score` | decimal | Score at signal generation |
| `score_breakdown_json` | jsonb | Factor-by-factor breakdown |
| `created_at` | timestamp | Signal generation time |
| `expires_at` | timestamp | Signal expiry (nullable) |

### Alert

Notification triggered by a signal or event.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `signal_id` | UUID | FK → Signal (nullable) |
| `user_id` | UUID | FK → User |
| `trigger_type` | enum | `new_elite`, `score_jump`, `breakout_confirmed`, `entry_zone`, `new_entrant`, `report_ready` |
| `channel` | enum | `in_app`, `email` |
| `status` | enum | `pending`, `sent`, `failed`, `deduplicated` |
| `message` | text | Alert content |
| `created_at` | timestamp | Alert creation time |
| `sent_at` | timestamp | Delivery time (nullable) |

### SignalOutcome

Tracks the result of a historical signal against actual price action.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `signal_id` | UUID | FK → Signal |
| `outcome` | enum | `hit_tp1`, `hit_tp2`, `hit_sl`, `expired`, `open` |
| `pnl_pct` | decimal | Percentage gain/loss if resolved |
| `resolved_at` | timestamp | Outcome determination time |
| `notes` | text | Additional context |

### DailyReport

Immutable daily professional trading report.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `report_date` | date | Report date (UTC) |
| `generated_at` | timestamp | Generation time |
| `regime_summary` | jsonb | Market regime section |
| `top_setups_json` | jsonb | Top 10 elite setups |
| `new_coins_json` | jsonb | New Top 200 entrants |
| `breakout_watch_json` | jsonb | Pending breakouts |
| `confirmed_setups_json` | jsonb | 4H/1D confirmed setups |
| `risk_reward_json` | jsonb | Best R:R highlights |
| `yesterday_review_json` | jsonb | Prior signal outcomes |
| `volume_leaders_json` | jsonb | Unusual volume activity |
| `watchlist_json` | jsonb | B-tier and above candidates |
| `html_content` | text | Rendered HTML report |

### UserSettings

Operator preferences (single user in v1).

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal identifier |
| `min_elite_score` | int | Minimum score for alerts (default: 70) |
| `preferred_tiers` | array | e.g. `["S", "A"]` |
| `channels_enabled` | array | e.g. `["in_app", "email"]` |
| `watchlist_only` | boolean | Alert on watchlist symbols only |
| `quiet_hours_start` | time | Quiet period start (nullable) |
| `quiet_hours_end` | time | Quiet period end (nullable) |
| `watchlist_symbols` | array | User watchlist symbol IDs |

## Entity Relationships

```
Symbol ──< Candle
Symbol ──< IndicatorSnapshot
Symbol ──< ScanResult ──> ScanRun
Symbol ──< Signal ──> ScanRun
Signal ──< Alert
Signal ──< SignalOutcome
ScanRun ──< ScanResult
DailyReport (standalone, keyed by date)
UserSettings (standalone, single row in v1)
```

## Enums Reference

| Enum | Values |
|------|--------|
| Timeframe | `1m`, `15m`, `1h`, `4h`, `1d` |
| SignalType | `breakout`, `momentum`, `reversal` |
| Direction | `long`, `short` |
| Tier | `S`, `A`, `B`, `C`, `D` |
| ScanType | `universe`, `full`, `confirmation`, `intraday` |
| ScanStatus | `running`, `completed`, `failed`, `partial` |
| AlertTrigger | `new_elite`, `score_jump`, `breakout_confirmed`, `entry_zone`, `new_entrant`, `report_ready` |
| AlertChannel | `in_app`, `email` |
| SignalOutcome | `hit_tp1`, `hit_tp2`, `hit_sl`, `expired`, `open` |
| MarketRegime | `bullish`, `bearish`, `sideways`, `risk_on`, `risk_off` |

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — System design
- [SCORING.md](SCORING.md) — Elite Score factors
- [BINANCE.md](BINANCE.md) — Data source strategy
