'use client';
import React, { useState } from "react";
import { BASE_URL } from "./constants";
import MovieGrid from "./components/MovieGrid";
import Modal from "./components/Modal";
// Import MovieCard jika digunakan
// import MovieCard from "./components/MovieCard";

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching', error);
    // Pastikan untuk mengembalikan nilai atau melemparkan kembali error jika diperlukan.
    throw error;
  }
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleMovieClick(movie) {
    setSelectedMovie(movie)
  }

  function handleCloseModal() {
    setSelectedMovie(null)
  }
  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    try {
      const results = await searchMovies(query);
      setMovies(results.results);
    } catch (error) {
      console.error('Error handling search:', error);
      // Handle error jika diperlukan.
    }
  }

  console.log({ movies });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold m-4">Hanif Movie</h1>
        <form onSubmit={handleSearch} className="mt-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="px-4 py-2 w-80 text-gray-900" // Ganti w-800 dengan w-full atau nilai yang sesuai
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" type="submit">Search</button>
        </form>
        <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />

      </main>
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
