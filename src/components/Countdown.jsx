import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Countdown = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const targetDate = new Date('2025-10-20T10:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
        
        setPrevTimeLeft(timeLeft)
        setTimeLeft(newTimeLeft)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate, timeLeft])

  const timeUnits = [
    { label: '天', value: timeLeft.days, prevValue: prevTimeLeft.days, en: 'Days' },
    { label: '时', value: timeLeft.hours, prevValue: prevTimeLeft.hours, en: 'Hours' },
    { label: '分', value: timeLeft.minutes, prevValue: prevTimeLeft.minutes, en: 'Minutes' },
    { label: '秒', value: timeLeft.seconds, prevValue: prevTimeLeft.seconds, en: 'Seconds' },
  ]

  // 数字翻转动画变体
  const flipVariants = {
    initial: { rotateX: 0 },
    animate: { rotateX: -180 },
    exit: { rotateX: 180 }
  }

  return (
    <section id="countdown" ref={ref} className="py-20 px-4 bg-gradient-rose relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 bg-rose-gold-300 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-40 h-40 bg-rose-gold-400 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant"
            animate={{
              textShadow: [
                '0 0 0px rgba(236, 72, 153, 0)',
                '0 0 30px rgba(236, 72, 153, 0.3)',
                '0 0 0px rgba(236, 72, 153, 0)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Countdown
          </motion.h2>
          <p className="text-rose-gold-600 text-lg">距离婚礼还有</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {timeUnits.map((unit, index) => {
            const displayValue = String(unit.value).padStart(2, '0')
            const prevDisplayValue = String(unit.prevValue).padStart(2, '0')
            const isChanging = displayValue !== prevDisplayValue

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="text-center"
              >
                <div className="relative bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 rounded-2xl p-6 md:p-8 shadow-2xl mb-4 overflow-hidden group">
                  {/* 背景光效 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* 数字容器 - 3D 翻转效果 */}
                  <div 
                    className="relative text-4xl md:text-6xl font-bold text-white h-16 md:h-20 flex items-center justify-center"
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isChanging ? (
                        <motion.div
                          key={`${unit.label}-${displayValue}`}
                          initial={{ rotateX: 90, opacity: 0 }}
                          animate={{ rotateX: 0, opacity: 1 }}
                          exit={{ rotateX: -90, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          {displayValue}
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`${unit.label}-static-${displayValue}`}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ 
                            duration: 0.3,
                            times: [0, 0.5, 1]
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          {displayValue}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 装饰粒子效果（当数字变化时） */}
                  {isChanging && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                            scale: [1, 0],
                            opacity: [1, 0]
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
                
                <motion.p 
                  className="text-gray-700 font-semibold text-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  {unit.label}
                </motion.p>
                <p className="text-gray-500 text-sm">{unit.en}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Countdown
