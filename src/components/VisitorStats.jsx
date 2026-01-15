import { useState, useEffect } from 'react'
import { getVisitorStats } from '../hooks/useVisitorTracking'
import { FaUsers, FaCalendarDay, FaMobileAlt, FaLaptop, FaTabletAlt } from 'react-icons/fa'

/**
 * 访客统计组件
 * 显示网站访问量和设备分布
 */
const VisitorStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getVisitorStats()
      setStats(data)
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-rose-300 animate-pulse">加载统计数据中...</p>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  // 统计设备类型分布
  const deviceCount = stats.deviceStats.reduce((acc, curr) => {
    acc[curr.device_type] = (acc[curr.device_type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-rose-600 mb-6 text-center">
        ❤️ 访客统计
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 总访问量 */}
        <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl text-rose-500" />
            <div>
              <p className="text-gray-600 text-sm">总访问量</p>
              <p className="text-3xl font-bold text-rose-600">
                {stats.totalCount}
              </p>
            </div>
          </div>
        </div>

        {/* 今日访问量 */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaCalendarDay className="text-4xl text-purple-500" />
            <div>
              <p className="text-gray-600 text-sm">今日访问</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.todayCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 设备分布 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">设备分布</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <FaMobileAlt className="text-3xl text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">手机</p>
            <p className="text-xl font-bold text-blue-600">
              {deviceCount['手机'] || 0}
            </p>
          </div>
          <div className="text-center">
            <FaLaptop className="text-3xl text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">电脑</p>
            <p className="text-xl font-bold text-green-600">
              {deviceCount['电脑'] || 0}
            </p>
          </div>
          <div className="text-center">
            <FaTabletAlt className="text-3xl text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">平板</p>
            <p className="text-xl font-bold text-purple-600">
              {deviceCount['平板'] || 0}
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        感谢每一位来访者的祝福 💕
      </p>
    </div>
  )
}

export default VisitorStats
