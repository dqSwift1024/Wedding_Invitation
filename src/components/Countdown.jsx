import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Countdown = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const targetDate = new Date('2026-02-22T08:08:00').getTime()
  const [timeLeft, setTimeLeft] = useState({
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
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const timeUnits = [
    { label: '天', value: timeLeft.days, en: 'Days' },
    { label: '时', value: timeLeft.hours, en: 'Hours' },
    { label: '分', value: timeLeft.minutes, en: 'Minutes' },
    { label: '秒', value: timeLeft.seconds, en: 'Seconds' },
  ]

  return (
    <section id="countdown" ref={ref} className="py-12 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-elegant">
            Countdown
          </h2>
          <p className="text-rose-gold-600 text-base">距离婚礼还有</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg hover:shadow-xl transition-all mb-2 border border-rose-100">
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-5xl font-bold bg-gradient-to-br from-rose-gold-500 to-rose-gold-700 bg-clip-text text-transparent"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>
              </div>
              <p className="text-gray-700 font-semibold text-sm md:text-base">{unit.label}</p>
              <p className="text-gray-400 text-xs hidden md:block">{unit.en}</p>
            </motion.div>
          ))}
        </div>
        
        {/* 装饰性文字 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-rose-gold-500 text-sm md:text-base italic font-light">
            期待与您共同见证这美好时刻
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Countdown



