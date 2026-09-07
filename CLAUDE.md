# The Nightcap: standing rules

Read this file at the start of every session. It is the only copy. Do not duplicate it,
summarise it into another file, or create a second version anywhere in this repo.

## What this is

A React app that takes a list of bottles the user owns and returns every real cocktail
they can make right now, plus the ones they are one bottle short of. Wrapped in a
speakeasy fiction.

## Where truth lives

- `docs/CONTEXT.md` is the frozen product spec. Palette, typography, scope, tone,
  what is permanently out of scope. If a request contradicts it, the file wins.
- `docs/BACKLOG.md` is the work. One ticket at a time, in order.
- `docs/DECISIONS.md` is why the code looks the way it does. Append, never rewrite.
- `docs/ICEBOX.md` is where new ideas go to wait. Nothing leaves it mid-milestone.

## Stack

React 19, Vite, react-router, Tailwind CSS v4, Vitest. Deployed to GitHub Pages.

Tailwind v4 is CSS-first. Configuration lives in `src/index.css` using `@import "tailwindcss"`
and `@theme`. There is no `tailwind.config.js` in this project and one must not be created.

No state management library. No component library. No UI kit. If a problem seems to need
one, raise it as a question, do not install it.

## How we work

Every ticket is planned in plan mode before any code is written. The plan names the files
it will touch and the data shapes it will introduce. No code arrives without an approved
plan.

One ticket, one branch, one pull request. Branch names are `type/short-description`,
for example `feat/shelf-persistence`.

Never write code while the checked-out branch is `main`. Check the current branch
before starting any ticket. If it is `main`, stop and say so.

Commits follow conventional commits: `feat(shelf): persist selected bottles to localStorage`.
Commit at every working checkpoint, not once at the end of a ticket.

## Code standards

Names are spelled out. `ingredientsOnShelf`, not `ingr` or `data2` or `temp`. A reader
who has never seen this codebase should be able to guess what a function does from its
name alone.

Functions do one thing. If a function needs the word "and" to describe it, it is two
functions.

The intersection engine is pure. It takes data in and returns data out. No fetching,
no localStorage, no React inside it. This is deliberate: it makes the hard part of the
app testable and explainable in isolation.

Comments explain why, never what. `// the API mixes singular and plural ingredient names`
is useful. `// loop through the drinks` is noise.

Prefer plain JavaScript solutions over clever ones. This code has to be defended out loud
in an interview.

## Definition of done

A ticket is not done until all of these are true:

1. It works in the browser.
2. Any pure logic it added has a Vitest test.
3. Loading, empty and error states exist where the feature can produce them.
4. It is keyboard operable and has sensible labels.
5. The pull request body explains what changed and why, written by Tiago in his own words.

Point 5 is not optional and not a formality. If it cannot be written without reading the
diff, the ticket is not finished being understood and it does not merge yet.

## Hard rules

- No em dashes anywhere. Not in code, comments, copy, commit messages or documentation.
  Hyphens joining compound words are fine.
- All user-facing copy is English. Code, identifiers and comments are English.
- No new dependency without asking first, and the ask includes what it replaces and why
  the plain version is not good enough.
- No features that are not in `docs/BACKLOG.md`. Good ideas go to `docs/ICEBOX.md`.
- Never present the fiction as real. The README says plainly that the bar is invented.
- Attribute TheCocktailDB on every recipe view and in the README.

## Teaching protocol

Tiago is building this to be able to explain it in job interviews, not just to ship it.

When you finish a ticket, close with two things: a three sentence summary of what the
code now does, and one question that checks whether he could defend a decision inside it.
Do not ask trivia. Ask the thing an interviewer would ask.

When he asks how something works, explain it once, plainly, without restating the code
line by line.

When something breaks, ask what he sees before proposing a fix. Never respond to a bug by
regenerating a large fresh version of a file.
