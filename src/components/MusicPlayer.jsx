import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPause, FaPlay, FaVolumeMute } from 'react-icons/fa'

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // 检查音频是否加载成功
    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    const handleError = (e) => {
      setIsLoading(false)
      setError('音乐文件加载失败，请检查文件是否存在')
      console.error('音频加载错误:', e)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setError(null)
          })
          .catch(err => {
            console.error('播放失败:', err)
            setError('播放失败，请点击按钮重试')
            setIsPlaying(false)
          })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (error) {
      // 如果出错，尝试重新加载
      const audio = audioRef.current
      if (audio) {
        audio.load()
        setError(null)
        setIsLoading(true)
      }
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/wedding-music.mp3"
        crossOrigin="anonymous"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            disabled={isLoading}
            className={`w-14 h-14 rounded-full bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={error ? '音乐加载失败' : isPlaying ? '暂停音乐' : '播放音乐'}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : error ? (
              <FaVolumeMute size={20} />
            ) : isPlaying ? (
              <FaPause size={20} />
            ) : (
              <FaPlay size={20} />
            )}
          </motion.button>
          {error && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
              {error}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default MusicPlayer

