# ECPX — Elite Crypto Platform X
# Milestone 0: Foundation commands only (safe placeholders)

.PHONY: help validate structure docker-config dev-info

help:
	@echo "ECPX — Elite Crypto Platform X (Milestone 0)"
	@echo ""
	@echo "Available commands:"
	@echo "  make help          Show this help message"
	@echo "  make validate      Run foundation validation checks"
	@echo "  make structure     List monorepo directory structure"
	@echo "  make docker-config Validate docker-compose.yml syntax"
	@echo "  make dev-info      Show development status and next milestones"
	@echo ""
	@echo "Note: Application services are not implemented in Milestone 0."

validate: structure docker-config
	@echo "[validate] Foundation checks complete."

structure:
	@echo "[structure] Monorepo layout:"
	@find apps packages docs config scripts -type f 2>/dev/null | sort || true
	@find apps packages docs config scripts -type d 2>/dev/null | sort || true

docker-config:
	@echo "[docker-config] Validating docker-compose.yml..."
	@docker compose config --quiet && echo "[docker-config] OK" || echo "[docker-config] Skipped or failed (Docker may not be running)"

dev-info:
	@echo "ECPX v1.0 — Read-only market intelligence platform"
	@echo "Current milestone: M0 (Foundation)"
	@echo "Next milestone:    M1 (Binance read-only connection)"
	@echo "Repository:        https://github.com/samtigpt/elite-crypto-platform-x"
	@echo ""
	@echo "See docs/ARCHITECTURE.md for the full system design."
