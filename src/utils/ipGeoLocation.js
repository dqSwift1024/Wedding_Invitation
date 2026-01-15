/**
 * IP 地址和地理位置获取工具
 * 支持多个备用服务，确保移动端也能正常获取
 * 
 * 优先级：
 * 1. 浏览器GPS定位（需要用户授权）- 最精确
 * 2. IP地址定位（自动，无需授权）- 备选方案
 */

/**
 * 获取访客 IP 地址（多个备用方案）
 * @returns {Promise<string>} IP地址
 */
export const getVisitorIP = async () => {
  // 方案列表（按优先级排序）
  const ipServices = [
    // 方案1: ipify（最快，但可能被墙）
    {
      url: 'https://api.ipify.org?format=json',
      parse: (data) => data.ip
    },
    // 方案2: ipapi.co（支持地理位置）
    {
      url: 'https://ipapi.co/json/',
      parse: (data) => data.ip
    },
    // 方案3: ip-api.com（免费，无需密钥）
    {
      url: 'http://ip-api.com/json/',
      parse: (data) => data.query
    },
    // 方案4: ipinfo.io（稳定）
    {
      url: 'https://ipinfo.io/json',
      parse: (data) => data.ip
    },
    // 方案5: cloudflare（如果其他都失败）
    {
      url: 'https://www.cloudflare.com/cdn-cgi/trace',
      parse: (text) => {
        const match = text.match(/ip=([^\n]+)/)
        return match ? match[1] : null
      },
      isText: true
    }
  ]

  // 尝试每个服务
  for (const service of ipServices) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒超时

      const response = await fetch(service.url, {
        signal: controller.signal,
        mode: 'cors'
      })
      
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = service.isText 
          ? await response.text()
          : await response.json()
        
        const ip = service.parse(data)
        if (ip) {
          console.log(`✅ 获取IP成功: ${ip} (来源: ${service.url})`)
          return ip
        }
      }
    } catch (error) {
      console.warn(`IP获取失败 (${service.url}):`, error.message)
      // 继续尝试下一个服务
    }
  }

  console.error('❌ 所有IP获取服务都失败')
  return '未知'
}

/**
 * 获取访客地理位置信息（通过IP）
 * @param {string} ip - IP地址（可选，不传则自动获取）
 * @returns {Promise<Object>} 地理位置信息
 */
export const getGeoLocation = async (ip = null) => {
  try {
    // 如果没有传IP，先获取IP
    const targetIP = ip || await getVisitorIP()
    
    if (targetIP === '未知') {
      return {
        country: '未知',
        country_code: null,
        region: '未知',
        city: '未知',
        latitude: null,
        longitude: null,
        timezone: null,
        isp: null
      }
    }

    // 尝试多个地理位置服务
    const geoServices = [
      // 方案1: ip-api.com（免费，无需密钥，支持中文）
      {
        url: `http://ip-api.com/json/${targetIP}?lang=zh-CN`,
        parse: (data) => ({
          country: data.country || '未知',
          country_code: data.countryCode,
          region: data.regionName || '未知',
          city: data.city || '未知',
          latitude: data.lat,
          longitude: data.lon,
          timezone: data.timezone,
          isp: data.isp
        })
      },
      // 方案2: ipapi.co（备用）
      {
        url: `https://ipapi.co/${targetIP}/json/`,
        parse: (data) => ({
          country: data.country_name || '未知',
          country_code: data.country_code,
          region: data.region || '未知',
          city: data.city || '未知',
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          isp: data.org
        })
      }
    ]

    for (const service of geoServices) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(service.url, {
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          const geoInfo = service.parse(data)
          
          console.log(`✅ 获取地理位置成功: ${geoInfo.country} ${geoInfo.region} ${geoInfo.city}`)
          return geoInfo
        }
      } catch (error) {
        console.warn(`地理位置获取失败 (${service.url}):`, error.message)
      }
    }

    // 所有服务都失败，返回默认值
    return {
      country: '未知',
      country_code: null,
      region: '未知',
      city: '未知',
      latitude: null,
      longitude: null,
      timezone: null,
      isp: null
    }
  } catch (error) {
    console.error('地理位置获取失败:', error)
    return {
      country: '未知',
      country_code: null,
      region: '未知',
      city: '未知',
      latitude: null,
      longitude: null,
      timezone: null,
      isp: null
    }
  }
}

/**
 * 使用浏览器GPS获取精确位置（静默请求，不提示用户）
 * @returns {Promise<Object|null>} 地理位置信息或null
 */
