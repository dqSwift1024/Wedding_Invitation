import { useEffect, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'

/**
 * 页面浏览追踪 Hook
 * 追踪用户浏览了哪些页面区域，停留时长等
 */
export const usePageTracking = (guestId = null, guestName = null) => {
  const sessionIdRef = useRef(null)
  const pageStartTimeRef = useRef({})
  const [currentSection, setCurrentSection] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return
    }

    // 生成会话ID（页面加载时生成一次）
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
      initSession()
    }

    // 监听页面滚动，追踪可见区域
    const handleScroll = () => {
      trackVisibleSection()
    }

    // 监听页面离开
    const handleBeforeUnload = () => {
      endSession()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // 初始追踪
    trackVisibleSection()

    // 定期更新会话信息
    const sessionUpdateInterval = setInterval(() => {
      updateSessionDuration()
    }, 30000) // 每30秒更新一次

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(sessionUpdateInterval)
      endSession()
    }
  }, [guestId, guestName])

  // 初始化会话
  const initSession = async () => {
    try {
      await supabase.from('visitor_sessions').insert([{
        session_id: sessionIdRef.current,
        guest_id: guestId,
        guest_name: guestName,
        session_start: new Date().toISOString(),
        visitor_ip: await getVisitorIP(),
        device_type: getDeviceType(),
        browser: getBrowserName()
      }])
    } catch (error) {
      console.error('初始化会话失败:', error)
    }
  }

  // 追踪当前可见的页面区域
  const trackVisibleSection = () => {
    const sections = [
      { id: 'hero', name: 'Hero' },
      { id: 'about-us', name: 'AboutUs' },
      { id: 'wedding-info', name: 'WeddingInfo' },
      { id: 'countdown', name: 'Countdown' },
      { id: 'rsvp', name: 'RSVPForm' },
      { id: 'messages', name: 'MessageWall' },
      { id: 'gallery', name: 'Gallery' },
      { id: 'footer', name: 'Footer' }
    ]

    let visibleSection = null
    let maxVisibility = 0

    sections.forEach(section => {
      const element = document.getElementById(section.id) || 
                     document.querySelector(`[data-section="${section.name}"]`)
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // 计算元素可见部分
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        const visibility = visibleHeight / windowHeight

        if (visibility > maxVisibility && visibility > 0.3) {
          maxVisibility = visibility
          visibleSection = section.name
        }
      }
    })

    // 如果切换到新区域
    if (visibleSection && visibleSection !== currentSection) {
      // 记录上一个区域的停留时间
      if (currentSection && pageStartTimeRef.current[currentSection]) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[currentSection]) / 1000)
        recordPageView(currentSection, timeSpent)
      }

      // 开始记录新区域
      setCurrentSection(visibleSection)
      pageStartTimeRef.current[visibleSection] = Date.now()
    }
  }

  // 记录页面浏览
  const recordPageView = async (section, timeSpent) => {
    if (!isSupabaseConfigured() || !sessionIdRef.current) {
      return
    }

    try {
      const scrollDepth = getScrollDepth()
      
      await supabase.from('page_views').insert([{
        session_id: sessionIdRef.current,
        guest_id: guestId,
        guest_name: guestName,
        page_section: section,
        page_url: window.location.href,
        scroll_depth: scrollDepth,
        time_spent: timeSpent,
        view_time: new Date().toISOString(),
        visitor_ip: await getVisitorIP(),
        device_type: getDeviceType(),
        browser: getBrowserName()
      }])

      // 更新会话统计
      await updateSessionStats(section)

      console.log(`📄 记录页面浏览: ${section}, 停留 ${timeSpent}秒`)
    } catch (error) {
      console.error('记录页面浏览失败:', error)
    }
  }

  // 更新会话统计
  const updateSessionStats = async (newSection) => {
    try {
      // 获取当前会话的浏览记录
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('page_section, scroll_depth')
        .eq('session_id', sessionIdRef.current)

      const uniquePages = new Set(pageViews?.map(v => v.page_section) || [])
      uniquePages.add(newSection)

      const maxScrollDepth = Math.max(
        ...pageViews?.map(v => v.scroll_depth || 0) || [0],
        getScrollDepth()
      )

      await supabase
        .from('visitor_sessions')
        .update({
          pages_viewed: uniquePages.size,
          max_scroll_depth: maxScrollDepth
        })
        .eq('session_id', sessionIdRef.current)
    } catch (error) {
      console.error('更新会话统计失败:', error)
    }
  }

  // 更新会话时长
  const updateSessionDuration = async () => {
    if (!sessionIdRef.current) return

    try {
      const { data: session } = await supabase
        .from('visitor_sessions')
        .select('session_start')
        .eq('session_id', sessionIdRef.current)
        .single()

      if (session) {
        const duration = Math.floor(
          (Date.now() - new Date(session.session_start).getTime()) / 1000
        )

        await supabase
          .from('visitor_sessions')
          .update({ total_duration: duration })
          .eq('session_id', sessionIdRef.current)
      }
    } catch (error) {
      console.error('更新会话时长失败:', error)
    }
  }

  // 结束会话
  const endSession = async () => {
    if (!sessionIdRef.current) return

    // 记录最后一个区域
    if (currentSection && pageStartTimeRef.current[currentSection]) {
      const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[currentSection]) / 1000)
      await recordPageView(currentSection, timeSpent)
    }

    // 更新会话结束时间
    try {
      await supabase
        .from('visitor_sessions')
        .update({
          session_end: new Date().toISOString()
        })
        .eq('session_id', sessionIdRef.current)
    } catch (error) {
      console.error('结束会话失败:', error)
    }
  }

  return {
    currentSection,
    sessionId: sessionIdRef.current
  }
}

