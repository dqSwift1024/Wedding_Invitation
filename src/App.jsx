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
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useGuestTracking } from './hooks/useGuestTracking'
import { usePageTracking } from './hooks/usePageTracking'

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  
  // 自动记录基础访客信息
  useVisitorTracking()
  
  // 识别专属邀请链接的宾客
  const { guest, loading } = useGuestTracking()
  
  // 追踪页面浏览（传入宾客信息）
  const { currentSection } = usePageTracking(guest?.guest_id, guest?.guest_name)

  // 加载中状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-rose-500 mb-4"></div>
          <p className="text-lg text-gray-600 animate-pulse">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FloatingPetals />
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      
      {/* 传递宾客信息到 Hero 组件 */}
      <div id="hero" data-section="Hero">
        <Hero 
          onEnter={() => setIsMusicPlaying(true)} 
          guestName={guest?.guest_name}
          guestGroup={guest?.guest_group}
        />
      </div>
      
      <div id="about-us" data-section="AboutUs">
        <AboutUs />
      </div>
      
      <div id="wedding-info" data-section="WeddingInfo">
        <WeddingInfo />
      </div>
      
      <div id="countdown" data-section="Countdown">
        <Countdown />
      </div>
      
      <div id="rsvp" data-section="RSVPForm">
        <RSVPForm guestInfo={guest} />
      </div>
      
      <div id="messages" data-section="MessageWall">
        <MessageWall guestInfo={guest} />
      </div>
      
      <div id="gallery" data-section="Gallery">
        <Gallery />
      </div>
      
      <div id="footer" data-section="Footer">
        <Footer />
      </div>
      
      {/* 显示访客信息角标 */}
      {guest && (
        <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 z-50 border-2 border-rose-200">
          <p className="text-sm text-gray-600">
            欢迎您，<span className="font-bold text-rose-600">{guest.guest_name}</span>
          </p>
          {guest.guest_group && (
            <p className="text-xs text-gray-400">{guest.guest_group}</p>
          )}
          {/* 显示当前浏览区域（调试用，可选） */}
          {currentSection && (
            <p className="text-xs text-gray-300 mt-1">
              正在浏览: {currentSection}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App

