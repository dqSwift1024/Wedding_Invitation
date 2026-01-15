import { useEffect, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'
import { getVisitorInfo, formatAddress } from '../utils/ipGeoLocation'

/**
 * 页面浏览追踪 Hook
 * 追踪用户浏览了哪些页面区域，停留时长等
 */
export const usePageTracking = (guestId = null, guestName = null) => {
  const sessionIdRef = useRef(null)
  const pageStartTimeRef = useRef({})
  const currentSectionRef = useRef(null) // 改用 ref，避免闭包问题
  const pausedTimeRef = useRef({}) // 存储每个区域暂停时的累积时间
  const intervalsRef = useRef({}) // 存储定时器引用，以便暂停/恢复
  const isPausedRef = useRef(false) // 跟踪是否已暂停，避免重复触发

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

    // 监听页面可见性变化（切换标签页、息屏等）
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面隐藏：暂停计时
        handlePageHidden()
      } else {
        // 页面显示：恢复计时
        handlePageVisible()
      }
    }

    // 监听页面隐藏（移动端兼容：切换APP、锁屏）
    const handlePageHide = (e) => {
      console.log('📱 pagehide 事件触发')
      handlePageHidden()
    }

    // 监听页面显示（移动端兼容：回到APP、解锁）
    const handlePageShow = (e) => {
      // persisted 表示页面是从缓存中恢复的
      if (e.persisted || !document.hidden) {
        console.log('📱 pageshow 事件触发')
        handlePageVisible()
      }
    }

    // 监听窗口失去焦点（额外保险，移动端备用）
    const handleBlur = () => {
      // 延迟检查，避免误触发（如弹出软键盘）
      setTimeout(() => {
        if (document.hidden) {
          console.log('📱 blur + hidden 事件触发')
          handlePageHidden()
        }
      }, 100)
    }

    // 监听窗口获得焦点（额外保险，移动端备用）
    const handleFocus = () => {
      if (!document.hidden) {
        console.log('📱 focus 事件触发')
        handlePageVisible()
      }
    }

    // 添加所有事件监听器
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // 移动端专用事件
    window.addEventListener('pagehide', handlePageHide, { capture: true })
    window.addEventListener('pageshow', handlePageShow, { capture: true })
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    // 检查初始状态：如果页面已经隐藏，不启动定时器
    if (document.hidden) {
      console.log('⚠️ 页面初始状态为隐藏，不启动追踪')
      isPausedRef.current = true
    } else {
      // 启动所有定时器
      startAllIntervals()
      isPausedRef.current = false
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide, { capture: true })
      window.removeEventListener('pageshow', handlePageShow, { capture: true })
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      stopAllIntervals()
      endSession()
    }
  }, [guestId, guestName])

  // 初始化会话
  const initSession = async () => {
    try {
      // 获取访客IP和地理位置信息
      const visitorInfo = await getVisitorInfo()
      const address = formatAddress(visitorInfo)

      await supabase.from('visitor_sessions').insert([{
        session_id: sessionIdRef.current,
        guest_id: guestId,
        guest_name: guestName,
        session_start: new Date().toISOString(),
        visitor_ip: visitorInfo.ip,
        device_type: getDeviceType(),
        browser: getBrowserName(),
        // 地理位置信息
        visitor_country: visitorInfo.country,
        visitor_region: visitorInfo.region,
        visitor_city: visitorInfo.city,
        visitor_address: address,
        visitor_latitude: visitorInfo.latitude,
        visitor_longitude: visitorInfo.longitude,
        visitor_timezone: visitorInfo.timezone,
        visitor_isp: visitorInfo.isp,
        // 定位方式
        location_method: visitorInfo.location_method || 'ip',
        location_accuracy: visitorInfo.accuracy || null
      }])

      // 显示定位信息
      if (visitorInfo.location_method === 'gps') {
        console.log(`📍 GPS定位: ${address} (精度: ${Math.round(visitorInfo.accuracy)}米)`)
      } else {
        console.log(`📍 IP定位: ${address}`)
      }
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
    let foundElements = 0

    sections.forEach(section => {
      const element = document.getElementById(section.id) || 
                     document.querySelector(`[data-section="${section.name}"]`)
      
      if (element) {
        foundElements++
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

    // 调试：如果没有找到任何元素，输出警告
    if (foundElements === 0 && sessionIdRef.current) {
      console.warn('⚠️ 未找到任何页面区域元素！请检查元素的 id 或 data-section 属性')
      console.log('尝试查找的区域:', sections.map(s => `#${s.id} 或 [data-section="${s.name}"]`).join(', '))
    }

    // 如果切换到新区域
    if (visibleSection && visibleSection !== currentSectionRef.current) {
      // 记录上一个区域的停留时间
      if (currentSectionRef.current && pageStartTimeRef.current[currentSectionRef.current]) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[currentSectionRef.current]) / 1000)
        console.log(`🔄 区域切换: ${currentSectionRef.current} → ${visibleSection} (停留了${timeSpent}秒)`)
        recordPageView(currentSectionRef.current, timeSpent)
      } else {
        console.log(`👁️ 首次进入区域: ${visibleSection}`)
      }

      // 开始记录新区域
      currentSectionRef.current = visibleSection
      pageStartTimeRef.current[visibleSection] = Date.now()
    }
  }

  // 记录页面浏览
  const recordPageView = async (section, timeSpent) => {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase 未配置，跳过记录')
      return
    }

    if (!sessionIdRef.current) {
      console.warn('⚠️ 会话ID不存在，跳过记录')
      return
    }

    try {
      const scrollDepth = getScrollDepth()
      
      console.log(`📝 准备记录: ${section}, 停留${timeSpent}秒, 滚动${scrollDepth}%`)

      // 从会话获取访客信息（避免重复获取IP）
      const { data: sessionData, error: sessionError } = await supabase
        .from('visitor_sessions')
        .select('visitor_ip, visitor_country, visitor_region, visitor_city, visitor_address, device_type, browser')
        .eq('session_id', sessionIdRef.current)
        .single()

      if (sessionError) {
        console.error('查询会话数据失败:', sessionError)
        // 继续使用默认值
      }

      // 插入页面浏览记录
      const { error: insertError, data: insertData } = await supabase.from('page_views').insert([{
        session_id: sessionIdRef.current,
        guest_id: guestId,
        guest_name: guestName,
        page_section: section,
        page_url: window.location.href,
        scroll_depth: scrollDepth,
        time_spent: timeSpent,
        view_time: new Date().toISOString(),
        visitor_ip: sessionData?.visitor_ip || '未知',
        device_type: sessionData?.device_type || getDeviceType(),
        browser: sessionData?.browser || getBrowserName(),
        // 地理位置信息
        visitor_country: sessionData?.visitor_country,
        visitor_region: sessionData?.visitor_region,
        visitor_city: sessionData?.visitor_city,
        visitor_address: sessionData?.visitor_address
      }])

      if (insertError) {
        console.error('❌ 插入页面浏览记录失败:', insertError)
        return
      }

      console.log(`✅ 记录成功: ${section}, 停留 ${timeSpent}秒, 滚动 ${scrollDepth}%`)

      // 等待一小段时间确保数据库写入完成
      await new Promise(resolve => setTimeout(resolve, 100))

      // 更新会话统计（在插入之后）
      await updateSessionStats(section, scrollDepth)

    } catch (error) {
      console.error('❌ 记录页面浏览失败:', error)
    }
  }

  // 更新会话统计
  const updateSessionStats = async (newSection, newScrollDepth) => {
    try {
      // 获取当前会话的所有浏览记录
      const { data: pageViews, error: queryError } = await supabase
        .from('page_views')
        .select('page_section, scroll_depth')
        .eq('session_id', sessionIdRef.current)

      if (queryError) {
        console.error('查询页面浏览记录失败:', queryError)
        return
      }

      // 计算唯一页面数
      const uniquePages = new Set(pageViews?.map(v => v.page_section) || [])
      const pagesViewedCount = uniquePages.size

      // 计算最大滚动深度
      const allScrollDepths = pageViews?.map(v => v.scroll_depth || 0) || []
      const maxScrollDepth = Math.max(...allScrollDepths, newScrollDepth || 0)

      console.log(`📊 准备更新会话统计: 页面数=${pagesViewedCount}, 最大滚动=${maxScrollDepth}%`)

      // 更新会话统计
      const { error: updateError } = await supabase
        .from('visitor_sessions')
        .update({
          pages_viewed: pagesViewedCount,
          max_scroll_depth: maxScrollDepth
        })
        .eq('session_id', sessionIdRef.current)

      if (updateError) {
        console.error('更新会话统计错误:', updateError)
      } else {
        console.log(`✅ 会话统计已更新: ${pagesViewedCount}个页面, 最大滚动${maxScrollDepth}%`)
      }
    } catch (error) {
      console.error('更新会话统计失败:', error)
    }
  }

  // 更新会话时长和统计
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

        // 同时更新时长和统计
        const { data: pageViews } = await supabase
          .from('page_views')
          .select('page_section, scroll_depth')
          .eq('session_id', sessionIdRef.current)

        const uniquePages = new Set(pageViews?.map(v => v.page_section) || [])
        const allScrollDepths = pageViews?.map(v => v.scroll_depth || 0) || []
        const maxScrollDepth = allScrollDepths.length > 0 ? Math.max(...allScrollDepths) : 0

        await supabase
          .from('visitor_sessions')
          .update({ 
            total_duration: duration,
            pages_viewed: uniquePages.size,
            max_scroll_depth: maxScrollDepth
          })
          .eq('session_id', sessionIdRef.current)

        console.log(`🔄 定期更新: 时长${duration}秒, ${uniquePages.size}个页面, 最大滚动${maxScrollDepth}%`)
      }
    } catch (error) {
      console.error('更新会话时长失败:', error)
    }
  }

  // 结束会话
  const endSession = async () => {
    if (!sessionIdRef.current) return

    // 记录最后一个区域
    const current = currentSectionRef.current
    if (current && pageStartTimeRef.current[current]) {
      const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[current]) / 1000)
      await recordPageView(current, timeSpent)
    }

    // 等待插入完成
    await new Promise(resolve => setTimeout(resolve, 200))

    // 更新会话结束时间和最终统计
    try {
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('page_section, scroll_depth')
        .eq('session_id', sessionIdRef.current)

      const uniquePages = new Set(pageViews?.map(v => v.page_section) || [])
      const allScrollDepths = pageViews?.map(v => v.scroll_depth || 0) || []
      const maxScrollDepth = allScrollDepths.length > 0 ? Math.max(...allScrollDepths) : 0

      await supabase
        .from('visitor_sessions')
        .update({
          session_end: new Date().toISOString(),
          pages_viewed: uniquePages.size,
          max_scroll_depth: maxScrollDepth
        })
        .eq('session_id', sessionIdRef.current)

      console.log(`🏁 会话结束: ${uniquePages.size}个页面, 最大滚动${maxScrollDepth}%`)
    } catch (error) {
      console.error('结束会话失败:', error)
    }
  }

  // 启动所有定时器
  const startAllIntervals = () => {
    // 延迟初始追踪，确保DOM完全渲染
    intervalsRef.current.initialTrack = setTimeout(() => {
      console.log('🔍 开始追踪页面浏览...')
      trackVisibleSection()
    }, 1000)

    // 定期追踪（每5秒检查一次）
    intervalsRef.current.tracking = setInterval(() => {
      trackVisibleSection()
    }, 5000)

    // 定期保存当前区域（每10秒保存一次）
    intervalsRef.current.saveCheck = setInterval(() => {
      const current = currentSectionRef.current
      if (current && pageStartTimeRef.current[current]) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[current]) / 1000)
        if (timeSpent >= 10) {
          console.log(`💾 定期保存: ${current}, 已停留${timeSpent}秒`)
          recordPageView(current, timeSpent)
          // 重置计时器，避免重复记录
          pageStartTimeRef.current[current] = Date.now()
        }
      }
    }, 10000)

    // 定期更新会话信息（每30秒）
    intervalsRef.current.sessionUpdate = setInterval(() => {
      updateSessionDuration()
    }, 30000)
  }

  // 停止所有定时器
  const stopAllIntervals = () => {
    if (intervalsRef.current.initialTrack) {
      clearTimeout(intervalsRef.current.initialTrack)
    }
    if (intervalsRef.current.tracking) {
      clearInterval(intervalsRef.current.tracking)
    }
    if (intervalsRef.current.saveCheck) {
      clearInterval(intervalsRef.current.saveCheck)
    }
    if (intervalsRef.current.sessionUpdate) {
      clearInterval(intervalsRef.current.sessionUpdate)
    }
  }

  // 页面隐藏时的处理（切换标签页、息屏等）
  const handlePageHidden = () => {
    // 防止重复触发
    if (isPausedRef.current) {
      console.log('⚠️ 已经暂停，跳过重复触发')
      return
    }

    isPausedRef.current = true
    const current = currentSectionRef.current
    
    if (current && pageStartTimeRef.current[current]) {
      // 计算当前区域的停留时间
      const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current[current]) / 1000)
      
      // 如果停留时间超过3秒，记录到数据库
      if (timeSpent >= 3) {
        console.log(`⏸️ 页面隐藏: 保存 ${current}, 停留 ${timeSpent}秒`)
        recordPageView(current, timeSpent)
      }
      
      // 保存已停留的时间（用于后续累加）
      pausedTimeRef.current[current] = (pausedTimeRef.current[current] || 0) + timeSpent
      
      // 清除计时起点
      delete pageStartTimeRef.current[current]
    }

    // 停止所有定时器
    stopAllIntervals()
    
    console.log('⏸️ 页面已隐藏，计时暂停')
  }

  // 页面显示时的处理（重新进入标签页、亮屏等）
  const handlePageVisible = () => {
    // 防止重复触发
    if (!isPausedRef.current) {
      console.log('⚠️ 未暂停，跳过恢复触发')
      return
    }

    isPausedRef.current = false
    const current = currentSectionRef.current
    
    // 重新开始当前区域的计时
    if (current) {
      pageStartTimeRef.current[current] = Date.now()
      console.log(`▶️ 页面可见，恢复计时: ${current}`)
    }

    // 重启所有定时器
    startAllIntervals()
  }

  return {
    currentSection: currentSectionRef.current, // 返回当前值（不会触发重新渲染）
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
