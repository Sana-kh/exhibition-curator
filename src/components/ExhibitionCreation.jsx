import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import './ExhibitionCreation.css';
import { useNavigate } from 'react-router-dom';

const ExhibitionCreation = () => {
  const { currentUser } = useAuth();
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [artworks, setArtworks] = useState([]);
  const [exhibitionArtworks, setExhibitionArtworks] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [exhibitionSummary, setExhibitionSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedArtworks = JSON.parse(sessionStorage.getItem('savedArtworks')) || [];
    setArtworks(savedArtworks);
  }, []);

  const handleAddArtwork = (artwork) => {
    setExhibitionArtworks([...exhibitionArtworks, artwork]);
  };

  const handleRemoveArtwork = (artworkToRemove) => {
    setExhibitionArtworks(exhibitionArtworks.filter(artwork => artwork.id !== artworkToRemove.id));
  };

  const handleSubmit = () => {
    const exhibitionDetails = {
      description,
      visibility,
      artworks: exhibitionArtworks,
    };
    if (!description.trim() || exhibitionArtworks.length === 0) {
        alert('Please provide a description and add at least one artwork.');
        return;
    }
    // Save exhibition details in session storage 
 
    sessionStorage.setItem('exhibitionDetails', JSON.stringify(exhibitionDetails));
    //alert('Exhibition created successfully!');
    setSubmissionSuccess(true);
    setExhibitionSummary({
        title: `Exhibition: ${description.slice(0, 20)}...`, // Short title
        description,
        artworks: exhibitionArtworks.slice(0, 3), // Show only the first 3 artworks
      });
    setDescription('');
    setExhibitionArtworks([]);
    //setTimeout(() => setSubmissionSuccess(false), 3000)
  };
  const handleViewExhibition = () => {
    navigate('/exhibition-details'); // Adjust 
  };

  return (
    <div className="exhibition-creation-container">
          {submissionSuccess ? (
            <div className='success-message'>
            <p>Exhibition created successfully!</p>
            {exhibitionSummary && (
            <div className='exhibition-summary'>
              <h2>{exhibitionSummary.title}</h2>
              <p>{exhibitionSummary.description}</p>
              <div className='artwork-thumbnails'>
                {exhibitionSummary.artworks.map(artwork => (
                  <img key={artwork.id} src={artwork.imageUrl} alt={artwork.title} />
                ))}
              </div>
              <button onClick={handleViewExhibition}>View Full Exhibition</button>
            </div>
          )}
            </div>
        ) : (
            <div>
      <h1>Create Your Exhibition</h1>

      {/* Description Text Area */}
      <div className="description-area">
        <label htmlFor="description">Exhibition Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Write your exhibition description here..."
        />
      </div>

      {/* Visibility Options */}
      <div className="visibility-options">
        <label>
          <input
            type="radio"
            value="public"
            checked={visibility === 'public'}
            onChange={(e) => setVisibility(e.target.value)}
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            value="private"
            checked={visibility === 'private'}
            onChange={(e) => setVisibility(e.target.value)}
          />
          Private
        </label>
      </div>

      {/* Artworks Section */}
      <div className="artworks-section">
        <h2>Available Artworks:</h2>
        {artworks.length > 0 ? (
          artworks.map(artwork => (
            <div key={artwork.id} className="artwork-item">
              <img src={artwork.imageUrl} alt={artwork.title} />
              <p>{artwork.title}</p>
              <button onClick={() => handleAddArtwork(artwork)}>Add to Exhibition</button>
            </div>
          ))
        ) : (
          <div>
          <p  className="inline">You have no saved artworks yet. Search and save your favourite artworks </p>
          <a href='search' className="inline-link">here.</a>
          </div>
        )}
      </div>

      {/* Exhibition Artworks Section */}
      <div className="exhibition-artworks-section">
        <h2>Your Exhibition Artworks:</h2>
        {exhibitionArtworks.length > 0 ? (
          exhibitionArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-item">
              <img src={artwork.imageUrl} alt={artwork.title} />
              <p>{artwork.title}</p>
              <button onClick={() => handleRemoveArtwork(artwork)}>Remove from Exhibition</button>
            </div>
          ))
        ) : (
          <p className='info'>No artworks added to the exhibition yet.</p>
        )}
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit} 
        disabled={exhibitionArtworks.length === 0} // Disable if no artworks
      >
        Create Exhibition
      </button>
      </div>
        )}
    </div>
  );
};

export default ExhibitionCreation;
