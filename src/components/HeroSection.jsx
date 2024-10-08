// import React from "react";

// const HeroSection = () => {
//   return (
//     <section className="hero-section">
//       <h1>Curate Your Own Virtual Art Exhibition</h1>
//       <input type="text" placeholder="Search for artworks..." />
//       <button>Search</button>
//       <p>
//         Explore artworks from top museums, curate your own exhibition, and
//         immerse yourself in the world of art.
//       </p>
//       <button className="call-to-action">Browse Collections</button>
//     </section>
//   );
// };

// export default HeroSection;
import React, { useState } from "react";
import { useFetchArtworks } from "./useFetchArtworks"; // Use the custom hook
import { useNavigate } from "react-router-dom";
import Search from '../pages/Search'

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const { fetchArtworks } = useFetchArtworks();
  const navigate = useNavigate();

  const handleSearch = () => {
    fetchArtworks(query);
    navigate("/search"); // Redirect to the search results page
  };

  return (
    <section className="hero-section">
      <h1>Curate Your Own Virtual Art Exhibition</h1>
      {/* <input
        type="text"
        placeholder="Search for artworks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
       */}
       <Search />
      <p>
        Explore artworks from top museums, curate your own exhibition, and
        immerse yourself in the world of art.
      </p>
      {/* <button className="call-to-action">Browse Collections</button> */}
    </section>
  );
};

export default HeroSection;
