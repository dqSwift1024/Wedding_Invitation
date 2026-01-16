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

      {/* 开启动画层 - 优雅局部效果 */}
      <AnimatePresence>
        {showDragonAnimation && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            {/* 按钮位置的光圈扩散 - 局部效果 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2"
                style={{
                  top: 'calc(50% + 180px)',
                  borderColor: `rgba(236, 72, 153, ${0.5 - i * 0.15})`,
                  boxShadow: `0 0 20px rgba(236, 72, 153, ${0.4 - i * 0.1})`,
                }}
              />
            ))}

            {/* 心形粒子上升 */}
            {[...Array(8)].map((_, i) => {
              const xOffset = (i - 4) * 40
              
              return (
                <motion.div
                  key={`heart-${i}`}
                  initial={{
                    x: `calc(50% + ${xOffset}px)`,
                    y: 'calc(50% + 200px)',
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${xOffset + (Math.random() - 0.5) * 60}px)`,
                    y: 'calc(50% - 150px)',
                    scale: [0, 1.2, 1, 0],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                  className="absolute text-2xl"
                >
                  ❤️
                </motion.div>
              )
            })}

            {/* 闪烁星星 - 围绕按钮 */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12
              const radius = 100 + Math.random() * 50
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius
              
              return (
                <motion.div
                  key={`star-${i}`}
                  initial={{
                    x: '50%',
                    y: 'calc(50% + 180px)',
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${x}px)`,
                    y: `calc(50% + 180px + ${y}px)`,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.05,
                    ease: 'easeOut',
                  }}
                  className="absolute"
                >
                  <div className="w-2 h-2 bg-yellow-300 rounded-full" style={{ boxShadow: '0 0 10px #fbbf24' }} />
                </motion.div>
              )
            })}

            {/* 樱花飘散 - 局部向上 */}
            {[...Array(6)].map((_, i) => {
              const xOffset = (i - 3) * 50
              
              return (
                <motion.div
                  key={`blossom-${i}`}
                  initial={{
                    x: `calc(50% + ${xOffset}px)`,
                    y: 'calc(50% + 180px)',
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${xOffset + (Math.random() - 0.5) * 100}px)`,
                    y: 'calc(50% - 100px)',
                    opacity: [0, 0.9, 0.8, 0],
                    rotate: 720,
                    scale: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.2 + i * 0.08,
                    ease: 'easeOut',
                  }}
                  className="absolute text-2xl"
                >
                  🌸
                </motion.div>
              )
            })}

            {/* 光芒闪烁 */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`glow-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 90],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: 'calc(50% + 180px)',
                  width: '3px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, transparent, rgba(251, 191, 36, 0.8), transparent)',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`,
                  boxShadow: '0 0 15px rgba(251, 191, 36, 0.6)',
                }}
              />
            ))}

            {/* 温柔光晕 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute left-1/2 -translate-x-1/2 w-48 h-48 rounded-full"
              style={{
                top: 'calc(50% + 105px)',
                background: 'radial-gradient(circle, rgba(251, 207, 232, 0.6) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)',
                filter: 'blur(25px)',
              }}
            />
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



