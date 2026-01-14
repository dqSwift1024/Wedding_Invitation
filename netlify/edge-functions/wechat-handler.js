export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  
  // 检测是否为微信或QQ浏览器
  const isWeChat = /MicroMessenger/i.test(userAgent);
  const isQQ = /QQ\//i.test(userAgent);
  
  // 如果是微信或QQ环境，返回引导页面
  if (isWeChat || isQQ) {
    const targetUrl = url.href;
    const hostUrl = url.origin;
    
    // 返回一个完全内联的HTML页面，不依赖任何外部资源
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Ming & Xin 婚礼请柬</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
      background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    body::before {
      content: '💕';
      position: absolute;
      font-size: 150px;
      opacity: 0.03;
      top: -30px;
      right: -30px;
      animation: float 6s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(3deg); }
    }
    .arrow {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 50px;
      height: 50px;
      animation: bounce 1.5s infinite;
      z-index: 10;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .arrow svg {
      width: 100%;
      height: 100%;
      fill: #EC4899;
      filter: drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4));
    }
    .container {
      background: white;
      border-radius: 24px;
      padding: 45px 35px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
      text-align: center;
      animation: slideIn 0.6s ease-out;
      position: relative;
      z-index: 1;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .icon {
      font-size: 72px;
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    h1 {
      background: linear-gradient(135deg, #EC4899, #F472B6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: 1px;
    }
    .subtitle {
      color: #6B7280;
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 30px;
    }
    .steps {
      background: linear-gradient(135deg, #FDF2F8, #FCE7F3);
      border-radius: 14px;
      padding: 25px 20px;
      margin: 25px 0;
      text-align: left;
    }
    .step {
      display: flex;
      align-items: flex-start;
      margin-bottom: 18px;
      animation: fadeIn 0.5s ease-out backwards;
    }
    .step:nth-child(1) { animation-delay: 0.2s; }
    .step:nth-child(2) { animation-delay: 0.4s; }
    .step:nth-child(3) { animation-delay: 0.6s; }
    .step:last-child { margin-bottom: 0; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-15px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .step-num {
      background: linear-gradient(135deg, #EC4899, #F472B6);
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: bold;
      margin-right: 14px;
      flex-shrink: 0;
      box-shadow: 0 3px 12px rgba(236, 72, 153, 0.35);
    }
    .step-text {
      color: #374151;
      font-size: 15px;
      line-height: 1.7;
      padding-top: 5px;
    }
    .step-text strong {
      color: #EC4899;
      font-weight: 600;
    }
    .btn {
      width: 100%;
      background: linear-gradient(135deg, #EC4899, #F472B6);
      color: white;
      border: none;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(236, 72, 153, 0.35);
      transition: all 0.3s ease;
      margin-top: 25px;
    }
    .btn:active {
      transform: translateY(2px);
      box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
    }
    .note {
      margin-top: 20px;
      padding: 16px;
      background: #F9FAFB;
      border-radius: 10px;
      font-size: 13px;
      color: #6B7280;
      line-height: 1.6;
      text-align: left;
    }
    .note strong {
      color: #EC4899;
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
    }
    .link {
      background: #F3F4F6;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 12px;
      margin: 15px 0;
      word-break: break-all;
      font-size: 12px;
      color: #6B7280;
      font-family: 'Courier New', monospace;
      text-align: left;
    }
    @media (max-width: 500px) {
      .container { padding: 40px 28px; }
      h1 { font-size: 28px; }
      .arrow { top: 18px; right: 18px; width: 42px; height: 42px; }
    }
  </style>
</head>
<body>
  <div class="arrow">
    <svg viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      <circle cx="19" cy="5" r="3" fill="#F472B6"/>
      <circle cx="19" cy="5" r="2" fill="white"/>
    </svg>
  </div>
  
  <div class="container">
    <div class="icon">💌</div>
    <h1>Ming & Xin</h1>
    <div class="subtitle">
      婚礼请柬<br>
      2025.10.20
    </div>
    
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-text">
          点击右上角 <strong>"···"</strong> 菜单
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-text">
          选择 <strong>"在浏览器中打开"</strong><br>
          或 <strong>"用Safari打开"</strong>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-text">
          即可查看完整请柬
        </div>
      </div>
    </div>
    
    <button class="btn" onclick="tryOpen()">
      💕 尝试打开请柬
    </button>
    
    <div class="note">
      <strong>💡 为什么需要在浏览器打开？</strong>
      为了获得最佳浏览体验，包括动画效果、背景音乐等完整功能。
    </div>
    
    <div class="link">${targetUrl}</div>
  </div>
  
  <script>
    const targetUrl = '${targetUrl}';
    const hostUrl = '${hostUrl}';
    
    // 尝试多种方式打开
    function tryOpen() {
      // 方案1: 直接尝试打开（可能被拦截）
      window.location.href = targetUrl;
      
      // 方案2: 延迟后尝试使用 URL Scheme（Android）
      setTimeout(() => {
        try {
          const isAndroid = /android/i.test(navigator.userAgent);
          if (isAndroid) {
            // Android Intent URL
            const intentUrl = 'intent://' + hostUrl.replace(/^https?:\\/\\//, '') + '#Intent;scheme=https;end';
            window.location.href = intentUrl;
          }
        } catch (e) {
          console.log('Intent failed:', e);
        }
      }, 500);
    }
    
    // 页面加载时自动尝试（用户可能不看就点了）
    window.addEventListener('load', function() {
      // 延迟1秒自动尝试一次
      setTimeout(() => {
        // 只在第一次加载时尝试
        if (!sessionStorage.getItem('attempted')) {
          sessionStorage.setItem('attempted', '1');
          tryOpen();
        }
      }, 1000);
    });
    
    // 复制链接功能
    document.querySelector('.link').addEventListener('click', function() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(targetUrl).then(() => {
          alert('✅ 链接已复制！请粘贴到浏览器打开');
        }).catch(() => {
          selectText(this);
        });
      } else {
        selectText(this);
      }
    });
    
    function selectText(element) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        alert('✅ 链接已复制！请粘贴到浏览器打开');
      } catch (e) {
        alert('请长按链接手动复制');
      }
    }
  </script>
</body>
</html>`;
    
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex'
      }
    });
  }
  
  // 非微信/QQ环境，正常处理请求
  return context.next();
};

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/images/*", "/music/*", "/videos/*", "*.js", "*.css", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg", "*.ico", "*.mp3", "*.mp4", "*.woff", "*.woff2", "*.ttf"]
};
