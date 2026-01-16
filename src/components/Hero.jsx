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

      {/* 开启动画层 - 冲击力效果 */}
      <AnimatePresence>
        {showDragonAnimation && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            {/* 强烈的冲击波 - 3层 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`shockwave-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 0.5, 3.5],
                  opacity: [0, 0.8, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  top: 'calc(50% + 180px)',
                  width: '120px',
                  height: '120px',
                  border: `${4 - i}px solid rgba(236, 72, 153, ${0.7 - i * 0.2})`,
                  boxShadow: `0 0 ${40 - i * 10}px rgba(236, 72, 153, ${0.6 - i * 0.15})`,
                }}
              />
            ))}

            {/* 爆炸式粒子 - 环形扩散 */}
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16
              const radius = 150
              const endX = Math.cos((angle * Math.PI) / 180) * radius
              const endY = Math.sin((angle * Math.PI) / 180) * radius
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: '50%',
                    y: 'calc(50% + 180px)',
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${endX}px)`,
                    y: `calc(50% + 180px + ${endY}px)`,
                    scale: [0, 1.5, 0.8, 0],
                    opacity: [0, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.15 + i * 0.02,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 2 === 0 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : 'linear-gradient(135deg, #ec4899, #f472b6)',
                    boxShadow: '0 0 12px rgba(236, 72, 153, 0.8)',
                  }}
                />
              )
            })}

            {/* 闪光十字 */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`cross-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
                className="absolute left-1/2 top-[calc(50%+180px)] -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: i === 0 ? '4px' : '100px',
                  height: i === 0 ? '100px' : '4px',
                  background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                }}
              />
            ))}

            {/* 心形和樱花混合上升 */}
            {[...Array(10)].map((_, i) => {
              const xOffset = (i - 5) * 35
              const isHeart = i % 2 === 0
              
              return (
                <motion.div
                  key={`emoji-${i}`}
                  initial={{
                    x: `calc(50% + ${xOffset}px)`,
                    y: 'calc(50% + 200px)',
                    scale: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${xOffset + (Math.random() - 0.5) * 50}px)`,
                    y: 'calc(50% - 120px)',
                    scale: [0, 1.3, 1, 0.7],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, (Math.random() - 0.5) * 360],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.3 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-2xl"
                >
                  {isHeart ? '💕' : '🌸'}
                </motion.div>
              )
            })}

            {/* 光环脉冲 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 0.8, 2.5],
                opacity: [0, 0.6, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                top: 'calc(50% + 105px)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(251, 207, 232, 0.3) 30%, rgba(236, 72, 153, 0.2) 60%, transparent 100%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 星光闪烁 */}
            {[...Array(20)].map((_, i) => {
              const angle = Math.random() * 360
              const distance = 80 + Math.random() * 80
              const x = Math.cos((angle * Math.PI) / 180) * distance
              const y = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{
                    x: '50%',
                    y: 'calc(50% + 180px)',
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `calc(50% + ${x}px)`,
                    y: `calc(50% + 180px + ${y}px)`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + Math.random() * 0.4,
                    ease: 'easeOut',
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{ boxShadow: '0 0 8px #ffffff' }}
                />
              )
            })}
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



