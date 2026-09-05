# Project Guidelines

## Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Uniwind
- React Native Reusables
- pnpm

Before making changes, inspect package.json and existing project conventions.
Do not assume a library or script exists without checking the repository.

## General principles

- Prefer simple, readable implementations over premature abstraction.
- Follow existing project structure and naming conventions.
- Do not introduce a new dependency when the existing stack can solve the problem.
- Do not modify unrelated files.
- Avoid broad refactors while implementing a focused task.
- Preserve existing behavior unless the requested change explicitly requires otherwise.

## React Native

- Use React Native primitives instead of DOM elements.
- Do not use browser-only APIs unless the code is explicitly web-only.
- Consider iOS, Android, and web differences when using platform-specific APIs.
- Use Platform.select or platform-specific files only when behavior genuinely differs.
- Account for Safe Area, keyboard behavior, touch targets, and accessibility.
- Avoid hard-coded layout dimensions when responsive layout is appropriate.

## Lists and performance

- Prefer FlatList or another virtualized list for potentially large collections.
- Avoid rendering large dynamic collections with ScrollView + map.
- Keep renderItem stable when it materially affects list performance.
- Do not introduce memoization without a concrete rendering or computation reason.
- Supply stable keys based on domain identifiers where possible.

## Styling

- Prefer Uniwind className styling.
- Use the project's existing cn utility when composing conditional classes.
- Avoid mixing StyleSheet and Uniwind without a concrete reason.
- Follow existing design tokens instead of introducing arbitrary colors and spacing.
- Check existing React Native Reusables components before creating duplicate primitives.

## Components

- Keep components focused on one responsibility.
- Extract hooks when stateful behavior becomes reusable or obscures the component.
- Avoid unnecessary wrapper components and barrel files.
- Prefer composition over large prop-driven components with many boolean branches.

## TypeScript

- Avoid any unless there is a justified interoperability boundary.
- Prefer inferred types where they remain clear.
- Use explicit domain types for API responses and business entities.
- Avoid unnecessary type assertions.
- Do not suppress TypeScript errors with @ts-ignore unless explicitly justified.

## Data fetching

- Follow the data-fetching library already used by the repository.
- Keep API transport logic separate from UI components.
- Handle loading, error, retry, and stale-data behavior intentionally.
- Do not duplicate server state into local state without a concrete reason.

## Architecture

- Keep application source under `src/`; keep Expo and tool configuration files at the repository root.
- Treat `src/app` as the Expo Router declaration layer. Route files may define layouts, navigation options, redirects, protection, and route parameter adapters, but substantial UI and business logic belong outside it.
- Put route-level UI composition in `src/screens`. A route normally renders one screen, and simple routes do not require a wrapper solely for consistency.
- Organize business code by domain under `src/features`. Create only the subdirectories a feature currently needs.
- Use explicit feature segments instead of a broad `model` directory:
  - `api` for transport functions, API request/response types, query keys, queries, and mutations.
  - `components` for UI that belongs only to that feature.
  - `state` for feature-owned client state such as Zustand stores.
  - `schemas` for form and domain validation schemas and their inferred types.
  - `lib` for feature-specific pure helpers and transformations.
- Keep a feature's state in that feature even when multiple screens consume it. Use `src/stores` only for client state with no clear domain owner, such as app-wide UI or environment state.
- Keep framework and platform infrastructure in `src/lib`. Common HTTP transport, Query setup, storage adapters, theme bridges, and truly domain-agnostic utilities belong there; domain endpoints, query keys, storage policies, and calculations do not.
- Do not create top-level `schemas`, `types`, `hooks`, or `utils` dumping grounds. Colocate API DTOs with API code, infer types from schemas when possible, and place domain helpers in the owning feature.

## UI layers

- Reserve `src/components/ui` for components added or maintained through React Native Reusables. Do not place project-specific composed components in this directory.
- Place domain-agnostic composed components in role-based sibling directories such as `components/forms`, `components/feedback`, `components/layout`, or `components/navigation`. Create a directory only when a component of that role exists.
- Build feature UI from React Native Reusables and shared composed components, then compose features into screens.
- Keep Stack, Tabs, protected routes, and navigation-tree configuration in Expo Router `_layout.tsx` files. Reusable navigation visuals may live in `components/navigation`.
- Do not extract a component only because a short `View` and `className` combination repeats. Extract when the component enforces stable semantics, accessibility, Safe Area or keyboard behavior, responsive rules, or coordinated design changes.
- Do not introduce `entities` or `widgets` preemptively. Add an entity when multiple features share ownership of a concrete domain concept; add a widget when a reusable screen section composes multiple features or entities.

## Dependency direction

- Keep dependencies flowing from routing and composition toward lower-level modules: `app -> screens -> widgets/features -> entities -> components/lib`.
- Layers may skip intermediate layers; a screen may import a feature or shared component directly.
- Features may use shared components and infrastructure. Shared components and `lib` must not import features.
- Entities, if introduced, must not import features. Prefer composing features in a screen or widget over creating feature-to-feature dependencies.
- Avoid unnecessary barrel files; import from the owning module's explicit path unless a stable public API is justified.

## Verification

After modifying code:

1. Run the narrowest relevant existing checks first.
2. Run TypeScript/typecheck if the project provides it.
3. Run lint if the project provides it.
4. Run relevant tests if they exist.
5. Report any checks that could not be run.

Do not invent npm scripts. Inspect package.json first.

## Git

- Follow the commit convention documented in `CONTRIBUTING.md`.
- Use `feat`, `fix`, `refactor`, `init`, `docs`, or `chore` as the commit type.
- Keep commit messages concise and write the subject in imperative English without a trailing period.
- When asked to commit work from the current session, group changes into the largest cohesive commits that still represent one purpose.
- Commit only changes attributable to the current session. If ownership is unclear, ask before staging them.
- Do not commit automatically unless explicitly requested.
- Do not push automatically unless explicitly requested.
- Do not discard unrelated working-tree changes.
