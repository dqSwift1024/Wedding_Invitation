import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useState, useRef } from 'react'

const Hero = ({ onEnter, guestName, guestGroup }) => {
  const [showDragonAnimation, setShowDragonAnimation] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const scrollToNext = () => {
    // 获取按钮的准确位置
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
    
    // 触发动画
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
          ref={buttonRef}
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

      {/* 开启动画层 - 精准对齐、视觉完美 */}
      <AnimatePresence>
        {showDragonAnimation && (
          <div className="fixed inset-0 z-30 pointer-events-none">
            {/* 第一层：瞬间闪光 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute"
              style={{
                left: buttonPosition.x,
                top: buttonPosition.y,
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 207, 232, 0.6) 30%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 第二层：优雅波纹扩散 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3 + i * 0.5],
                  opacity: [0, 0.7, 0.4, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute rounded-full"
                style={{
                  left: buttonPosition.x,
                  top: buttonPosition.y,
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  border: `${3 - i * 0.3}px solid rgba(236, 72, 153, ${0.8 - i * 0.1})`,
                  boxShadow: `0 0 ${30 - i * 5}px rgba(236, 72, 153, ${0.6 - i * 0.1})`,
                }}
              />
            ))}

            {/* 第三层：中心光环脉冲 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 2.5],
                opacity: [0, 0.9, 0]
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="absolute rounded-full"
              style={{
                left: buttonPosition.x,
                top: buttonPosition.y,
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(251, 207, 232, 0.9) 0%, rgba(236, 72, 153, 0.6) 30%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 第四层：环形樱花爆发 */}
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16
              const distance = 100 + Math.random() * 60
              const endX = Math.cos((angle * Math.PI) / 180) * distance
              const endY = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`petal-${i}`}
                  initial={{
                    x: buttonPosition.x,
                    y: buttonPosition.y,
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: buttonPosition.x + endX,
                    y: buttonPosition.y + endY,
                    opacity: [0, 1, 1, 0.7, 0],
                    rotate: [0, 360 + Math.random() * 360],
                    scale: [0, 1.2, 1, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.15 + i * 0.03,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-2xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.5))' 
                  }}
                >
                  🌸
                </motion.div>
              )
            })}

            {/* 第五层：爱心螺旋上升 */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8
              const spiralRadius = 40
              
              return (
                <motion.div
                  key={`heart-${i}`}
                  initial={{
                    x: buttonPosition.x,
                    y: buttonPosition.y,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: buttonPosition.x + Math.cos((angle * Math.PI) / 180) * spiralRadius,
                    y: buttonPosition.y - 150 + Math.sin((angle * Math.PI) / 180) * spiralRadius,
                    opacity: [0, 1, 1, 0.8, 0],
                    scale: [0, 1.3, 1.1, 0.9, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.25 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-3xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.6))'
                  }}
                >
                  ❤️
                </motion.div>
              )
            })}

            {/* 第六层：放射状金光 */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30)
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1, 1.5, 0],
                    opacity: [0, 0.9, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.05 + i * 0.03,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute"
                  style={{
                    left: buttonPosition.x,
                    top: buttonPosition.y,
                    width: '4px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0) 0%, rgba(251, 191, 36, 1) 50%, rgba(251, 191, 36, 0) 100%)',
                    transformOrigin: 'top center',
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
                  }}
                />
              )
            })}

            {/* 第七层：星光爆炸 */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24
              const distance = 80 + Math.random() * 80
              const x = Math.cos((angle * Math.PI) / 180) * distance
              const y = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`star-${i}`}
                  initial={{
                    x: buttonPosition.x,
                    y: buttonPosition.y,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: buttonPosition.x + x,
                    y: buttonPosition.y + y,
                    scale: [0, 1.5, 1, 0],
                    opacity: [0, 1, 0.9, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.02,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div 
                    className="w-2 h-2 bg-white rounded-full" 
                    style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.5)' }}
                  />
                </motion.div>
              )
            })}

            {/* 第八层：细腻粉色粒子云 */}
            {[...Array(30)].map((_, i) => {
              const randomAngle = Math.random() * 360
              const randomDistance = 60 + Math.random() * 100
              const endX = Math.cos((randomAngle * Math.PI) / 180) * randomDistance
              const endY = Math.sin((randomAngle * Math.PI) / 180) * randomDistance - 40
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: buttonPosition.x,
                    y: buttonPosition.y,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: buttonPosition.x + endX,
                    y: buttonPosition.y + endY,
                    opacity: [0, 0.9, 0.7, 0],
                    scale: [0, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    background: i % 4 === 0 ? '#fbbf24' : i % 4 === 1 ? '#ec4899' : i % 4 === 2 ? '#f472b6' : '#fbcfe8',
                    boxShadow: `0 0 6px ${i % 4 === 0 ? '#fbbf24' : '#ec4899'}`,
                  }}
                />
              )
            })}

            {/* 第九层：玫瑰花瓣旋转 */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60)
              
              return (
                <motion.div
                  key={`rose-${i}`}
                  initial={{
                    x: buttonPosition.x,
                    y: buttonPosition.y,
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: buttonPosition.x + Math.cos((angle * Math.PI) / 180) * 70,
                    y: buttonPosition.y + Math.sin((angle * Math.PI) / 180) * 70,
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 720],
                    scale: [0, 1.5, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-2xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 6px rgba(236, 72, 153, 0.5))'
                  }}
                >
                  🌹
                </motion.div>
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



