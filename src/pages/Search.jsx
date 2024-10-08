import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchEuropeanaArtworks, fetchHarvardArtworks } from "./api";
import Modal from "../components/Modal";
import { SearchContext } from "./SearchContext";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { searchResults, setSearchResults, query, setQuery } = useContext(
    SearchContext
  );

  // const handleSearch = () => {
  //   setLoading(true);
  //   setError(null);

  //   Promise.all([fetchEuropeanaArtworks(query), fetchHarvardArtworks(query)])
  //     .then(([europeanaResults, harvardResults]) => {
  //       const filterArtworks = artworks =>
  //         artworks.filter(artwork => artwork.imageUrl && artwork.imageUrl.startsWith("http"));
  //       const combinedArtworks = [
  //         ...filterArtworks(europeanaResults),
  //         ...filterArtworks(harvardResults)
  //       ];
  //       const enrichedArtworks = combinedArtworks.map(artwork => ({
  //         title: artwork.title ,
  //         creator: artwork.creator ,
  //         date: artwork.date ,
  //         contributors: artwork.contributors ,
  //         theme: artwork.theme ,
  //         workType: artwork.workType ,
  //         imageUrl: artwork.imageUrl ,
  //         dcDescription: artwork.dcDescription || ["No description available."]
  //       }));
  //       const reFilteredArtworks = enrichedArtworks.filter(artwork =>
  //         artwork.imageUrl &&
  //         artwork.title &&
  //         artwork.dcDescription &&
  //         artwork.creator &&
  //         artwork.date &&
  //         artwork.contributors &&
  //         artwork.theme &&
  //         artwork.workType
  //       );
  //       setSearchResults(reFilteredArtworks);
  //       console.log(reFilteredArtworks);
  //     })
  //     .catch(err => {
  //       setError("Error fetching artworks. Please try again.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  // const handleSearch = () => {
  //   setLoading(true);
  //   setError(null);
  
  //   Promise.all([fetchEuropeanaArtworks(query), fetchHarvardArtworks(query)])
  //     .then(([europeanaResults, harvardResults]) => {
  //       const filterArtworks = artworks =>
  //         artworks.filter(artwork =>
  //           artwork.imageUrl && 
  //           Array.isArray(artwork.title) && artwork.title.length > 0 && // Check if title is an array and non-empty
  //           Array.isArray(artwork.dcDescription) && artwork.dcDescription.length > 0 && // Check if description is an array and non-empty
  //           artwork.creator && 
  //           artwork.date && 
  //           artwork.contributors && 
  //           artwork.theme && 
  //           artwork.workType
  //         );
  
  //       const combinedArtworks = [
  //         ...filterArtworks(europeanaResults),
  //         ...filterArtworks(harvardResults)
  //       ];
  
  //       setSearchResults(combinedArtworks);
  //       console.log(combinedArtworks); // To verify the filtered results
  //     })
  //     .catch(err => {
  //       setError("Error fetching artworks. Please try again.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  // const handleSearch = () => {
  //   setLoading(true);
  //   setError(null);
  
  //   Promise.all([fetchEuropeanaArtworks(query), fetchHarvardArtworks(query)])
  //     .then(([europeanaResults, harvardResults]) => {
  //       console.log("Europeana Results:", europeanaResults);
  //       console.log("Harvard Results:", harvardResults);
  //       const filterArtworks = artworks =>
  //         artworks.filter(artwork => {
  //           // Check for a valid image URL
  //           const hasValidImage = artwork.imageUrl && artwork.imageUrl.startsWith("http");
  
  //           // Title can be an array or string, ensure it has at least one non-empty value
  //           const hasValidTitle = (Array.isArray(artwork.title) && artwork.title.length > 0 && artwork.title[0].trim()) ||
  //                                 (typeof artwork.title === 'string' && artwork.title.trim());
  
  //           // Description can be an array or string, ensure it has at least one non-empty value
  //           const hasValidDescription = (Array.isArray(artwork.dcDescription) && artwork.dcDescription.length > 0 && artwork.dcDescription[0].trim()) ||
  //                                       (typeof artwork.dcDescription === 'string' && artwork.dcDescription.trim());
  
  //           // Other properties should not be "Unknown" or empty
  //           const hasValidCreator = artwork.creator && artwork.creator !== "Unknown" && artwork.creator.trim();
  //           const hasValidDate = artwork.date && artwork.date !== "Unknown" && artwork.date.trim();
  //           const hasValidContributors = artwork.contributors && artwork.contributors !== "Unknown" && artwork.contributors.trim();
  //           const hasValidTheme = artwork.theme && artwork.theme !== "Unknown" && artwork.theme.trim();
  //           const hasValidWorkType = artwork.workType && artwork.workType !== "Unknown" && artwork.workType.trim();
  
  //           // Return true only if all the conditions are satisfied
  //           return hasValidImage && hasValidTitle && hasValidDescription &&
  //             hasValidCreator && hasValidDate && hasValidContributors &&
  //             hasValidTheme && hasValidWorkType;
  //         });
  
  //       // Combine and filter artworks
  //       const combinedArtworks = [
  //         ...filterArtworks(europeanaResults),
  //         ...filterArtworks(harvardResults)
  //       ];
  
  //       setSearchResults(combinedArtworks);
  //       console.log(combinedArtworks); // Check if artworks are being filtered correctly
  //     })
  //     .catch(err => {
  //       setError("Error fetching artworks. Please try again.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const handleSearch = () => {
    setLoading(true);
    setError(null);
  
    Promise.all([fetchEuropeanaArtworks(query), fetchHarvardArtworks(query)])
      .then(([europeanaResults, harvardResults]) => {
        const filterArtworks = artworks =>
          artworks.filter(artwork =>
            artwork.imageUrl && 
            artwork.title && 
            artwork.creator && 
            artwork.date && 
            artwork.workType
          );
  
        const combinedArtworks = [
          ...filterArtworks(europeanaResults),
          ...filterArtworks(harvardResults)
        ];
  
        setSearchResults(combinedArtworks);
      })
      .catch(err => {
        setError("Error fetching artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  const handleImageClick = src => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <section>
        <section className="hero-section">
          <input
            type="text"
            placeholder="Search for artworks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </section>

        {loading
          ? <p>Loading artworks...</p>
          : error
            ? <p>
                {error}
              </p>
            : <div className="artwork-grid">
               
                {searchResults.map((artwork, index) =>
                  <div className="artwork-card" key={index}>
                    <div
                      className="image-container"
                      onClick={() => handleImageClick(artwork.imageUrl)}
                      style={{ width: "150px" }}
                    >
                      <img
                        className="image"
                        src={artwork.imageUrl}
                        alt={artwork.title}
                      />
                    </div>
                    <p>
                      <Link to={`/artwork/${index}`} state={{ artwork }}>
                        {artwork.title}
                      </Link>
                    </p>
                    
                  </div>
                )}
              </div>}
      </section>
      {selectedImage &&
        <Modal onClose={closeModal}>
          <img
            src={selectedImage}
            alt="Zoomed Artwork"
            style={{ width: "100%", cursor: "zoom-out" }}
          />
        </Modal>}
    </div>
  );
};

export default Search;
