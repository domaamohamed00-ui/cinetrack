# CineTrack

A small movie-watchlist app built to demonstrate five core React concepts.

## Run it

```
npm install
npm run dev
```

## Where each concept lives

| Concept | File | What it does |
|---|---|---|
| Reusable Components | `src/components/*.jsx` | `Header`, `GenreFilter`, `MovieCard`, `MovieList`, `EmptyState` are each self-contained and reused (every `MovieCard` is the same component, rendered once per movie). |
| Props | `App.jsx` → `Header`, `GenreFilter`, `MovieList` → `MovieCard` | Data (`movies`, `activeGenre`, counts) and callbacks (`onSelect`, `onToggleWatched`) flow down through props. |
| Ternary Operator | `App.jsx` (filtered list), `MovieCard.jsx` (status text, button label), `GenreFilter.jsx` (active pill class) | Picks between two render outputs based on state. |
| `&&` Operator | `MovieCard.jsx` (New ribbon, rating bar), `MovieList.jsx` (empty state) | Renders an element only when a condition is true. |
| `.map()` | `GenreFilter.jsx` (genre pills), `MovieList.jsx` (movie cards) | Turns an array into a list of elements. |

## Project structure

```
src/
  components/
    Header.jsx
    GenreFilter.jsx
    MovieList.jsx
    MovieCard.jsx
    EmptyState.jsx
  data/
    movies.js
  App.jsx
  App.css
  main.jsx
```
