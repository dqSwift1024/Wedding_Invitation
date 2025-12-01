// API 配置
// 根据部署平台自动选择 API 地址

const getApiUrl = () => {
  // 生产环境
  if (import.meta.env.PROD) {
    // 如果设置了环境变量，使用环境变量
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL
    }
    
    // 腾讯云开发
    if (window.tcb) {
      return '/cloudbase-cgi' // 腾讯云开发云函数路径
    }
    
    // 默认使用相对路径（适用于 Gitee Pages + 独立后端）
    return '/api'
  }
  
  // 开发环境
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
}

export const API_URL = getApiUrl()

// 腾讯云开发配置（如果使用）
export const TCB_CONFIG = {
  env: import.meta.env.VITE_TCB_ENV_ID || 'your-env-id'
}

