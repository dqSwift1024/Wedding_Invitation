import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'
import { getVisitorInfo, formatAddress } from '../utils/ipGeoLocation'

/**
 * 宾客追踪 Hook
 * 通过 URL 参数识别宾客身份，并记录访问日志
 */
export const useGuestTracking = () => {
  const [guest, setGuest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    identifyGuest()
  }, [])

  const identifyGuest = async () => {
    try {
      // 1. 从 URL 获取 guest 参数
      const urlParams = new URLSearchParams(window.location.search)
      const guestId = urlParams.get('guest')

      if (guestId) {
        // 2. 从数据库查询宾客信息
        const { data: guestData, error } = await supabase
          .from('guests')
          .select('*')
          .eq('guest_id', guestId)
          .single()

        if (guestData && !error) {
          setGuest(guestData)
          
          // 3. 保存到本地（避免刷新丢失）
          localStorage.setItem('current_guest', JSON.stringify(guestData))

          // 4. 记录访问日志
          await recordGuestVisit(guestData)
          
          console.log(`✅ 欢迎访客: ${guestData.guest_name}`)
        } else {
          console.warn('未找到该宾客信息:', guestId)
        }
      } else {
        // 5. 检查本地存储（用户刷新页面时）
        const localGuest = localStorage.getItem('current_guest')
        if (localGuest) {
          try {
            const guestData = JSON.parse(localGuest)
            setGuest(guestData)
            
            // 记录后续访问
            await recordGuestVisit(guestData, false)
          } catch (e) {
            localStorage.removeItem('current_guest')
          }
        }
      }
    } catch (error) {
      console.error('识别访客失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const recordGuestVisit = async (guestData, isNewSession = true) => {
    if (!isSupabaseConfigured()) {
      return
    }

    try {
      // 获取当前访问状态
      const { data: currentGuest } = await supabase
        .from('guests')
        .select('visit_count, has_opened, first_visit_time')
        .eq('guest_id', guestData.guest_id)
        .single()

      const isFirstVisit = !currentGuest?.has_opened
      const now = new Date().toISOString()

      // 更新宾客访问状态
      await supabase
        .from('guests')
        .update({
          has_opened: true,
          visit_count: (currentGuest?.visit_count || 0) + 1,
          first_visit_time: currentGuest?.first_visit_time || now,
          last_visit_time: now
        })
        .eq('guest_id', guestData.guest_id)

      // 记录详细访问日志
      if (isNewSession) {
        // 获取访客IP和地理位置信息
        const visitorInfo = await getVisitorInfo()
        const address = formatAddress(visitorInfo)

        // 同时更新guests表的地理位置信息（首次访问时）
        if (isFirstVisit) {
          await supabase
            .from('guests')
            .update({
              visitor_country: visitorInfo.country,
              visitor_region: visitorInfo.region,
              visitor_city: visitorInfo.city,
              visitor_address: address
            })
            .eq('guest_id', guestData.guest_id)
        }

        // 插入访问日志
        await supabase.from('guest_visits').insert([{
          guest_id: guestData.guest_id,
          guest_name: guestData.guest_name,
          visitor_ip: visitorInfo.ip,
          device_type: getDeviceType(),
          browser: getBrowserName(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || '直接访问',
          page_url: window.location.href,
          visit_time: now,
          is_first_visit: isFirstVisit,
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
      }
    } catch (error) {
      console.error('记录访问失败:', error)
    }
  }

  return { guest, loading }
}

/**
 * 判断设备类型
 */
const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return '平板'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
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
  if (ua.includes('Trident')) return 'IE'
  return '其他'
}

/**
 * 获取宾客统计数据
 */
export const getGuestStats = async () => {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    // 获取总邀请数
    const { count: totalCount } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })

    // 获取已打开数
    const { count: openedCount } = await supabase
      .from('guests')
      .select('*', { count: 'exact', head: true })
      .eq('has_opened', true)

    // 获取总访问次数
    const { data: visitData } = await supabase
      .from('guests')
      .select('visit_count')

    const totalVisits = visitData?.reduce((sum, g) => sum + (g.visit_count || 0), 0) || 0

    // 获取今日访问
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayVisits } = await supabase
      .from('guest_visits')
      .select('*', { count: 'exact', head: true })
      .gte('visit_time', today.toISOString())

    // 获取分组统计
    const { data: groupStats } = await supabase
      .from('guests')
      .select('guest_group, has_opened')

    return {
      totalCount,
      openedCount,
      openRate: totalCount > 0 ? ((openedCount / totalCount) * 100).toFixed(1) : 0,
      totalVisits,
      todayVisits,
      groupStats: groupStats || []
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return null
  }
}

/**
 * 获取最近访客列表
 */
export const getRecentVisitors = async (limit = 10) => {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data } = await supabase
      .from('guest_visits')
      .select('*')
      .order('visit_time', { ascending: false })
      .limit(limit)

    return data || []
  } catch (error) {
    console.error('获取访客列表失败:', error)
    return []
  }
}
