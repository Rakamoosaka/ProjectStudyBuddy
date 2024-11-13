import React from 'react'
import Header from '../components/Header'
import MainBanner from '../components/MainBanner'
import AfterBanner from '../components/AfterBanner'
import AboutSection from '../components/AboutSection'
import AfterAboutSection from '../components/AfterAboutSection'
import Footer from '../components/Footer'
const Homepage = () => {
  return (
    <div>
        <Header/>
        <MainBanner/>
        <AfterBanner/>
        <AboutSection />
        <AfterAboutSection/>
        <Footer/>
    </div>
  )
}

export default Homepage