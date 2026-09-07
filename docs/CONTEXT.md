# The Nightcap: product context

Frozen at kickoff. This is the spec. Changing it mid-build requires a deliberate decision
recorded in `DECISIONS.md`, not a passing "it would be nice if".

## What it is

A speakeasy in the browser with one genuinely useful trick. You tell the bartender which
bottles you have at home, and the bar tells you every real cocktail you can make right
now, plus the ones you are exactly one bottle short of.

The intersection search is the utility. The bar is the charm. Neither works without the
other.

Name: The Nightcap. Locked.
Tagline: "Tell the bartender what you have."

## Locked decisions

**Data is baked at build time, not fetched at runtime.** A Node script pulls the whole
free dataset from TheCocktailDB, normalises it, and writes a single JSON index committed
to the repo. The app makes no API calls at runtime. Drink photos load from TheCocktailDB's
own CDN. Reasoning is in `DECISIONS.md`, ADR-001.

**No accounts, no backend.** The shelf lives in localStorage and nowhere else. The copy
treats this as a feature, because it is one.

**The door opens for everyone.** No password, no gate, no friction. It is theatre.

## The three buckets

The whole app exists to produce these:

1. **You can make these.** Nothing missing.
2. **One bottle away.** Exactly one ingredient missing, and the app names it.
3. **Worth a shopping trip.** Two missing. Collapsed by default.

Ranking inside each bucket: fewer total ingredients first, so the simple drinks surface
above the fourteen ingredient tiki monsters. Alphabetical as the tiebreak.

Staples (ice, water, sugar, salt) are assumed owned by default, with a visible toggle to
turn that off. Without this the app tells a person with a full bar that they can make
nothing, which is the single most likely way this feature fails.

## The hard part

Ingredient name normalisation. The source data mixes "Lemon juice", "Juice of a lemon"
and "Fresh lemon juice" as separate ingredients. Singular and plural are inconsistent.
Casing is inconsistent. If this is not solved, the intersection returns garbage and the
whole app is pointless.

Approach: a normalisation function plus an alias map, applied in the build script so the
runtime never sees a raw ingredient string. The alias map grows as cases are found. It
lives in version control where it can be reviewed.

## Rooms

- **The door.** Dark landing screen, unmarked door, one click to enter.
- **The bar.** Shelf builder on one side, results as a printed menu on the other.
- **The recipe.** Full card per drink: photo, ingredients with owned and missing states
  marked, method, glass, attribution link.

## Visual identity

Warm, low-lit, unhurried. Nothing bright, nothing bouncy.

### Palette

- Wall background deep green `#10201a`
- Panel wood dark `#0b1512`
- Card surface `#152a22` with brass borders at 20 percent
- Brass accent `#c9a227`, the only metal, used for rules, icons and hover states
- Cream text `#f2ead8`
- Muted text `#8fa398`
- Oxblood `#7a2e2b`, missing-ingredient tags only, sparing

### Typography

- Display and drink names: Cormorant Garamond 600, italic for taglines
- Body and UI: Karla 400 and 600
- The results list is typeset like a printed bar menu, with dot leaders between the drink
  name and its detail

### Tone

The copy is a courteous bartender. Brief, dry, never wacky, never exclamation marks. The
bar never claims a physical address.

## Scope

**MVP.** The door, the shelf builder with persistence, the intersection engine with three
buckets, recipe pages, deployed and working.

**Stretch, only after MVP ships.** A non-alcoholic filter, a "surprise me" random pour,
shelf sharing via URL.

**Permanently out of scope.** Accounts, ratings, user submissions, shopping links,
affiliate anything, comments, a backend of any kind.

## Required

A small, non-preachy drink responsibly line in the footer. Not negotiable.

TheCocktailDB attribution on every recipe view and in the README.

## Things to avoid

- No em dashes anywhere.
- Do not gate the door behind a fake password.
- Do not mirror their images. Load from their CDN.
- The project is "The Nightcap" in all public copy, never "the cocktail app".
