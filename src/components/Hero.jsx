import { motion, useScroll, useTransform } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Hero = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about-us')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
      onEnter()
    }
  }

  // 文字逐字显示动画
  const name1 = "Ming"
  const name2 = "& Xin"
  const date = "2025.10.20"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-rose overflow-hidden">
      {/* 背景粒子效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-gold-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <motion.div
        style={{ y, opacity }}
        className="text-center z-20 px-4 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-8"
        >
          {/* 第一个名字 */}
          <div className="flex justify-center gap-2 md:gap-4 mb-4">
            {name1.split('').map((char, i) => (
              <motion.span
                key={`name1-${i}`}
                variants={letterVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient font-elegant inline-block"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* 装饰线 - 增强动画 */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: 1, 
              opacity: 1,
              transition: { 
                duration: 1.2,
                delay: name1.length * 0.1 + 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-gold-400 to-transparent mx-auto mb-4 relative"
            style={{ maxWidth: '200px' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-gold-300 via-rose-gold-500 to-rose-gold-300"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* 第二个名字 */}
          <div className="flex justify-center gap-2 md:gap-4">
            {name2.split('').map((char, i) => (
              <motion.span
                key={`name2-${i}`}
                variants={letterVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient font-elegant inline-block"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 日期 - 增强动画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: (name1.length + name2.length) * 0.1 + 0.8,
              type: "spring",
              stiffness: 200
            }
          }}
          className="mb-12"
        >
          <motion.p
            className="text-xl md:text-2xl text-rose-gold-600 font-light tracking-wider"
            animate={{
              textShadow: [
                '0 0 0px rgba(236, 72, 153, 0)',
                '0 0 20px rgba(236, 72, 153, 0.5)',
                '0 0 0px rgba(236, 72, 153, 0)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {date.split('').map((char, i) => (
              <motion.span
                key={`date-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: (name1.length + name2.length) * 0.1 + 0.8 + i * 0.05,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                className="inline-block"
              >
                {char === '.' ? <span className="mx-1">·</span> : char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* 按钮 - 增强交互 */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: (name1.length + name2.length) * 0.1 + 1.2,
              type: "spring",
              stiffness: 200
            }
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
            transition: { type: "spring", stiffness: 400 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="relative px-10 py-5 bg-gradient-to-r from-rose-gold-400 via-rose-gold-500 to-rose-gold-600 text-white rounded-full shadow-2xl font-medium text-lg overflow-hidden group"
        >
          {/* 按钮背景光效 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <span className="relative z-10">开启邀请函</span>
          
          {/* 点击涟漪效果 */}
          <motion.span
            className="absolute inset-0 rounded-full bg-white opacity-0"
            whileTap={{
              scale: [1, 2],
              opacity: [0.3, 0],
              transition: { duration: 0.6 }
            }}
          />
        </motion.button>
      </motion.div>

      {/* 滚动指示器 - 增强动画 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer group"
          onClick={scrollToNext}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaChevronDown className="text-rose-gold-400 text-3xl group-hover:text-rose-gold-600 transition-colors" />
          </motion.div>
          
          {/* 脉冲圆环 */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-rose-gold-400"
            animate={{
              scale: [1, 1.5],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
