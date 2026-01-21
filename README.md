<div align="center">
  <strong>dotagents</strong>
  <br />
  <em>One canonical .agents folder that powers all your AI tools.</em>

  <br /><br />
  <em>
    Simple setup • One source of truth • Safe to re-run anytime
  </em>
</div>

## Quick Start

Requirements: Bun 1.3+.

Run the guided CLI:
```bash
npx @iannuttall/dotagents
```

Or with Bun:
```bash
bunx @iannuttall/dotagents
```

Choose a workspace (Global home or Project folder), select the clients you want to manage, and follow the prompts. You can run it again anytime to repair links or undo changes.

Global home affects all projects. Project folder only affects the current directory you run dotagents from.

## What it does

- Keeps `.agents` as the source of truth.
- Creates symlinks for **14 AI coding tools**: Claude, Factory, Codex, Cursor, OpenCode, Ampcode, GitHub Copilot, Gemini CLI, Google Antigravity, Windsurf, Aider, Goose, Kiro, and Devin (based on your selection).
- Always creates a backup before any overwrite so changes are reversible.
- Uses relative paths for symlinks to ensure portability across different machines and directories.

## Where it links (global scope)

`.agents/CLAUDE.md` → `~/.claude/CLAUDE.md` (if present)

`.agents/AGENTS.md` → `~/.claude/CLAUDE.md` (fallback when no CLAUDE.md)

`.agents/GEMINI.md` → `~/.gemini/GEMINI.md` (if present)

`.agents/AGENTS.md` → `~/.gemini/GEMINI.md` (fallback when no GEMINI.md)

`.agents/GEMINI.md` → `~/.gemini/GEMINI.md` (Antigravity shares with Gemini CLI)

`.agents/commands` → `~/.claude/commands`

`.agents/commands` → `~/.gemini/commands`

`.agents/commands` → `~/.gemini/commands` (Antigravity shares with Gemini CLI)

`.agents/commands` → `~/.factory/commands`

`.agents/commands` → `~/.codex/prompts`

`.agents/commands` → `~/.cursor/commands`

`.agents/commands` → `~/.opencode/commands`

`.agents/commands` → `~/.windsurf/commands`

`.agents/commands` → `~/.aider/commands`

`.agents/commands` → `~/.config/goose/commands`

`.agents/commands` → `~/.kiro/commands`

`.agents/hooks` → `~/.claude/hooks`

`.agents/hooks` → `~/.factory/hooks`

`.agents/AGENTS.md` → `~/.factory/AGENTS.md`

`.agents/AGENTS.md` → `~/.codex/AGENTS.md`

`.agents/AGENTS.md` → `~/.config/opencode/AGENTS.md`

`.agents/AGENTS.md` → `~/.config/amp/AGENTS.md`

`.agents/AGENTS.md` → `~/.windsurf/AGENTS.md`

`.agents/AGENTS.md` → `~/.aider/AGENTS.md`

`.agents/AGENTS.md` → `~/.kiro/AGENTS.md`

`.agents/AGENTS.md` → `.devin/AGENTS.md` (project-level only)

`.agents/skills` → `~/.claude/skills`

`.agents/skills` → `~/.gemini/skills`

`.agents/skills` → `~/.gemini/skills` (Antigravity shares with Gemini CLI)

`.agents/skills` → `~/.factory/skills`

`.agents/skills` → `~/.codex/skills`

`.agents/skills` → `~/.cursor/skills`

`.agents/skills` → `~/.opencode/skills`

`.agents/skills` → `~/.copilot/skills` (global) or `.github/skills` (project)

`.agents/skills` → `~/.windsurf/skills`

`.agents/skills` → `~/.aider/skills`

`.agents/skills` → `~/.config/goose/skills`

`.agents/skills` → `~/.kiro/skills`

Project scope links only commands/hooks/skills into the project's client folders (no AGENTS/CLAUDE/GEMINI rules for most tools).

## Development

Run the CLI in dev mode:
```bash
bun run dev
```

Type-check:
```bash
bun run type-check
```

Run tests:
```bash
bun test
```

Build the CLI:
```bash
bun run build
```

## Notes

### Tool-Specific Behaviors

- **Claude**: Claude prompt precedence: if `.agents/CLAUDE.md` exists, it links to `.claude/CLAUDE.md`. Otherwise `.agents/AGENTS.md` is used.
- **Gemini CLI & Antigravity**: Both share `~/.gemini/GEMINI.md`. If `.agents/GEMINI.md` exists, it's used; otherwise falls back to `AGENTS.md`.
- **GitHub Copilot**: Uses `.github/skills` for project scope and `~/.copilot/skills` for global scope.
- **Windsurf**: Configuration in `~/.codeium/windsurf` (global), `.windsurf/` (project).
- **Aider**: Uses `.aider/` folder and `.aider.conf.yml` configuration file.
- **Goose**: Configuration in `~/.config/goose/` with config.yaml, permissions, and .goosehints support.
- **Kiro**: Uses `~/.kiro/` with settings/mcp.json and settings/cli.json, plus `.kiro/steering/` for project-specific configs.
- **Devin**: Cloud-based service, only uses `AGENTS.md` at project level (no local config folder).
- **Ampcode**: Natively reads from `.agents/` for commands and skills, only AGENTS.md is linked to `~/.config/amp/AGENTS.md`.
- **Cursor**: Supports `.claude/commands` and `.claude/skills`. dotagents links `.agents/commands` → `.cursor/commands` and `.agents/skills` → `.cursor/skills`.
- **OpenCode**: Uses `~/.config/opencode/AGENTS.md` and prefers AGENTS.md over CLAUDE.md when both exist.
- **Codex**: Prompts always symlink to `.agents/commands` (canonical source).

### General Notes

- **Skills**: Require a valid `SKILL.md` with `name` + `description` frontmatter.
- **Override files**: After adding or removing `.agents/CLAUDE.md` or `.agents/GEMINI.md`, re-run dotagents and apply/repair links to update symlinks.
- **Project scope**: Creates `.agents` plus client folders for commands/hooks/skills only. Rule files (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`) are managed at repo root.
- **Symlinks**: All symlinks use relative paths for portability across machines and directory moves.
- **Backups**: Stored under `.agents/backup/<timestamp>` and can be restored via "Undo last change."
- **Factory/Codex**: Always link to `.agents/AGENTS.md`.

## License

MIT
