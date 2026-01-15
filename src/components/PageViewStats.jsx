import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { FaChartLine, FaClock, FaEye, FaRoute } from 'react-icons/fa'

/**
 * 页面浏览统计组件
 * 显示访客浏览了哪些页面，停留时长等
 */
const PageViewStats = () => {
  const [pageStats, setPageStats] = useState([])
  const [recentViews, setRecentViews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPageStats()
  }, [])

  const fetchPageStats = async () => {
    try {
      // 获取页面热度统计
      const { data: popularity } = await supabase
        .from('page_popularity')
        .select('*')
        .order('view_count', { ascending: false })

      setPageStats(popularity || [])

      // 获取最近的页面浏览
      const { data: recent } = await supabase
        .from('page_views')
        .select('guest_name, page_section, time_spent, view_time, device_type')
        .order('view_time', { ascending: false })
        .limit(20)

      setRecentViews(recent || [])
    } catch (error) {
      console.error('获取页面统计失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return '0秒'
    if (seconds < 60) return `${seconds}秒`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}分${secs}秒`
  }

  const getSectionName = (section) => {
    const names = {
      'Hero': '首页横幅',
      'AboutUs': '关于我们',
      'WeddingInfo': '婚礼信息',
      'Countdown': '倒计时',
      'RSVPForm': 'RSVP表单',
      'MessageWall': '留言墙',
      'Gallery': '照片画廊',
      'Footer': '页脚'
    }
    return names[section] || section
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 页面热度统计 */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaChartLine className="text-2xl text-rose-500" />
          <h2 className="text-2xl font-bold text-gray-800">页面热度统计</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageStats.map((stat, index) => (
            <div 
              key={stat.page_section}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getSectionName(stat.page_section)}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.page_section}</p>
                </div>
                <span className="text-2xl font-bold text-rose-500">
                  #{index + 1}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaEye className="text-blue-500" />
                    <p className="text-xs text-gray-600">浏览量</p>
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {stat.view_count}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-green-500" />
                    <p className="text-xs text-gray-600">平均停留</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {Math.round(stat.avg_time_spent || 0)}秒
                  </p>
                </div>
              </div>

              {stat.unique_visitors > 0 && (
                <div className="mt-3 pt-3 border-t border-rose-200">
                  <p className="text-sm text-gray-600">
                    独立访客: <span className="font-semibold text-rose-600">
                      {stat.unique_visitors}
                    </span>
                  </p>
                  {stat.avg_scroll_depth && (
                    <p className="text-sm text-gray-600">
                      平均滚动: <span className="font-semibold text-purple-600">
                        {Math.round(stat.avg_scroll_depth)}%
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {pageStats.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            暂无页面浏览数据
          </p>
        )}
      </div>

      {/* 最近浏览记录 */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaRoute className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">最近浏览记录</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">访客</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">浏览页面</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">停留时长</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">设备</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">浏览时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentViews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    暂无浏览记录
                  </td>
                </tr>
              ) : (
                recentViews.map((view, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {view.guest_name || '匿名访客'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                        {getSectionName(view.page_section)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {formatDuration(view.time_spent)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {view.device_type || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {new Date(view.view_time).toLocaleString('zh-CN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PageViewStats
