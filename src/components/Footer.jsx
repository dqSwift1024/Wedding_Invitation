import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { FaHeart, FaMusic } from 'react-icons/fa'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showCopyright, setShowCopyright] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <footer ref={ref} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-gold-200 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6 relative"
          >
            {/* 多个心形粒子 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 120}deg)`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                  x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
                  y: [0, Math.sin(i * 120 * Math.PI / 180) * 30]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-rose-gold-400 text-xl" />
              </motion.div>
            ))}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <FaHeart className="text-rose-gold-500 text-4xl" />
            </motion.div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-elegant"
          >
            感谢您的到来
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            感谢您抽出宝贵的时间来参加我们的婚礼。<br />
            您的到来是我们最大的荣幸，期待与您共同见证这个美好的时刻。
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center gap-2 text-gray-500 mb-8"
        >
          <motion.div
            variants={itemVariants}
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaMusic className="text-rose-gold-400" />
          </motion.div>
          <motion.span 
            variants={itemVariants}
            className="text-sm"
          >
            背景音乐可随时开启/关闭
          </motion.span>
        </motion.div>

        <AnimatePresence>
          {showCopyright && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 pt-8"
            >
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-sm mb-2"
              >
                Made with{' '}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  <FaHeart className="inline text-rose-gold-400" />
                </motion.span>
                {' '}by Ming & Xin
              </motion.p>
              <motion.button
                variants={itemVariants}
                onClick={() => setShowCopyright(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
              >
                关闭
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}

export default Footer
