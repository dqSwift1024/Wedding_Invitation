import { useState } from 'react'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import WeddingInfo from './components/WeddingInfo'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import MessageWall from './components/MessageWall'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import FloatingPetals from './components/FloatingPetals'

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  return (
    <div className="relative min-h-screen">
      <FloatingPetals />
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      
      <Hero onEnter={() => setIsMusicPlaying(true)} />
      <AboutUs />
      <WeddingInfo />
      <Countdown />
      <RSVPForm />
      <MessageWall />
      <Gallery />
      <Footer />
    </div>
  )
}

export default App

