---
name: commit
description: Review and commit work created in the current session using this repository's commit convention. Use only when the user explicitly asks to create commits; do not use for pushing or unrelated working-tree cleanup.
---

# Commit Current Session Work

Commit only the work attributable to the current conversation.

## Workflow

1. Read `AGENTS.md` and `CONTRIBUTING.md`, then inspect `git status` and the relevant staged and unstaged diffs.
2. Use the conversation context and diffs to distinguish current-session work from pre-existing or user-owned changes. If ownership is unclear, stop and ask before staging.
3. Divide the session's work into the largest cohesive units that each represent one purpose. Do not create file-by-file commits when the files support the same change, and do not combine independent concerns.
4. Run the narrowest relevant existing verification required by `AGENTS.md`. Do not invent scripts or modify files merely to make a check pass.
5. Stage only the files or hunks belonging to the current unit, preserving unrelated working-tree changes.
6. Commit each unit with `feat`, `fix`, `refactor`, `init`, `docs`, or `chore`. Use an optional short scope when it adds useful context.
7. Keep every commit message as concise as possible. Write the subject in imperative English without a trailing period.
8. Report the resulting commit hashes and messages. Do not amend or push unless the user explicitly requests it.
