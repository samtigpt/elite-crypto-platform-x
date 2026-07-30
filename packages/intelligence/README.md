# ECPX Intelligence Package

Elite scoring, entry/exit calculation, risk management, and candidate ranking.

## Status

**Milestone 0:** Placeholder only. No intelligence code exists yet.

## Planned Responsibilities (M6)

| Module | Description |
|--------|-------------|
| `elite_scorer.py` | Weighted composite Elite Score (0–100) |
| `entry_exit.py` | Entry zones, stop-loss, take-profit levels |
| `risk_manager.py` | Risk/reward ratio calculation |
| `candidate_ranker.py` | Sort and tier all Top 200 candidates |

## Planned Structure

```
packages/intelligence/
└── src/ecpx_intelligence/
    ├── elite_scorer.py
    ├── entry_exit.py
    ├── risk_manager.py
    └── candidate_ranker.py
```

## Configuration

- Score weights: [config/scoring_weights.yaml](../../config/scoring_weights.yaml)
- Tier thresholds: defined in scoring_weights.yaml and [docs/SCORING.md](../../docs/SCORING.md)

## Related Documentation

- [docs/SCORING.md](../../docs/SCORING.md)
- [docs/DATA_MODEL.md](../../docs/DATA_MODEL.md)
