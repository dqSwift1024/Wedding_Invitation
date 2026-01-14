// Service Worker - 完全禁用版本
// 此Service Worker会立即注销自己，不会缓存或拦截任何请求

self.addEventListener('install', (event) => {
  console.log('Service Worker: 正在注销旧版本...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: 清除所有缓存并注销...')
  event.waitUntil(
    Promise.all([
      // 删除所有缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('删除缓存:', cacheName)
            return caches.delete(cacheName)
          })
        )
      }),
      // 注销自己
      self.registration.unregister().then(() => {
        console.log('Service Worker 已成功注销')
      }),
      // 接管所有客户端以立即生效
      self.clients.claim()
    ])
  )
})

