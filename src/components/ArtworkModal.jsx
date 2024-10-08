// // ArtworkModal.jsx
// import React from 'react';
// import './ArtworkModal.css';

// const ArtworkModal = ({ artwork, onClose }) => {
//   if (!artwork) return null; 

//   return (
//     <div className='modal-overlay' onClick={onClose}>
//       <div className='modal-content' onClick={(e) => e.stopPropagation()}>
//         <button className='close-button' onClick={onClose}>X</button>
//         <h2>{artwork.title}</h2>
//         <img src={artwork.imageUrl} alt={artwork.title} />
//         <p><strong>Description:</strong> {artwork.description}</p>
//         <p><strong>Creator:</strong> {artwork.creator}</p>
//         <p><strong>Date:</strong> {artwork.date}</p>
//       </div>
//     </div>
//   );
// };

// export default ArtworkModal;
import React from 'react';
import './ArtworkModal.css'; // Add styles for modal

const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h1>{artwork.title}</h1>
        <img src={artwork.imageUrl} alt={artwork.title} />
        <p><strong>Creator:</strong> {artwork.creator}</p>
        <p><strong>Date:</strong> {artwork.date}</p>
        <p><strong>Work Type:</strong> {artwork.workType}</p>
        <a href={artwork.edmIsShownAt ? artwork.edmIsShownAt[0] : artwork.url} target="_blank" rel="noopener noreferrer">
          View on Original Site
        </a>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ArtworkModal;
