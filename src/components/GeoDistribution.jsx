import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { FaMapMarkerAlt, FaGlobe, FaCity } from 'react-icons/fa'

/**
 * 地理分布统计组件
 * 显示访客来自哪些地区
 */
const GeoDistribution = () => {
  const [geoData, setGeoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('table') // table | map

  useEffect(() => {
    fetchGeoData()
  }, [])

  const fetchGeoData = async () => {
    try {
      // 从 guest_visits 表获取地理分布
      const { data } = await supabase
        .from('guest_visits')
        .select('visitor_country, visitor_region, visitor_city, visitor_address, guest_name')
        .order('visit_time', { ascending: false })

      // 按地区分组统计
      const geoMap = {}
      data?.forEach(visit => {
        const key = visit.visitor_address || '未知地区'
        if (!geoMap[key]) {
          geoMap[key] = {
            address: visit.visitor_address || '未知地区',
            country: visit.visitor_country,
            region: visit.visitor_region,
            city: visit.visitor_city,
            count: 0,
            guests: new Set()
          }
        }
        geoMap[key].count++
        if (visit.guest_name) {
          geoMap[key].guests.add(visit.guest_name)
        }
      })

      // 转换为数组并排序
      const geoArray = Object.values(geoMap).map(item => ({
        ...item,
        uniqueGuests: item.guests.size
      })).sort((a, b) => b.count - a.count)

      setGeoData(geoArray)
    } catch (error) {
      console.error('获取地理分布失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCountryIcon = (country) => {
    // 根据国家返回合适的图标颜色
    const colors = {
      '中国': 'text-red-500',
      '美国': 'text-blue-500',
      '日本': 'text-pink-500',
      '韩国': 'text-purple-500',
      '英国': 'text-indigo-500'
    }
    return colors[country] || 'text-gray-500'
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
        <p className="text-gray-600">加载地理分布数据...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaGlobe className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">访客地理分布</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            列表视图
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'stats'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            统计视图
          </button>
        </div>
      </div>

      {geoData.length === 0 ? (
        <div className="text-center py-12">
          <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-500">暂无地理分布数据</p>
          <p className="text-sm text-gray-400 mt-2">
            访客访问后会自动记录地理位置
          </p>
        </div>
      ) : (
        <>
          {/* 列表视图 */}
          {viewMode === 'table' && (
            <div className="space-y-3">
              {geoData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${getCountryIcon(item.country)}`}>
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.address}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaGlobe className="text-blue-500" />
                          {item.country || '未知'}
                        </span>
                        {item.city && (
                          <span className="flex items-center gap-1">
                            <FaCity className="text-purple-500" />
                            {item.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {item.count}
                    </p>
                    <p className="text-sm text-gray-500">次访问</p>
                    {item.uniqueGuests > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {item.uniqueGuests} 位宾客
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 统计视图 */}
          {viewMode === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {geoData.slice(0, 9).map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-all"
                >
                  <div className={`text-4xl mx-auto mb-3 ${getCountryIcon(item.country)}`}>
                    <FaMapMarkerAlt />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.city || item.region || item.country || '未知'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.address}
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {item.count}
                    </p>
                    <p className="text-xs text-gray-500">次访问</p>
                  </div>
                  {item.uniqueGuests > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-purple-600">
                          {item.uniqueGuests}
                        </span> 位宾客
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 总结 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {geoData.length}
                </p>
                <p className="text-sm text-gray-600">不同地区</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {geoData.reduce((sum, item) => sum + item.count, 0)}
                </p>
                <p className="text-sm text-gray-600">总访问量</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">
                  {geoData.reduce((sum, item) => sum + item.uniqueGuests, 0)}
                </p>
                <p className="text-sm text-gray-600">识别宾客</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GeoDistribution
