/**
 * 第三方统计工具集成
 * 支持百度统计、Google Analytics、友盟等
 */

/**
 * 初始化百度统计（推荐国内用户使用）
 * @param {string} siteId - 百度统计站点 ID
 */
export const initBaiduAnalytics = (siteId) => {
  if (!siteId) {
    console.warn('百度统计站点 ID 未设置')
    return
  }

  const script = document.createElement('script')
  script.innerHTML = `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?${siteId}";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `
  document.head.appendChild(script)
  
  console.log('✅ 百度统计已启用')
}

/**
 * 发送自定义事件到百度统计
 * @param {string} category - 事件类别
 * @param {string} action - 事件动作
 * @param {string} label - 事件标签
 */
export const trackBaiduEvent = (category, action, label = '') => {
  if (window._hmt) {
    window._hmt.push(['_trackEvent', category, action, label])
  }
}

/**
 * 初始化 Google Analytics
 * @param {string} measurementId - GA4 测量 ID（格式：G-XXXXXXXXXX）
 */
export const initGoogleAnalytics = (measurementId) => {
  if (!measurementId) {
    console.warn('Google Analytics 测量 ID 未设置')
    return
  }

  // 加载 gtag.js
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script1)

  // 初始化 gtag
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `
  document.head.appendChild(script2)

  console.log('✅ Google Analytics 已启用')
}

/**
 * 发送自定义事件到 Google Analytics
 * @param {string} eventName - 事件名称
 * @param {object} params - 事件参数
 */
export const trackGoogleEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }
}

/**
 * 简易访客计数器（使用 localStorage）
 * 适合小型网站快速统计
 */
export const simpleVisitorCounter = () => {
  const STORAGE_KEY = 'wedding_visitor_count'
  const VISITED_KEY = 'wedding_has_visited'
  
  // 检查是否是首次访问（基于浏览器）
  const hasVisited = localStorage.getItem(VISITED_KEY)
  
  if (!hasVisited) {
    // 首次访问，增加计数
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0')
    const newCount = currentCount + 1
    localStorage.setItem(STORAGE_KEY, newCount.toString())
    localStorage.setItem(VISITED_KEY, 'true')
    
    console.log(`👥 访客计数: ${newCount}`)
    return newCount
  }
  
  // 返回当前计数
  return parseInt(localStorage.getItem(STORAGE_KEY) || '0')
}

/**
 * 获取简易访客计数
 */
export const getVisitorCount = () => {
  return parseInt(localStorage.getItem('wedding_visitor_count') || '0')
}

/**
 * 获取设备信息
 */
export const getDeviceInfo = () => {
  const ua = navigator.userAgent
  
  let deviceType = '电脑'
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = '平板'
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry/.test(ua)) {
    deviceType = '手机'
  }

  let browser = '其他'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'

  return {
    deviceType,
    browser,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language
  }
}
