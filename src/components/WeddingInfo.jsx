import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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

  return (
    <section id="wedding-info" ref={ref} className="py-20 px-4 bg-gradient-rose">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            Wedding Information
          </h2>
          <p className="text-rose-gold-600 text-lg">婚礼信息</p>
        </motion.div>

        <div className="space-y-8">
          {/* 仪式时间 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">仪式时间</h3>
                <p className="text-gray-700 text-lg mb-1">2025年10月20日 上午10:00</p>
                <p className="text-gray-500">Ceremony Time</p>
              </div>
            </div>
          </motion.div>

          {/* 宴席时间 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaClock className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">宴席时间</h3>
                <p className="text-gray-700 text-lg mb-1">2025年10月20日 中午12:00</p>
                <p className="text-gray-500">Reception Time</p>
              </div>
            </div>
          </motion.div>

          {/* 地址 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">婚礼地址</h3>
                <p className="text-gray-700 text-lg mb-1">北京市朝阳区某某酒店</p>
                <p className="text-gray-500">Wedding Venue</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openMap('gaode')}
                className="flex-1 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                高德地图
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openMap('baidu')}
                className="flex-1 bg-gradient-to-r from-rose-gold-500 to-rose-gold-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                百度地图
              </motion.button>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaPalette className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rose-gold-600">Dress Code</h3>
                <p className="text-gray-500">着装建议</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              为了营造浪漫温馨的氛围，建议来宾穿着以下色系的服装：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dressCodes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${item.color} rounded-xl p-4 text-center shadow-md`}
                >
                  <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: item.hex }}></div>
                  <p className="text-gray-700 font-medium">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WeddingInfo



