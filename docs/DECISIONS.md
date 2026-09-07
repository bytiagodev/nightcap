# Decisions

Append only. Never rewrite an entry. If a decision is reversed, add a new entry that says
so and points back at the old one.

Each entry: what we decided, what we rejected, and why. Keep them short. The value is in
having a reason on record, not in the prose.

---

## ADR-001: Drink data is baked at build time, not fetched at runtime

**Date:** kickoff
**Status:** accepted

**Decision.** A Node script fetches the full TheCocktailDB free dataset once, normalises
it, and writes a JSON index committed to the repo. The app makes no API calls at runtime.
Drink photos load from TheCocktailDB's CDN.

**Rejected: runtime fetching with a cache.** Answering "what can I make" needs the full
ingredient list of every candidate drink. The free API's multi-ingredient filter is
paywalled, so the only runtime path is one request per shelf bottle to get candidates,
then one request per candidate to get its ingredients. A ten bottle shelf can union
several hundred drinks. That forces a request queue, a concurrency limiter, a persistent
cache and a staleness policy, all to deliver a slower first experience.

**Why build time wins.** The free dataset is around 600 drinks, retrievable in 26 calls
via `search.php?f=a` through `z`, and it is effectively static. Baking it makes the
intersection instant, removes every runtime failure mode, and means the app cannot break
because a free API is rate limiting on the day someone opens the link.

**Costs accepted.** The index is frozen at build time and goes stale until the script is
re-run. The repo carries a data file. Both are cheap next to the alternative.

**Ethics.** TheCocktailDB is credited on every recipe view and in the README. Images are
loaded from their CDN rather than mirrored, so traffic still reaches them. If their terms
ask for a supporter key for public release, pay it.

---

## ADR-002: No state management library

**Date:** kickoff
**Status:** accepted

**Decision.** React state and context only.

**Why.** The app has one piece of shared state, the shelf. Everything else is derived from
it by a pure function. Reaching for Redux or Zustand here would be answering a question
nobody asked, and it would hide the thing that is actually interesting about this
codebase.

---

## ADR-003: The intersection engine is pure and lives outside React

**Date:** kickoff
**Status:** accepted

**Decision.** The engine takes the drinks index and a set of owned ingredients and returns
ranked buckets. No fetching, no storage, no hooks, no components.

**Why.** It makes the hard part of the app testable without rendering anything, and it
makes it explainable on a whiteboard without React in the way. Both of those matter more
than the small amount of plumbing it costs.
