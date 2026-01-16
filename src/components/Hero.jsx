import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'

const Hero = ({ onEnter, guestName, guestGroup }) => {
  const [showDragonAnimation, setShowDragonAnimation] = useState(false)

  const scrollToNext = () => {
    // 触发龙腾飞动画
    setShowDragonAnimation(true)
    
    // 触发樱花飘落
    window.dispatchEvent(new CustomEvent('startCherryBlossoms'))
    
    // 触发弹幕显示
    window.dispatchEvent(new CustomEvent('showDanmaku'))
    
    setTimeout(() => {
      const nextSection = document.querySelector('#about-us')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
        onEnter()
      }
    }, 1500)
    
    setTimeout(() => {
      setShowDragonAnimation(false)
    }, 3000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-rose overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* 渐变遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-rose-100/30 to-rose-50/50"></div>
      </div>
      
      {/* 图案背景作为备用 */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center z-20 px-4"
      >
        {/* 个性化问候语 */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-8 py-4 border-2 border-rose-200">
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                {guestName}，您好！
              </p>
              {guestGroup && (
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  {guestGroup}
                </p>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mb-4 font-elegant">
            Huan
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-gold-400 to-transparent mx-auto mb-4"
            style={{ maxWidth: '200px' }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient font-elegant">
            & Xu
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl text-rose-gold-600 mb-4 font-light tracking-wider"
        >
          2026.02.22
        </motion.p>

        {/* 个性化邀请文案 */}
        {guestName ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-lg md:text-xl text-rose-700 mb-12 font-light"
          >
            诚挚邀请您参加我们的婚礼
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-lg md:text-xl text-rose-700 mb-12 font-light"
          >
            诚邀您见证我们的幸福时刻
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="px-8 py-4 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-lg"
        >
          开启邀请函
        </motion.button>
      </motion.div>

      {/* 开启动画层 - 优雅的波纹扩散和粒子爆发 */}
      <AnimatePresence>
        {showDragonAnimation && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {/* 多层波纹扩散 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 15, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + i * 0.3,
                  delay: i * 0.15,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
                style={{
                  borderColor: `rgba(236, 72, 153, ${0.6 - i * 0.1})`,
                  boxShadow: `0 0 40px rgba(236, 72, 153, ${0.5 - i * 0.08})`,
                }}
              />
            ))}

            {/* 中心光晕 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 1.5], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(251, 207, 232, 0.8) 0%, rgba(236, 72, 153, 0.4) 50%, transparent 100%)',
                filter: 'blur(30px)',
              }}
            />

            {/* 粒子爆发效果 */}
            {[...Array(30)].map((_, i) => {
              const angle = (i * 360) / 30
              const distance = 200 + Math.random() * 300
              const endX = Math.cos((angle * Math.PI) / 180) * distance
              const endY = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `calc(50vw + ${endX}px)`,
                    y: `calc(50vh + ${endY}px)`,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.5,
                    delay: Math.random() * 0.3,
                    ease: 'easeOut',
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 3 === 0 
                      ? 'radial-gradient(circle, #fbbf24 0%, #ec4899 100%)'
                      : i % 3 === 1
                      ? 'radial-gradient(circle, #ec4899 0%, #f472b6 100%)'
                      : 'radial-gradient(circle, #fbcfe8 0%, #f9a8d4 100%)',
                    boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
                  }}
                />
              )
            })}

            {/* 飘散的花瓣 */}
            {[...Array(12)].map((_, i) => {
              const startX = 30 + Math.random() * 40
              const endY = -20 - Math.random() * 30
              
              return (
                <motion.div
                  key={`petal-${i}`}
                  initial={{
                    x: `${startX}vw`,
                    y: '50vh',
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `${startX + (Math.random() - 0.5) * 30}vw`,
                    y: `${endY}vh`,
                    opacity: [0, 1, 1, 0],
                    rotate: 360 + Math.random() * 360,
                    scale: [0, 1.2, 1, 0.8],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    delay: 0.3 + Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute text-3xl"
                  style={{ opacity: 0.8 }}
                >
                  🌸
                </motion.div>
              )
            })}

            {/* 闪光效果 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.1,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '4px',
                  height: '40px',
                  background: 'linear-gradient(to bottom, transparent, #fbbf24, transparent)',
                  transform: `rotate(${i * 45}deg) translateY(-80px)`,
                  boxShadow: '0 0 10px #fbbf24',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToNext}
        >
          <FaChevronDown className="text-rose-gold-400 text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero



