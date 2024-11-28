import React from "react";
import Header from "../components/Header";
import MainBanner from "../components/MainBanner";
import AfterBanner from "../components/AfterBanner";
import AboutSection from "../components/AboutSection";
import AfterAboutSection from "../components/AfterAboutSection";
import Footer from "../components/Footer";
import { useUser } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Homepage = () => {
  const { isLoggedIn, username } = useUser(); // Access context
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile if logged in
    if (isLoggedIn && username) {
      navigate(`/profile/${username}`);
    }
  }, [isLoggedIn, username, navigate]);

  return (
    <div>
      <Header />
      <MainBanner />
      <AfterBanner />
      <AboutSection />
      <AfterAboutSection />
      <Footer />
    </div>
  );
};

export default Homepage;
