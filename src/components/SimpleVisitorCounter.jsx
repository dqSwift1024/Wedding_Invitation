import { useState, useEffect } from 'react'
import { simpleVisitorCounter, getVisitorCount, getDeviceInfo } from '../utils/analytics'
import { FaUsers, FaMobileAlt, FaDesktop, FaTabletAlt } from 'react-icons/fa'

/**
 * 简易访客计数器组件
 * 使用 localStorage 存储，无需后端
 * 适合快速部署和小型网站
 */
const SimpleVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0)
  const [deviceInfo, setDeviceInfo] = useState(null)

  useEffect(() => {
    // 记录访客并获取计数
    const count = simpleVisitorCounter()
    setVisitorCount(count)
    
    // 获取设备信息
    const info = getDeviceInfo()
    setDeviceInfo(info)
  }, [])

  // 根据设备类型显示图标
  const getDeviceIcon = () => {
    if (!deviceInfo) return <FaDesktop />
    
    switch (deviceInfo.deviceType) {
      case '手机':
        return <FaMobileAlt className="text-blue-500" />
      case '平板':
        return <FaTabletAlt className="text-purple-500" />
      default:
        return <FaDesktop className="text-green-500" />
    }
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      {/* 访客总数 */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <FaUsers className="text-3xl text-rose-500" />
        <div className="text-center">
          <p className="text-sm text-gray-600">网站访问量</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            {visitorCount}
          </p>
        </div>
      </div>

      {/* 设备信息 */}
      {deviceInfo && (
        <div className="border-t border-rose-200 pt-4 mt-4">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              {getDeviceIcon()}
              {deviceInfo.deviceType}
            </span>
            <span className="text-rose-300">•</span>
            <span>{deviceInfo.browser}</span>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-3">
        感谢您的访问 💕
      </p>
    </div>
  )
}

export default SimpleVisitorCounter
