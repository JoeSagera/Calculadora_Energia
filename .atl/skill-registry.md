# Skill Registry — Calculadora_Energia

**Generated**: 2026-04-16
**Project**: Calculadora_Energia
**Stack**: React 19 + Vite 8 + TypeScript 6 + Tailwind CSS 4

---

## User Skills

| Skill | Trigger | Compact Rules |
|-------|---------|---------------|
| branch-pr | Creating a PR, opening a PR, preparing changes for review | Follow issue-first enforcement: branch from issue, PR references issue |
| issue-creation | Creating a GitHub issue, reporting a bug, requesting a feature | Follow issue-first enforcement: required fields, labels, acceptance criteria |
| judgment-day | "judgment day", "review adversarial", "dual review", "juzgar" | Launch two blind judge sub-agents, synthesize findings, apply fixes |
| go-testing | Go tests, Bubbletea TUI testing | N/A — project is TypeScript/React |
| skill-creator | Creating new AI skills | Follow Agent Skills spec |

## Project Conventions

| Convention | Source | Rules |
|------------|--------|-------|
| No build after changes | AGENTS.md | Never run build command after edits |
| No Co-Authored-By | AGENTS.md | Never add AI attribution to commits |
| Conventional commits | AGENTS.md | Use conventional commit format |
| Verify before claiming | AGENTS.md | Never agree without verification |
| Rioplatense Spanish | AGENTS.md | Spanish input → voseo responses |

## Compact Rules (auto-resolved)

### For TypeScript/React files (*.ts, *.tsx):
- Use React functional components with hooks
- Strict TypeScript: noUnusedLocals, noUnusedParameters
- Tailwind utility classes only — no custom CSS files
- Arcade Cuba brand colors via theme variables (arcade-dark, arcade-blue, etc.)
- Fonts: font-heading (Barlow Condensed) for headings, font-body (Inter) for body

### For commits:
- Conventional commits: feat:, fix:, chore:, docs:
- No AI attribution (no Co-Authored-By)
- Never build after changes

### For testing (when installed):
- Vitest as test runner
- React Testing Library for component tests
- TDD: write test first, then implementation
