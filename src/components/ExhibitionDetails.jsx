// import React, { useEffect, useState } from 'react';
// import './ExhibitionDetails.css';

// const ExhibitionDetails = () => {
//   const [exhibitionDetails, setExhibitionDetails] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const details = JSON.parse(sessionStorage.getItem('exhibitionDetails'));
//     setExhibitionDetails(details);
    
//     const timer = setTimeout(() => setIsVisible(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!exhibitionDetails) {
//     return <p>Loading exhibition details...</p>;
//   }

//   return (
//     <div className={`exhibition-details ${isVisible ? 'visible' : ''}`}>
//       <h1>{exhibitionDetails.description}</h1>
//       <p>Visibility: {exhibitionDetails.visibility}</p>
//       <h2>Artworks:</h2>
//       <div className="artworks-gallery">
//         {exhibitionDetails.artworks.map((artwork, index) => (
//           <div 
//             key={artwork.id} 
//             className="artwork-item"
//             style={{ opacity: 0, animation: `fadeIn 0.5s forwards ${index * 0.1}s` }} // Stagger the animation
//           >
//             <img className="artwork-image" src={artwork.imageUrl} alt={artwork.title} />
//             <p>{artwork.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExhibitionDetails;
import React, { useEffect, useState } from 'react';
import './ExhibitionDetails.css';
import ArtworkModal from './ArtworkModal'; 
const ExhibitionDetails = () => {
  const [exhibitionDetails, setExhibitionDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null); // For selected artwork
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  useEffect(() => {
    const details = JSON.parse(sessionStorage.getItem('exhibitionDetails'));
    setExhibitionDetails(details);
    
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!exhibitionDetails) {
    return <p>Loading exhibition details...</p>;
  }

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <div className={`exhibition-details ${isVisible ? 'visible' : ''}`}>
      <h1>{exhibitionDetails.description}</h1>
      <p>Visibility: {exhibitionDetails.visibility}</p>
      <h2>Artworks:</h2>
      <div className="artworks-gallery">
        {exhibitionDetails.artworks.map((artwork, index) => (
          <div 
            key={artwork.id} 
            className="artwork-item"
            style={{ opacity: 0, animation: `fadeIn 0.5s forwards ${index * 0.1}s` }} // Stagger the animation
            onClick={() => openModal(artwork)} // Open modal on artwork click
          >
            <img className="artwork-image" src={artwork.imageUrl} alt={artwork.title} />
            <p>{artwork.title}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ExhibitionDetails;