/**
 * 获取滚动深度（百分比）
 */
const getScrollDepth = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  const scrollDepth = Math.min(
    Math.round(((scrollTop + windowHeight) / documentHeight) * 100),
    100
  )
  
  return scrollDepth
}

/**
 * 获取访客 IP 地址
 */
const getVisitorIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    return '未知'
  }
}

/**
 * 判断设备类型
 */
const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return '平板'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry/.test(ua)) {
    return '手机'
  }
  return '电脑'
}

/**
 * 获取浏览器名称
 */
const getBrowserName = () => {
  const ua = navigator.userAgent
  if (ua.includes('MicroMessenger')) return '微信'
  if (ua.includes('QQ/')) return 'QQ'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
  return '其他'
}

/**
 * 获取页面浏览统计
 */
export const getPageViewStats = async (guestId = null) => {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    let query = supabase
      .from('page_views')
      .select('page_section, time_spent, scroll_depth, view_time')
      .order('view_time', { ascending: true })

    if (guestId) {
      query = query.eq('guest_id', guestId)
    }

    const { data } = await query

    // 统计每个页面的浏览数据
    const pageStats = {}
    data?.forEach(view => {
      if (!pageStats[view.page_section]) {
        pageStats[view.page_section] = {
          views: 0,
          totalTime: 0,
          avgTime: 0,
          avgScrollDepth: 0
        }
      }
      pageStats[view.page_section].views++
      pageStats[view.page_section].totalTime += view.time_spent || 0
    })

    // 计算平均值
    Object.keys(pageStats).forEach(section => {
      const stats = pageStats[section]
      stats.avgTime = Math.round(stats.totalTime / stats.views)
    })

    return {
      pageStats,
      totalViews: data?.length || 0,
      visitedPages: Object.keys(pageStats).length
    }
  } catch (error) {
    console.error('获取页面统计失败:', error)
    return null
  }
}

/**
 * 获取页面热度排行
 */
export const getPagePopularity = async () => {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data } = await supabase
      .from('page_popularity')
      .select('*')
      .order('view_count', { ascending: false })

    return data || []
  } catch (error) {
    console.error('获取页面热度失败:', error)
    return []
  }
}

/**
 * 获取访客浏览路径
 */
export const getVisitorJourney = async (guestId) => {
  if (!isSupabaseConfigured() || !guestId) {
    return []
  }

  try {
    const { data } = await supabase
      .rpc('get_visitor_journey', { visitor_guest_id: guestId })

    return data || []
  } catch (error) {
    console.error('获取浏览路径失败:', error)
    return []
  }
}
