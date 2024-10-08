import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ArtworkDetailPage = ({ artworks }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(); 
  const user = auth.currentUser;

  const artwork = location.state?.artwork;
  const hasRequiredDetails =
    artwork &&
    artwork.imageUrl &&
    artwork.title &&
    artwork.creator &&
    artwork.date &&
    artwork.workType;

  if (!hasRequiredDetails) {
    return <div>Artwork details are incomplete or not available.</div>;
  }

  const saveArtwork = () => {
    if (!user) {
      alert('You must be signed in to save artwork!');
      navigate("/signin-signup"); 
      return;
    }
    const savedArtworks = JSON.parse(sessionStorage.getItem('savedArtworks')) || [];
    savedArtworks.push(artwork);
    sessionStorage.setItem('savedArtworks', JSON.stringify(savedArtworks));
    alert(`${artwork.title} has been saved to your exhibition!`);
  };
  return (
    <div className="artwork-detail-page">
      <div className="artwork-detail-container">
        <h1 className="artwork-detail-title">{artwork.title}</h1>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="artwork-detail-image"
        />

        <p>
          <strong>Creator:</strong> {artwork.creator}
        </p>
        <p>
          <strong>Date:</strong> {artwork.date}
        </p>

        <p>
          <strong>Work Type:</strong> {artwork.workType}
        </p>
        <a
          href={artwork.edmIsShownAt ? artwork.edmIsShownAt[0] : artwork.url}
          target="_blank"
          rel="noopener noreferrer"
          className="artwork-detail-link"
        >
          View on Original Site
        </a>
        <button onClick={saveArtwork} className="artwork-detail-save-button">
            Save Artwork
          </button>
        <button
          onClick={() => navigate(-1)}
          className="artwork-detail-back-button"
        >
          Back to Search Results
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
