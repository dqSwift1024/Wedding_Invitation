// Service Worker for PWA
const CACHE_NAME = 'wedding-invitation-v2'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
]

// 安装 Service Worker - 强制跳过等待，立即激活
self.addEventListener('install', (event) => {
  self.skipWaiting() // 立即激活新的Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err)
        })
      })
  )
})

// 拦截请求并使用缓存
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // 不缓存以下请求：
  // 1. 外部API请求（如Supabase）
  // 2. localhost请求
  // 3. 非GET请求
  if (
    url.hostname !== self.location.hostname || 
    event.request.method !== 'GET' ||
    url.hostname.includes('supabase')
  ) {
    // 直接从网络获取，不缓存
    event.respondWith(fetch(event.request))
    return
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在缓存中找到了，返回缓存的版本
        if (response) {
          return response
        }
        // 否则，从网络获取
        return fetch(event.request).then(
          (response) => {
            // 检查是否有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // 克隆响应
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        ).catch(err => {
          console.log('Fetch error:', err)
          throw err
        })
      })
  )
})

// 激活 Service Worker - 立即接管所有客户端
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // 删除旧缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // 立即接管所有客户端
      self.clients.claim()
    ])
  )
})

