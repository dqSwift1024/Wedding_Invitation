import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect } from 'react'

// 全局页面过渡和滚动进度指示器
const PageTransition = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* 滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-gold-400 via-rose-gold-500 to-rose-gold-600 origin-left z-50"
        style={{ scaleX }}
      />
    </>
  )
}

export default PageTransition

