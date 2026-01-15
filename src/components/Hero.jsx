import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const Hero = ({ onEnter, guestName, guestGroup }) => {
  const scrollToNext = () => {
    const nextSection = document.querySelector('#about-us')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
      onEnter()
    }
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
            Ming
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-gold-400 to-transparent mx-auto mb-4"
            style={{ maxWidth: '200px' }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient font-elegant">
            & Xin
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl text-rose-gold-600 mb-4 font-light tracking-wider"
        >
          2025.10.20
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



