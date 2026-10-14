
import { useState, useEffect } from "react";

// Component 1: Displays the joke or loading message
function JokeDisplay({ joke, loading }) {
  return (
    <div className="joke-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{joke || "No joke available."}</p>
      )}
    </div>
  );
}

// Component 2: Button for fetching a new joke
function FetchButton({ fetchJoke }) {
  return (
    <button
      type="button"
      className="fetch-button"
      onClick={fetchJoke}
    >
      Get a New Joke
    </button>
  );
}

// Component 3: Main application
function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchJoke() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Programming?type=single"
      );

      if (response.ok === false) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();

      if (data.error || !data.joke) {
        throw new Error("No joke was returned");
      }

      setJoke(data.joke);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setError("Could not load a joke. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app">
      <h1>Programming Jokes</h1>

      <JokeDisplay joke={joke} loading={loading} />

      {error && <p role="alert">{error}</p>}

      <FetchButton fetchJoke={fetchJoke} />
    </div>
  );
}

export default App;
