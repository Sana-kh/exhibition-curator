import React, {useState} from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import SignInSignUp from "./components/SignInSignUp";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { SearchProvider } from "./pages/SearchContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth, AuthProvider } from "./components/AuthContext";
import ExhibitionCreation from "./components/ExhibitionCreation";
import ExhibitionDetails from "./components/ExhibitionDetails";
import Account from "./components/Account";

const App = () => {
  const [showToast, setShowToast] = useState(false);
  const { user } = useAuth();
  return (
    <SearchProvider>
      <AuthProvider>
        <div className="wrapper">
      <Header />
      <div className="main-content">
      {showToast && (
          <div className="toast-notification">
            You have been logged out successfully!
          </div>
        )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/exhibition" element={<Exhibition />} /> */}
        <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
        <Route path="/signin-signup" element={<SignInSignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/exhibition"
          element={user ? <ExhibitionCreation /> : <SignInSignUp />}
        />
        <Route path="/exhibition-details" element={<ExhibitionDetails />} />
        {/* <Route path="/account" element={<Account />} /> */}
        <Route 
              path="/account" 
              element={user ? <Account /> : <Navigate to="/signin-signup" />} 
            />
      </Routes>
</div>
      <Footer />
      </div>
      </AuthProvider>
    </SearchProvider>
  );
};

export default App;
