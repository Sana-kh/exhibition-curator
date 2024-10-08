
import React, { useState } from "react";
import { useFetchArtworks } from "./useFetchArtworks";
import { useNavigate } from "react-router-dom";
import Search from '../pages/Search'

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const { fetchArtworks } = useFetchArtworks();
  const navigate = useNavigate();

  const handleSearch = () => {
    fetchArtworks(query);
    navigate("/search"); 
  };

  return (
    <section className="hero-section">
      <h1>Curate Your Own Virtual Art Exhibition</h1>
 
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
