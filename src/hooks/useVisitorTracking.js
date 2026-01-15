import { useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'
import { getVisitorInfo, formatAddress } from '../utils/ipGeoLocation'

/**
 * 访客追踪 Hook
 * 自动记录访客信息到数据库（用于匿名访客）
 */
export const useVisitorTracking = () => {
  useEffect(() => {
    // 只在 Supabase 配置正确时才记录
    if (!isSupabaseConfigured()) {
      console.log('Supabase 未配置，跳过访客追踪')
      return
    }

    const trackVisitor = async () => {
      try {
        // 获取访客IP和地理位置信息
        const visitorInfo = await getVisitorInfo()
        const address = formatAddress(visitorInfo)

        // 获取访客信息
        const visitorData = {
          visitor_ip: visitorInfo.ip,
          user_agent: navigator.userAgent,
          referrer: document.referrer || '直接访问',
          page_url: window.location.href,
          device_type: getDeviceType(),
          browser: getBrowserName(),
          visit_time: new Date().toISOString(),
          // 地理位置信息
          country: visitorInfo.country,
          region: visitorInfo.region,
          city: visitorInfo.city,
          visitor_address: address,
          // 定位方式
          location_method: visitorInfo.location_method || 'ip',
          location_accuracy: visitorInfo.accuracy || null
        }

        // 插入访客记录
        const { error } = await supabase
          .from('visitors')
          .insert([visitorData])

        if (error) {
          console.error('访客记录失败:', error)
        } else {
          // 显示定位信息
          if (visitorInfo.location_method === 'gps') {
            console.log(`✅ 访客记录成功，GPS定位: ${address} (精度: ${Math.round(visitorInfo.accuracy)}米)`)
          } else {
            console.log(`✅ 访客记录成功，IP定位: ${address}`)
          }
        }
      } catch (error) {
        console.error('访客追踪出错:', error)
      }
    }

    // 延迟记录，避免影响页面加载速度
    const timer = setTimeout(trackVisitor, 1000)

    return () => clearTimeout(timer)
  }, [])
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
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
  if (ua.includes('Trident')) return 'IE'
  return '其他'
}

/**
 * 获取访客统计数据
 */
export const getVisitorStats = async () => {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    // 获取总访问量
    const { count: totalCount } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })

    // 获取今日访问量
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayCount } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
      .gte('visit_time', today.toISOString())

    // 获取设备分布
    const { data: deviceStats } = await supabase
      .from('visitors')
      .select('device_type')
    
    return {
      totalCount,
      todayCount,
      deviceStats: deviceStats || []
    }
  } catch (error) {
    console.error('获取访客统计失败:', error)
    return null
  }
}
