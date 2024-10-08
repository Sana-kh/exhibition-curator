import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEuropeanaArtworks, fetchHarvardArtworks } from "../pages/api";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedArtworks = async () => {
      try {
        const europeanaResults = await fetchEuropeanaArtworks("art");
        const harvardResults = await fetchHarvardArtworks("art");

        const combinedArtworks = [...europeanaResults, ...harvardResults];
        const artworksWithImages = combinedArtworks.filter(
          artwork => artwork.imageUrl);

        const shuffledArtworks = artworksWithImages.sort(
          () => 0.5 - Math.random()
        );
        const randomArtworks = shuffledArtworks.slice(0, 12);

        setArtworks(randomArtworks);
      } catch (err) {
        console.error("Error fetching featured artworks:", err);
        setError("Unable to load featured artworks.");
      } finally {
        setLoading(false);
      }
    };

    getFeaturedArtworks();
  }, []);

  if (loading) {
    return <p>Loading Featured Artworks...</p>;
  }

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }

  return (
    <div>
      <h2>Popular Artworks</h2>
      <section className="featured-artworks">
        <div className="artwork-grid">
          {artworks.map((artwork, index) =>
            <div key={index} className="artwork-card">
              <Link to={`/artwork/${index}`} state={{ artwork }}>
                <img
                  src={
                    artwork.imageUrl
                  }
                  alt={artwork.title}
                  style={{ width: "150px", height: "auto" }}
                />
              </Link>
              <p>
                <Link to={`/artwork/${index}`} state={{ artwork }}>
                  {artwork.title}
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FeaturedArtworks;
