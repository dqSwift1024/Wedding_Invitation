// Service Worker for PWA - 简化版本
const CACHE_NAME = 'wedding-invitation-v3'

// 安装 Service Worker - 强制跳过等待，立即激活
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  self.skipWaiting() // 立即激活新的Service Worker
})

// 拦截请求 - 网络优先策略
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // 跳过以下请求，不做任何处理：
  // 1. 非GET请求（POST、PUT等）
  // 2. 外部API（如Supabase）
  // 3. Chrome扩展请求
  if (
    event.request.method !== 'GET' ||
    url.hostname.includes('supabase') ||
    url.protocol === 'chrome-extension:'
  ) {
    return // 让浏览器正常处理这些请求
  }
  
  // 对于本地资源，使用网络优先策略
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 如果网络请求成功，返回响应
        return response
      })
      .catch((error) => {
        // 网络失败时，尝试从缓存获取
        console.log('Fetch failed, trying cache:', error)
        return caches.match(event.request)
      })
  )
})

// 激活 Service Worker - 立即接管所有客户端
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    Promise.all([
      // 删除所有旧缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
        )
      }),
      // 立即接管所有客户端
      self.clients.claim()
    ])
  )
  console.log('Service Worker activated')
})

