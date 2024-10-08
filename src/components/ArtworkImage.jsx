import React, { useState } from "react";
import "./ArtworkImage.css"; // Import the CSS for styling

const ArtworkImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      className={`image-container ${isZoomed ? "zoomed" : ""}`}
      onClick={handleClick}
    >
      <img src={src} alt={alt} className="image" />
    </div>
  );
};

export default ArtworkImage;
