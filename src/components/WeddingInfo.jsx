import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaPalette } from 'react-icons/fa'

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

  const dressCodes = [
    { color: 'bg-rose-gold-200', name: '玫瑰金', hex: '#FBCFE8' },
    { color: 'bg-cream-200', name: '奶白色', hex: '#FEF3E7' },
    { color: 'bg-rose-gold-100', name: '淡粉色', hex: '#FCE7F3' },
    { color: 'bg-rose-gold-50', name: '浅金色', hex: '#FDF2F8' },
  ]

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

          {/* Dress Code */}
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
                <FaPalette className="text-white text-2xl" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-rose-gold-600">Dress Code</h3>
                <p className="text-gray-500">着装建议</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 relative z-10">
              为了营造浪漫温馨的氛围，建议来宾穿着以下色系的服装：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {dressCodes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={`${item.color} rounded-xl p-4 text-center shadow-md relative overflow-hidden group`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="w-full h-16 rounded-lg mb-2 relative z-10"
                    style={{ backgroundColor: item.hex }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <p className="text-gray-700 font-medium relative z-10">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeddingInfo
