# Backlog

Worked in order. One ticket, one branch, one pull request. Do not start a ticket in a
later milestone before the current one ships.

Tags: OPUS means route that ticket to a top-tier model. Everything else is Sonnet.

---

## Milestone 0: Skeleton on the internet

Goal: an ugly but deployed app on day one, so deployment is never a scary thing waiting
at the end.

**M0-1. Scaffold.**
Vite with React 19. Install react-router, Tailwind v4 and Vitest. Tailwind configured
CSS-first in `src/index.css`, no config file. One route rendering the word "Nightcap".
Done when it runs locally.

**M0-2. Ship it.**
GitHub Pages deploy via Actions. Router basename set for the repo subpath, and the SPA
404 fallback in place so deep links do not break on Pages.
Done when the live URL loads and a refresh on a sub-route does not 404.

**M0-3. Design tokens.**
Palette from `CONTEXT.md` into `@theme`. Cormorant Garamond and Karla loaded. A scratch
route rendering every colour and both fonts, so you can see the identity before any
feature exists. Delete the scratch route at the end of M0.
Done when the tokens are usable as Tailwind classes.

---

## Milestone 1: The data

Goal: a normalised, committed index of every drink. No UI.

**M1-1. The fetch script.**
`scripts/build-index.mjs`. Pulls `search.php?f=a` through `z`, sequentially, with a delay
between calls and a retry on failure. Writes the raw result to a gitignored file so you
never have to re-fetch during development.
Done when running it twice in a row produces the same output without hammering the API.

**M1-2. The shape.**
Transform raw records into the app's own shape. Strip fields the app does not use. Pair
each ingredient with its measure. Handle the numbered `strIngredient1` through 15 fields
and the empty slots.
Done when the output is a clean array and you can explain why each kept field is kept.

**M1-3. Normalisation.**
The hard one. A `normaliseIngredientName` function plus an alias map. Casing, whitespace,
plurals, and the "Lemon juice" versus "Juice of a lemon" family. Applied in the script so
the runtime never sees a raw string.
Vitest tests required on the normalisation function specifically.
Done when the ingredient count drops meaningfully and you can name three collisions it
fixed.

**M1-4. The catalogue.**
Derive the shelf's bottle list from the index: every normalised ingredient, grouped into
categories (spirits, liqueurs, mixers, staples, garnish). Grouping needs a hand-written
map, since the source data does not carry categories. Staples are flagged.
Done when `src/data/` holds a committed drinks index and a committed ingredient catalogue.

---

## Milestone 2: The engine

Goal: the algorithm, fully tested, with no UI attached to it at all.

**M2-1. Intersection and scoring.**
A pure function taking the drinks index and a set of owned ingredients, returning each
drink with its missing ingredients listed. No React, no storage, no fetching.

**M2-2. Buckets and ranking.**
Group into the three buckets. Rank by total ingredient count, then alphabetically.

**M2-3. Tests.**
Vitest against hand-written fixtures, not the real index. Cover: empty shelf, shelf with
one bottle, exact match, one missing, two missing, staples toggle on and off, a drink with
a normalisation collision in it.
Done when you can change the ranking rule and a test tells you what broke.

---

## Milestone 3: The shelf

**M3-1. Shelf state.**
Owned ingredients in React state, grouped by category, toggleable.

**M3-2. Persistence.**
localStorage, with a versioned key so a future shape change does not crash on old data.
Handle the case where stored data is corrupt or from an older version.

**M3-3. Shelf search and staples.**
Filter the bottle list by typing. The staples-assumed toggle, on by default.
Done when a reload restores the exact shelf, and clearing site data does not white-screen.

---

## Milestone 4: The bar

**M4-1. Results as a menu.**
The three buckets rendered as a printed bar menu. Dot leaders. The "one bottle away"
bucket names the missing bottle on each line. Third bucket collapsed by default.

**M4-2. Empty and edge states.**
Empty shelf, shelf that yields nothing, shelf so full the list is enormous. The empty
state is copy, not a shrug.

**M4-3. Performance check.**
Confirm the intersection is not re-running on every unrelated render. Memoise where it
actually helps, and only where you can explain the measurement.
Done when toggling a bottle updates the menu with no perceptible lag.

---

## Milestone 5: The recipe

**M5-1. Recipe route.**
Route per drink. Photo, ingredients with owned and missing marked distinctly, measures,
method, glass. Attribution link to TheCocktailDB.

**M5-2. Deep links and misses.**
A recipe URL works pasted cold into a fresh browser. A bad drink id gets a real not-found
state, not a crash.

---

## Milestone 6: The door and the shell

**M6-1. The door.**
Landing route. Dark, unmarked, one click to enter. Remembers that you have been in before.
Reduced-motion respected.

**M6-2. Shell and navigation.**
Header, footer, the drink responsibly line, the About route.

**M6-3. OPUS: copy pass.**
The door, the About, the empty states, the drink responsibly line, the bucket headings.
Every user-facing string in the courteous bartender voice.

---

## Milestone 7: Finish

**M7-1. Accessibility pass.**
Keyboard through the whole app. Focus states visible on the dark palette. Labels on the
shelf toggles. Colour contrast checked against the real palette, especially muted text.

**M7-2. Meta and polish.**
Title, description, OG image, favicon. Lighthouse run and the obvious wins taken.

**M7-3. OPUS: README and case study.**
README states plainly that the bar is invented, credits TheCocktailDB, and explains the
build-time index decision. Case study leads with the algorithm, not the API.

**M7-4. Interview drill.**
Not code. Sit down in the chat app and defend the project cold: the data decision, the
normalisation problem, the ranking rule, what you would do differently. Anything shaky
gets re-explained before this project is called done.
