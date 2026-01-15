import { useState } from 'react'
import { supabase } from '../config/supabase'
import { FaRoute, FaClock, FaArrowRight, FaSearch } from 'react-icons/fa'

/**
 * 访客浏览路径组件
 * 显示单个访客的完整浏览路径
 */
const GuestJourney = () => {
  const [guestId, setGuestId] = useState('')
  const [journey, setJourney] = useState([])
  const [guestInfo, setGuestInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const searchJourney = async () => {
    if (!guestId.trim()) {
      alert('请输入宾客ID')
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      // 获取宾客信息
      const { data: guest } = await supabase
        .from('guests')
        .select('*')
        .eq('guest_id', guestId.trim())
        .single()

      setGuestInfo(guest)

      // 获取浏览路径
      const { data: views } = await supabase
        .from('page_views')
        .select('*')
        .eq('guest_id', guestId.trim())
        .order('view_time', { ascending: true })

      setJourney(views || [])
    } catch (error) {
      console.error('查询失败:', error)
      setGuestInfo(null)
      setJourney([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchJourney()
    }
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

  const formatDuration = (seconds) => {
    if (!seconds) return '0秒'
    if (seconds < 60) return `${seconds}秒`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}分${secs}秒`
  }

  const getTotalTime = () => {
    return journey.reduce((sum, view) => sum + (view.time_spent || 0), 0)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaRoute className="text-2xl text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">访客浏览路径</h2>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入宾客ID查询浏览路径
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例如: zhang-san"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={searchJourney}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            <FaSearch />
            {loading ? '查询中...' : '查询'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          提示: 可以在宾客管理页面复制宾客ID
        </p>
      </div>

      {/* 宾客信息 */}
      {searched && guestInfo && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">姓名</p>
              <p className="text-lg font-bold text-gray-800">{guestInfo.guest_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">分组</p>
              <p className="text-lg font-semibold text-blue-600">{guestInfo.guest_group || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">访问次数</p>
              <p className="text-lg font-semibold text-green-600">{guestInfo.visit_count || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">总停留时长</p>
              <p className="text-lg font-semibold text-purple-600">
                {formatDuration(getTotalTime())}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 浏览路径 */}
      {searched && journey.length > 0 && (
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

          {/* 路径节点 */}
          <div className="space-y-6">
            {journey.map((view, index) => (
              <div key={index} className="relative pl-20">
                {/* 节点圆圈 */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-purple-500 shadow-md flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">
                    {index + 1}
                  </span>
                </div>

                {/* 内容卡片 */}
                <div className="bg-white border-2 border-purple-100 rounded-xl p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {getSectionName(view.page_section)}
                      </h3>
                      <p className="text-sm text-gray-500">{view.page_section}</p>
                    </div>
                    <div className="flex items-center gap-2 text-purple-600">
                      <FaClock />
                      <span className="text-sm font-medium">
                        {formatDuration(view.time_spent)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">浏览时间: </span>
                      <span className="font-medium text-gray-800">
                        {new Date(view.view_time).toLocaleString('zh-CN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </span>
                    </div>
                    {view.scroll_depth && (
                      <div>
                        <span className="text-gray-600">滚动深度: </span>
                        <span className="font-medium text-blue-600">
                          {view.scroll_depth}%
                        </span>
                      </div>
                    )}
                  </div>

                  {view.device_type && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        {view.device_type} · {view.browser}
                      </span>
                    </div>
                  )}
                </div>

                {/* 箭头 */}
                {index < journey.length - 1 && (
                  <div className="absolute left-7 -bottom-3 text-purple-400">
                    <FaArrowRight className="rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 总结 */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">浏览总结</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {journey.length}
                </p>
                <p className="text-sm text-gray-600">页面数</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">
                  {formatDuration(getTotalTime())}
                </p>
                <p className="text-sm text-gray-600">总时长</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(getTotalTime() / journey.length || 0)}秒
                </p>
                <p className="text-sm text-gray-600">平均停留</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 无结果提示 */}
      {searched && journey.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg text-gray-600 mb-2">
            {guestInfo ? '该访客暂无浏览记录' : '未找到该宾客'}
          </p>
          <p className="text-sm text-gray-500">
            请检查宾客ID是否正确
          </p>
        </div>
      )}

      {/* 初始提示 */}
      {!searched && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👆</div>
          <p className="text-lg text-gray-600">
            输入宾客ID查询浏览路径
          </p>
        </div>
      )}
    </div>
  )
}

export default GuestJourney
