import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaHeart, FaMusic } from 'react-icons/fa'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showCopyright, setShowCopyright] = useState(true)

  return (
    <footer ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <FaHeart className="text-rose-gold-500 text-4xl" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-elegant">
            感谢您的到来
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            感谢您抽出宝贵的时间来参加我们的婚礼。<br />
            您的到来是我们最大的荣幸，期待与您共同见证这个美好的时刻。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-gray-500 mb-8"
        >
          <FaMusic className="text-rose-gold-400" />
          <span className="text-sm">背景音乐可随时开启/关闭</span>
        </motion.div>

        {showCopyright && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-t border-gray-200 pt-8"
          >
            <p className="text-gray-400 text-sm mb-2">
              Made with <FaHeart className="inline text-rose-gold-400" /> by Ming & Xin
            </p>
            <button
              onClick={() => setShowCopyright(false)}
              className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
            >
              关闭
            </button>
          </motion.div>
        )}
      </div>
    </footer>
  )
}

export default Footer



