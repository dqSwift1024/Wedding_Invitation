import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa'
import { mapLocation, getAmapStaticMapUrl } from '../config/mapLocation'

const WeddingInfo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showMapSelector, setShowMapSelector] = useState(false)

  const openMap = (type) => {
    const address = encodeURIComponent(mapLocation.address)
    // 使用配置文件中的坐标
    const lat = mapLocation.latitude
    const lng = mapLocation.longitude
    
    if (type === 'gaode') {
      window.open(`https://uri.amap.com/marker?position=${lng},${lat}&name=${address}&coordinate=gaode&callnative=1`)
    } else if (type === 'baidu') {
      // 百度地图需要 BD-09 坐标系，从 GCJ-02 转换
      window.open(`https://api.map.baidu.com/marker?location=${lat},${lng}&title=${address}&content=${address}&output=html&coord_type=gcj02`)
    } else if (type === 'tencent') {
      window.open(`https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:白果宾馆;addr:${address}&referer=wedding`)
    }
    setShowMapSelector(false)
  }

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
                <p className="text-gray-700 text-lg mb-1">{mapLocation.address}</p>
                <p className="text-gray-500">Wedding Venue</p>
              </div>
            </div>
            
            {/* 地图图片 - 高德地图静态图 */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <img 
                src={getAmapStaticMapUrl()}
                alt={`婚礼地址地图 - ${mapLocation.address}`}
                loading="eager"
                width={mapLocation.mapSize.width}
                height={mapLocation.mapSize.height}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  console.error('地图加载失败，使用备用地图');
                  // 备用方案：使用腾讯地图
                  const { longitude, latitude } = mapLocation
                  e.target.src = `https://apis.map.qq.com/ws/staticmap/v2/?center=${latitude},${longitude}&zoom=${mapLocation.zoom}&size=${mapLocation.mapSize.width}*${mapLocation.mapSize.height}&maptype=roadmap&markers=size:large|color:0xff0000|label:宾|${latitude},${longitude}&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
                }}
              />
            </div>
            
            {/* 导航按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMapSelector(true)}
              className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-4 rounded-xl font-medium hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              <FaLocationArrow className="text-xl" />
              打开导航
            </motion.button>
          </motion.div>
        </div>

        {/* 地图选择弹窗 */}
        {showMapSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowMapSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-center mb-6 text-rose-gold-600">
                选择导航应用
              </h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openMap('gaode')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  <FaMapMarkerAlt className="text-xl" />
                  高德地图
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openMap('baidu')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  <FaMapMarkerAlt className="text-xl" />
                  百度地图
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openMap('tencent')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  <FaMapMarkerAlt className="text-xl" />
                  腾讯地图
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMapSelector(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all"
                >
                  取消
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default WeddingInfo



