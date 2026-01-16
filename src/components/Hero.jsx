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

      {/* 龙腾飞动画层 */}
      <AnimatePresence>
        {showDragonAnimation && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* 金色光芒爆发 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 50, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-300 via-rose-300 to-pink-300"
              style={{ filter: 'blur(20px)' }}
            />
            
            {/* 龙的飞舞轨迹（用多个光点模拟） */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: ['50vw', '30vw', '60vw', '40vw', '70vw', '90vw'],
                  y: ['50vh', '40vh', '30vh', '20vh', '15vh', '10vh'],
                  scale: [0, 1.5, 1.2, 1, 0.8, 0],
                  opacity: [0, 1, 1, 0.8, 0.5, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, rgba(236, 72, 153, 0.6) 50%, transparent 100%)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)',
                }}
              />
            ))}
            
            {/* 彩带效果 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`ribbon-${i}`}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scaleX: 0,
                  opacity: 0,
                }}
                animate={{
                  x: ['50vw', `${20 + i * 10}vw`],
                  y: ['50vh', `${10 + i * 5}vh`],
                  scaleX: [0, 2, 1.5, 0],
                  opacity: [0, 0.8, 0.6, 0],
                  rotate: [0, 90 * i, 180 * i],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
                className="absolute w-32 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(236, 72, 153, 0.8)'}, transparent)`,
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



