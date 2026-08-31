import { useState } from "react";

const initialMovies = [
  { id: 1, title: "The Last Reel", genre: "Drama", year: 2023, runtime: 118, watched: true, rating: 4.5, isNew: false },
  { id: 2, title: "Static & Signal", genre: "Sci-Fi", year: 2024, runtime: 132, watched: false, rating: null, isNew: true },
  { id: 3, title: "Marigold Hour", genre: "Drama", year: 2022, runtime: 104, watched: true, rating: 3.8, isNew: false },
  { id: 4, title: "Nine Red Doors", genre: "Thriller", year: 2024, runtime: 121, watched: false, rating: null, isNew: true },
  { id: 5, title: "Paper Boats", genre: "Comedy", year: 2021, runtime: 96, watched: true, rating: 4.1, isNew: false },
  { id: 6, title: "Low Orbit", genre: "Sci-Fi", year: 2023, runtime: 140, watched: false, rating: null, isNew: false },
  { id: 7, title: "The Quiet Ledger", genre: "Thriller", year: 2022, runtime: 109, watched: true, rating: 4.9, isNew: false },
  { id: 8, title: "Half-Light Waltz", genre: "Comedy", year: 2024, runtime: 98, watched: false, rating: null, isNew: true },
];

const GENRES = ["All", "Drama", "Sci-Fi", "Thriller", "Comedy"];

// Reusable component: no props besides what it needs to render itself
function EmptyState() {
  return (
    <div style={{ gridColumn: "1 / -1", padding: 40, textAlign: "center", color: "#9c927f", border: "1px dashed #34291e", borderRadius: 6 }}>
      <p>No titles in this genre yet.</p>
    </div>
  );
}

// Reusable component: driven entirely by props
function MovieCard({ movie, onToggleWatched }) {
  const { title, genre, year, runtime, watched, rating, isNew } = movie;
  return (
    <article style={{ position: "relative", background: "#1e1a15", border: "1px solid #34291e", borderRadius: 6, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 6, background: "repeating-linear-gradient(90deg,#34291e 0px,#34291e 6px,transparent 6px,transparent 12px)" }} />
      {/* && operator: ribbon only renders when isNew is true */}
      {isNew && (
        <span style={{ position: "absolute", top: 14, right: -30, transform: "rotate(38deg)", background: "#a63d40", color: "#f7e6e6", fontSize: 11, fontWeight: 600, padding: "3px 34px" }}>
          New
        </span>
      )}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 19, margin: 0, lineHeight: 1.25, color: "#f2ece0" }}>{title}</h3>
        <p style={{ margin: 0, color: "#9c927f", fontSize: 13 }}>{genre} · {year} · {runtime} min</p>
        {/* Ternary operator: status text depends on watched + rating */}
        <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 500, color: watched ? "#e8b54d" : "#9c927f" }}>
          {watched ? (rating ? `Watched · rated ${rating.toFixed(1)}/5` : "Watched") : "Not watched yet"}
        </p>
        {/* && operator: rating bar only renders when a rating exists */}
        {rating && (
          <div style={{ height: 4, background: "#262019", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(rating / 5) * 100}%`, background: "#e8b54d" }} />
          </div>
        )}
        <button
          onClick={() => onToggleWatched(movie.id)}
          style={{ marginTop: "auto", paddingTop: 10, border: "none", borderTop: "1px solid #34291e", background: "none", color: "#f2ece0", fontSize: 13, textAlign: "left", cursor: "pointer" }}
        >
          {watched ? "Mark as unwatched" : "Mark as watched"}
        </button>
      </div>
    </article>
  );
}

// Reusable component: renders a list of MovieCard via .map(), passing props down
function MovieList({ movies, onToggleWatched }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18 }}>
      {movies.length === 0 && <EmptyState />}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onToggleWatched={onToggleWatched} />
      ))}
    </section>
  );
}

// Reusable component: genre pills built with .map(), active state via ternary
function GenreFilter({ genres, activeGenre, onSelect }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid " + (genre === activeGenre ? "#e8b54d" : "#34291e"),
            background: genre === activeGenre ? "#e8b54d" : "transparent",
            color: genre === activeGenre ? "#1a1509" : "#9c927f",
            fontWeight: genre === activeGenre ? 600 : 400,
            fontSize: 13.5,
            cursor: "pointer",
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

function Header({ totalCount, watchedCount }) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: "linear-gradient(160deg,#e8b54d,#b9862e)", color: "#1a1509", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        CT
      </div>
      <div>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 800, fontSize: 32, margin: "0 0 4px", color: "#f2ece0" }}>CineTrack</h1>
        <p style={{ margin: 0, color: "#9c927f", fontSize: 14 }}>{watchedCount} of {totalCount} watched</p>
      </div>
    </header>
  );
}

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [activeGenre, setActiveGenre] = useState("All");

  // Ternary operator: full list vs filtered list
  const visibleMovies = activeGenre === "All" ? movies : movies.filter((m) => m.genre === activeGenre);
  const watchedCount = movies.filter((m) => m.watched).length;

  function toggleWatched(id) {
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m)));
  }

  return (
    <div style={{ background: "#14120f", minHeight: "100vh", padding: "40px 24px 60px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Header totalCount={movies.length} watchedCount={watchedCount} />
        <GenreFilter genres={GENRES} activeGenre={activeGenre} onSelect={setActiveGenre} />
        <MovieList movies={visibleMovies} onToggleWatched={toggleWatched} />
      </div>
    </div>
  );
}
