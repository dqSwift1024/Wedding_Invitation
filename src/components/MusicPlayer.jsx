import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaPause, FaPlay } from 'react-icons/fa'

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('自动播放被阻止，需要用户交互')
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/wedding-music.mp3"
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer

