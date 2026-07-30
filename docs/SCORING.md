# ECPX Elite Scoring System

Documentation for the Elite Score composite ranking system.

> **Milestone 0:** Factor definitions and placeholder weights only. Final weights are configurable in `config/scoring_weights.yaml` and will be validated during Milestone 6.

## Overview

The **Elite Score** is a weighted composite (0–100) that ranks trading setup candidates. Each factor is normalized to 0.0–1.0, multiplied by its weight, summed, penalized where applicable, and clamped to 0–100.

Users see a **transparent breakdown** on the dashboard — not just a number, but why a coin scored high or low.

## Scoring Pipeline

```
Raw Analysis Results (per symbol, per timeframe)
        ↓
   Factor Extractors (one per dimension)
        ↓
   Normalizer (each factor → 0.0–1.0)
        ↓
   Weighted Sum (weights from scoring_weights.yaml)
        ↓
   Penalty Application (fake breakout, low liquidity)
        ↓
   Elite Score (0–100) + Score Breakdown JSON
        ↓
   Store immutable snapshot
```

## Score Components

| Factor | Default Weight | Source Engine | Description |
|--------|---------------|---------------|-------------|
| Breakout strength | 20% | Breakout Hunter | Resistance break + volume surge magnitude |
| Multi-TF alignment | 20% | Multi-Timeframe Engine | 4H and 1D confirmation alignment |
| Momentum | 15% | TA Engine | RSI slope, MACD histogram, rate of change |
| Volume confirmation | 15% | Volume/Liquidity Engine | Relative volume vs average |
| Trend quality | 10% | TA Engine | EMA stack alignment, ADX strength |
| Fake breakout penalty | −15% | Fake Breakout Detector | Subtracts when false breakout detected |
| Market regime fit | 10% | Regime Detector | Boost in risk-on, reduce in risk-off |
| Liquidity score | 10% | Volume/Liquidity Engine | Spread, depth, 24h volume rank |

**Note:** Weights are placeholders. Final values will be tuned during Milestone 6 using historical backtesting.

## Tier Classification

| Tier | Score Range | Label | Alert Default |
|------|-------------|-------|---------------|
| **S** | 85–100 | Elite setup | Yes (in-app + email) |
| **A** | 70–84 | High potential | Yes (in-app) |
| **B** | 55–69 | Watch closely | No |
| **C** | 40–54 | Monitor | No |
| **D** | < 40 | Pass | No |

## Score Breakdown Example

```
BTCUSDT — Elite Score: 87/100  [Tier S]
├── Breakout strength:    92  █████████░
├── Multi-TF alignment:   85  ████████░░  (4H ✓  1D ✓)
├── Momentum:               78  ███████░░░
├── Volume confirmation:    91  █████████░
├── Trend quality:          82  ████████░░
├── Fake breakout risk:     Low (-2)
├── Regime fit:             Bullish (+8)
└── Liquidity:              88  ████████░░
```

## Factor Details

### Breakout Strength (20%)

Measures how decisively price broke above resistance with volume support.

- Close above N-period high
- Volume surge relative to average (configurable multiplier)
- Distance above breakout level (ATR-normalized)

Validated during Milestone 5.

### Multi-TF Alignment (20%)

Checks indicator and trend alignment across timeframes.

- 4H confirmation: trend direction, RSI zone, MACD alignment
- 1D confirmation: higher-timeframe trend support
- Both confirmed → maximum score; partial → proportional

Implemented in Milestone 4 (indicators) and Milestone 6 (confirmation logic).

### Momentum (15%)

Rate-of-change and oscillator momentum signals.

- RSI slope (rising/falling over N periods)
- MACD histogram direction and magnitude
- Price rate of change vs recent average

### Volume Confirmation (15%)

Validates that price moves are supported by volume.

- Relative volume (current vs 20-period average)
- Volume trend (increasing on breakout bars)
- Buy/sell volume imbalance (where available)

### Trend Quality (10%)

Overall trend structure quality.

- EMA stack: price > EMA20 > EMA50 > EMA200 (bullish)
- ADX above threshold (trending, not ranging)
- Higher highs / higher lows structure

### Fake Breakout Penalty (−15%)

Applied when Fake Breakout Detector flags a setup.

- Price broke resistance but closed back inside
- Volume faded after initial spike
- Penalty scales with confidence of fake breakout detection

Validated during Milestone 5.

### Market Regime Fit (10%)

Adjusts score based on current market conditions.

- Bullish regime → boost breakout/momentum scores
- Bearish regime → reduce long-biased scores
- Sideways → neutral; favor range-bound setups less

### Liquidity Score (10%)

Ensures setups are tradable with acceptable slippage.

- 24h volume rank within Top 200
- Bid-ask spread relative to price
- Order book depth at key levels

## Configuration

Weights are loaded from `config/scoring_weights.yaml` at runtime. Changes take effect on the next scan without code deployment.

```yaml
# Example structure (see config/scoring_weights.yaml)
weights:
  breakout_strength: 0.20
  multi_tf_alignment: 0.20
  momentum: 0.15
  volume_confirmation: 0.15
  trend_quality: 0.10
  fake_breakout_penalty: -0.15
  market_regime_fit: 0.10
  liquidity_score: 0.10
```

## Ranking

After scoring, the **Candidate Ranking Engine** sorts all Top 200 symbols by Elite Score (descending) and assigns tiers. The ranked list feeds:

- Dashboard candidate table
- Daily report Top 10 section
- Alert engine (S-tier and score jump triggers)
- Watchlist recommendations

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — Scoring engine placement in pipeline
- [DATA_MODEL.md](DATA_MODEL.md) — Signal and ScanResult entities
- [config/scoring_weights.yaml](../config/scoring_weights.yaml) — Live weight configuration
