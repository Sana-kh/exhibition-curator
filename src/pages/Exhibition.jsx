// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Exhibition = () => {
//   const navigate = useNavigate();

//   // Mock authentication check -
//   const isAuthenticated = false;

//   useEffect(
//     () => {
//       if (!isAuthenticated) {
//         // If the user is not authenticated, redirect them to the SignInSignUp page
//         navigate("/signin-signup");
//       }
//     },
//     [isAuthenticated, navigate]
//   );

//   if (!isAuthenticated) {
//     return null; // While redirecting, don't render anything
//   }

//   return (
//     <div>
//       <section>
//         <h2>Your Curated Exhibition</h2>
//         <p>Display curated artworks here.</p>
//       </section>
//     </div>
//   );
// };

// export default Exhibition;
import React from "react";
import { useNavigate } from "react-router-dom";

const Exhibition = () => {
  const navigate = useNavigate();
  const isAuthenticated = true; // Assuming user is authenticated for now
  const curatedArtworks = []; 

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/signin-signup");
    return null;
  }

  return (
    <div>
      <section>
        <h2>Your Curated Exhibition</h2>

        {curatedArtworks.length === 0 ? (
          <div className="empty-exhibition">
            <p>No artworks have been curated yet.</p>
            <button onClick={() => navigate("/search")}>
              Start Curating Artworks
            </button>
          </div>
        ) : (
          <div className="artwork-grid">
            {curatedArtworks.map((artwork) => (
              <div key={artwork.id} className="artwork-item">
                <img src={artwork.imageUrl} alt={artwork.title} />
                <h3>{artwork.title}</h3>
                <p>{artwork.artist}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Exhibition;