export const getGPSLocation = async () => {
  return new Promise((resolve) => {
    // 检查浏览器是否支持地理定位
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    // 超时设置：5秒（缩短超时时间，避免等待太久）
    const timeoutId = setTimeout(() => {
      resolve(null)
    }, 5000)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId)
        
        const { latitude, longitude } = position.coords
        console.log(`✅ GPS定位成功: ${latitude}, ${longitude}`)

        try {
          // 使用反向地理编码获取地址（通过经纬度）
          const address = await reverseGeocode(latitude, longitude)
          
          resolve({
            method: 'gps',
            latitude,
            longitude,
            accuracy: position.coords.accuracy, // 精度（米）
            ...address
          })
        } catch (error) {
          // 反向地理编码失败，仅返回坐标
          resolve({
            method: 'gps',
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
            country: '未知',
            country_code: null,
            region: '未知',
            city: '未知',
            timezone: null,
            isp: null
          })
        }
      },
      (error) => {
        clearTimeout(timeoutId)
        // GPS定位失败，静默返回null
        resolve(null)
      },
      {
        enableHighAccuracy: false, // 降低精度要求，提高成功率
        timeout: 5000,             // 5秒超时
        maximumAge: 300000         // 允许使用5分钟内的缓存位置
      }
    )
  })
}

/**
 * 反向地理编码：通过经纬度获取地址
 * @param {number} latitude - 纬度
 * @param {number} longitude - 经度
 * @returns {Promise<Object>} 地址信息
 */
const reverseGeocode = async (latitude, longitude) => {
  // 使用多个反向地理编码服务
  const services = [
    // 服务1: Nominatim（OpenStreetMap，免费）
    {
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=zh-CN`,
      parse: (data) => ({
        country: data.address?.country || '未知',
        country_code: data.address?.country_code?.toUpperCase(),
        region: data.address?.state || data.address?.province || '未知',
        city: data.address?.city || data.address?.town || data.address?.village || '未知',
        timezone: null,
        isp: null
      })
    },
    // 服务2: BigDataCloud（免费，无需API key）
    {
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`,
      parse: (data) => ({
        country: data.countryName || '未知',
        country_code: data.countryCode,
        region: data.principalSubdivision || '未知',
        city: data.city || data.locality || '未知',
        timezone: null,
        isp: null
      })
    }
  ]

  for (const service of services) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(service.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Wedding-Invitation-Website/1.0'
        }
      })
      
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        const address = service.parse(data)
        console.log(`✅ 反向地理编码成功: ${address.country} ${address.region} ${address.city}`)
        return address
      }
    } catch (error) {
      console.warn(`反向地理编码失败 (${service.url}):`, error.message)
    }
  }

  // 所有服务都失败
  throw new Error('反向地理编码失败')
}

/**
 * 获取完整的访客信息（优先GPS，备选IP）
 * @param {boolean} forceIP - 是否强制使用IP定位（跳过GPS）
 * @returns {Promise<Object>} 包含IP和地理位置的对象
 */
export const getVisitorInfo = async (forceIP = false) => {
  try {
    // 优先尝试GPS定位（除非强制使用IP）
    if (!forceIP) {
      const gpsLocation = await getGPSLocation()
      
      if (gpsLocation) {
        // GPS定位成功，获取IP地址
        const ip = await getVisitorIP()
        
        return {
          ip,
          ...gpsLocation,
          location_method: 'gps' // 标记定位方式
        }
      }
    }

    // GPS定位失败或被跳过，使用IP定位
    console.log('📡 使用IP地址定位...')
    const ip = await getVisitorIP()
    const geoLocation = ip !== '未知' ? await getGeoLocation(ip) : await getGeoLocation()

    return {
      ip,
      ...geoLocation,
      location_method: 'ip' // 标记定位方式
    }
  } catch (error) {
    console.error('获取访客信息失败:', error)
    return {
      ip: '未知',
      country: '未知',
      country_code: null,
      region: '未知',
      city: '未知',
      latitude: null,
      longitude: null,
      timezone: null,
      isp: null,
      location_method: 'failed'
    }
  }
}

/**
 * 格式化地址为字符串
 */
export const formatAddress = (geoInfo) => {
  const parts = []
  
  if (geoInfo.country && geoInfo.country !== '未知') {
    parts.push(geoInfo.country)
  }
  if (geoInfo.region && geoInfo.region !== '未知') {
    parts.push(geoInfo.region)
  }
  if (geoInfo.city && geoInfo.city !== '未知') {
    parts.push(geoInfo.city)
  }

  return parts.length > 0 ? parts.join(' ') : '未知地区'
}
