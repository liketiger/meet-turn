# Contributing

## Commit convention

Use the following format:

```text
<type>(<scope>): <subject>
```

The scope is optional:

```text
<type>: <subject>
```

Allowed commit types:

- `feat`: add or change user-facing functionality.
- `fix`: correct a bug or unintended behavior.
- `refactor`: restructure code without intentionally changing behavior.
- `init`: create the project's initial setup or foundational scaffolding.
- `docs`: change documentation only.
- `chore`: perform maintenance such as configuration, dependency, formatting, or test-only changes.

Write the subject as concise imperative English without a trailing period.

Examples:

```text
feat(auth): add login form
fix(query): restore reconnect handling
refactor(router): move routes under src
init: configure Expo Router
docs: document project architecture
chore(deps): update lockfile
```

## Commit boundaries

- Keep each commit focused on one coherent purpose.
- Prefer the largest cohesive unit over file-by-file commits.
- Keep supporting changes together, such as a file move and the import updates required by that move.
- Split changes when they represent independent concerns or should be reversible separately.
- Do not include unrelated working-tree changes in a commit.
