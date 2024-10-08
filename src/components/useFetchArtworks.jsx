import { useState } from "react";
import { fetchEuropeanaArtworks, fetchHarvardArtworks } from "../pages/api";

export const useFetchArtworks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchArtworks = (query) => {
    setLoading(true);
    setError(null);

    Promise.all([fetchEuropeanaArtworks(query), fetchHarvardArtworks(query)])
      .then(([europeanaResults, harvardResults]) => {
        const filterArtworks = artworks =>
          artworks.filter(artwork =>
            artwork.imageUrl && artwork.title && artwork.creator && artwork.date && artwork.workType
          );

        const combinedArtworks = [
          ...filterArtworks(europeanaResults),
          ...filterArtworks(harvardResults)
        ];

        setSearchResults(combinedArtworks);
      })
      .catch(() => {
        setError("Error fetching artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, searchResults, fetchArtworks };
};
