// import React, { useState } from "react";
// import { signIn } from "../../firebase";
// import "../Auth.css";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignIn = async e => {
//     e.preventDefault();
//     console.log("Attempting to sign in with:", email, password);
//     try {
//       await signIn(email, password);
//       // Optionally, redirect or show success message
//       setError("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       {error &&
//         <p className="error-message">
//           {error}
//         </p>}
//       <h2>Sign In</h2>
//       <form className="auth-form" onSubmit={handleSignIn}>
//         <div className="auth-field">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="auth-field">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="auth-button">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from "react";
import { signIn } from "../../firebase";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Attempting to sign in with:", email, password);
    setLoading(true);
    try {
      await signIn(email, password);
      setError("");
      navigate("/exhibition"); // Redirect after successful sign-in
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      {error && <p className="error-message">{error}</p>}
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSignIn}>
        <div className="auth-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
