import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { FaCopy, FaCheck, FaDownload, FaEye, FaEyeSlash, FaUsers, FaChartPie, FaChartLine, FaRoute, FaGlobe } from 'react-icons/fa'
import PageViewStats from './PageViewStats'
import GuestJourney from './GuestJourney'
import GeoDistribution from './GeoDistribution'

/**
 * 宾客管理页面
 * 查看邀请链接、统计数据、导出数据
 */
const GuestManagement = () => {
  const [guests, setGuests] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [filter, setFilter] = useState('all') // all | opened | unopened
  const [activeTab, setActiveTab] = useState('guests') // guests | pageviews | journey | geo

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // 获取宾客列表
      const { data: guestsData } = await supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: false })
      
      setGuests(guestsData || [])

      // 计算统计数据
      const total = guestsData?.length || 0
      const opened = guestsData?.filter(g => g.has_opened).length || 0
      const totalVisits = guestsData?.reduce((sum, g) => sum + (g.visit_count || 0), 0) || 0

      // 按分组统计
      const groupStats = {}
      guestsData?.forEach(g => {
        const group = g.guest_group || '未分组'
        if (!groupStats[group]) {
          groupStats[group] = { total: 0, opened: 0 }
        }
        groupStats[group].total++
        if (g.has_opened) {
          groupStats[group].opened++
        }
      })

      setStats({
        total,
        opened,
        unopened: total - opened,
        openRate: total > 0 ? ((opened / total) * 100).toFixed(1) : 0,
        totalVisits,
        avgVisits: opened > 0 ? (totalVisits / opened).toFixed(1) : 0,
        groupStats
      })
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyLink = (link, guestId) => {
    navigator.clipboard.writeText(link)
    setCopiedId(guestId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportToCSV = () => {
    const headers = ['姓名', '电话', '分组', '关系', '邀请链接', '是否打开', '访问次数', '首次访问时间', '最后访问时间']
    const rows = guests.map(g => [
      g.guest_name,
      g.guest_phone || '',
      g.guest_group || '',
      g.guest_relation || '',
      g.invite_link,
      g.has_opened ? '是' : '否',
      g.visit_count || 0,
      g.first_visit_time ? new Date(g.first_visit_time).toLocaleString('zh-CN') : '',
      g.last_visit_time ? new Date(g.last_visit_time).toLocaleString('zh-CN') : ''
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `宾客邀请统计_${new Date().toLocaleDateString('zh-CN')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredGuests = guests.filter(g => {
    if (filter === 'opened') return g.has_opened
    if (filter === 'unopened') return !g.has_opened
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标签切换 */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('guests')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'guests'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaUsers />
              宾客管理
            </button>
            <button
              onClick={() => setActiveTab('pageviews')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'pageviews'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaChartLine />
              页面统计
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'journey'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaRoute />
              浏览路径
            </button>
            <button
              onClick={() => setActiveTab('geo')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'geo'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaGlobe />
              地理分布
            </button>
          </div>
        </div>

        {/* 宾客管理标签内容 */}
        {activeTab === 'guests' && (
          <>
        {/* 标题栏 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                宾客邀请管理
              </h1>
              <p className="text-gray-600">
                管理邀请链接，追踪访问情况
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <FaDownload />
              导出 Excel
            </button>
          </div>

          {/* 统计卡片 */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <FaUsers className="text-3xl text-blue-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">邀请总数</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <FaEye className="text-3xl text-green-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">已打开</p>
                <p className="text-3xl font-bold text-green-600">{stats.opened}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                <FaEyeSlash className="text-3xl text-orange-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">未打开</p>
                <p className="text-3xl font-bold text-orange-600">{stats.unopened}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <FaChartPie className="text-3xl text-purple-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">打开率</p>
                <p className="text-3xl font-bold text-purple-600">{stats.openRate}%</p>
              </div>
            </div>
          )}

          {/* 分组统计 */}
          {stats?.groupStats && Object.keys(stats.groupStats).length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">分组统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(stats.groupStats).map(([group, data]) => (
                  <div key={group} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">{group}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {data.opened} / {data.total}
                    </p>
                    <p className="text-xs text-gray-500">
                      {((data.opened / data.total) * 100).toFixed(0)}% 打开率
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部 ({guests.length})
            </button>
            <button
              onClick={() => setFilter('opened')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'opened'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              已打开 ({stats?.opened || 0})
            </button>
            <button
              onClick={() => setFilter('unopened')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unopened'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              未打开 ({stats?.unopened || 0})
            </button>
          </div>
        </div>

        {/* 宾客列表 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">姓名</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">分组</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">邀请链接</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">状态</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">访问次数</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">最后访问</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-rose-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{guest.guest_name}</p>
                          {guest.guest_phone && (
                            <p className="text-sm text-gray-500">{guest.guest_phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {guest.guest_group || '未分组'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={guest.invite_link}
                            readOnly
                            className="flex-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded border border-gray-200"
                          />
                          <button
                            onClick={() => copyLink(guest.invite_link, guest.guest_id)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="复制链接"
                          >
                            {copiedId === guest.guest_id ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaCopy />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {guest.has_opened ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            已打开
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            未打开
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-gray-900">
                          {guest.visit_count || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {guest.last_visit_time
                          ? new Date(guest.last_visit_time).toLocaleString('zh-CN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* 页面统计标签内容 */}
        {activeTab === 'pageviews' && (
          <PageViewStats />
        )}

        {/* 浏览路径标签内容 */}
        {activeTab === 'journey' && (
          <GuestJourney />
        )}

        {/* 地理分布标签内容 */}
        {activeTab === 'geo' && (
          <GeoDistribution />
        )}
      </div>
    </div>
  )
}

export default GuestManagement
