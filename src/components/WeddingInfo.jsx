import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaPalette, FaLocationArrow } from 'react-icons/fa'

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
          {/* 婚礼时间（仪式+宴席） */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">婚礼时间</h3>
                <p className="text-gray-500">Wedding Schedule</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 ml-4 md:ml-16">
              <div className="flex items-start gap-3">
                <div className="bg-rose-gold-100 p-3 rounded-lg">
                  <FaCalendarAlt className="text-rose-gold-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">仪式时间</p>
                  <p className="text-gray-800 text-lg font-semibold">上午 08:08</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-rose-gold-100 p-3 rounded-lg">
                  <FaClock className="text-rose-gold-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">宴席时间</p>
                  <p className="text-gray-800 text-lg font-semibold">中午 12:00</p>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-4 md:ml-16 text-gray-600">
              <p className="text-sm">📅 2026年2月22日 星期日</p>
            </div>
          </motion.div>

          {/* 地址 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">婚礼地址</h3>
                <p className="text-gray-700 text-lg mb-1">北京市朝阳区某某酒店</p>
                <p className="text-gray-500">Wedding Venue</p>
              </div>
            </div>
            
            {/* 地图图片 */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://api.map.baidu.com/staticimage/v2?ak=YOUR_BAIDU_MAP_AK&center=116.397428,39.90923&width=600&height=300&zoom=16&markers=116.397428,39.90923&markerStyles=l,A"
                alt="婚礼地址地图"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x300/f9a8d4/ffffff?text=地图加载中...'
                }}
              />
            </div>
            
            {/* 导航按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openMap('gaode')}
              className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-4 rounded-xl font-medium hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              <FaLocationArrow className="text-xl" />
              打开导航
            </motion.button>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
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
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
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



