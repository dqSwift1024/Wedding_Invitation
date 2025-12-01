import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaCloudSun } from 'react-icons/fa'

const WeddingInfo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const openMap = (type) => {
    const address = encodeURIComponent('北京市朝阳区某某酒店')
    if (type === 'gaode') {
      window.open(`https://uri.amap.com/marker?position=116.397428,39.90923&name=${address}`)
    } else {
      window.open(`https://api.map.baidu.com/marker?location=39.90923,116.397428&title=${address}&content=${address}&output=html`)
    }
  }

  const weatherInfo = {
    date: '2025年10月20日',
    condition: '晴',
    temperature: '-2°C - 5°C',
    icon: '☀️',
    tips: [
      { icon: '🧥', text: '建议穿着厚外套或羽绒服，注意保暖' },
      { icon: '👔', text: '男士可选择西装外套搭配保暖内搭' },
      { icon: '👗', text: '女士建议穿着长袖连衣裙或套装，搭配外套' },
      { icon: '🧣', text: '建议佩戴围巾、手套等保暖配饰' },
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section id="wedding-info" ref={ref} className="py-20 px-4 bg-gradient-rose relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-rose-gold-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant"
          >
            Wedding Information
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-rose-gold-600 text-lg"
          >
            婚礼信息
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* 仪式时间 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {/* 卡片光效 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "linear"
              }}
            />
            <div className="flex items-start gap-4 relative z-10">
              <motion.div 
                className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FaCalendarAlt className="text-white text-2xl" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">仪式时间</h3>
                <p className="text-gray-700 text-lg mb-1">2025年10月20日 上午10:00</p>
                <p className="text-gray-500">Ceremony Time</p>
              </div>
            </div>
          </motion.div>

          {/* 宴席时间 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "linear"
              }}
            />
            <div className="flex items-start gap-4 relative z-10">
              <motion.div 
                className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FaClock className="text-white text-2xl" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">宴席时间</h3>
                <p className="text-gray-700 text-lg mb-1">2025年10月20日 中午12:00</p>
                <p className="text-gray-500">Reception Time</p>
              </div>
            </div>
          </motion.div>

          {/* 地址 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "linear"
              }}
            />
            <div className="flex items-start gap-4 mb-4 relative z-10">
              <motion.div 
                className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FaMapMarkerAlt className="text-white text-2xl" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">婚礼地址</h3>
                <p className="text-gray-700 text-lg mb-1">北京市朝阳区某某酒店</p>
                <p className="text-gray-500">Wedding Venue</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 relative z-10">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openMap('gaode')}
                className="flex-1 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-3 rounded-lg font-medium shadow-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">高德地图</span>
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openMap('baidu')}
                className="flex-1 bg-gradient-to-r from-rose-gold-500 to-rose-gold-700 text-white py-3 rounded-lg font-medium shadow-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">百度地图</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 天气提醒 */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "linear"
              }}
            />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <motion.div 
                className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FaCloudSun className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-rose-gold-600">天气提醒</h3>
                <p className="text-gray-500">Weather Reminder</p>
              </div>
            </div>
            
            {/* 天气信息卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-br from-rose-gold-50 to-cream-50 rounded-xl p-6 mb-6 relative z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="text-5xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {weatherInfo.icon}
                  </motion.div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{weatherInfo.date}</p>
                    <p className="text-2xl font-bold text-rose-gold-600">{weatherInfo.condition}</p>
                    <p className="text-gray-700 text-lg">{weatherInfo.temperature}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 穿衣建议 */}
            <div className="relative z-10">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">穿衣建议</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weatherInfo.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      delay: 0.7 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="flex items-center gap-3 bg-gradient-to-r from-cream-50 to-rose-gold-50 rounded-lg p-4 shadow-sm"
                  >
                    <span className="text-2xl">{tip.icon}</span>
                    <p className="text-gray-700 flex-1">{tip.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeddingInfo
