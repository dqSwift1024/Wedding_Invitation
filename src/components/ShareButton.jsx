import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaShareAlt, FaWeixin, FaQq, FaLink, FaTimes } from 'react-icons/fa'

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  // 获取当前页面URL
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'Ming & Xin - 婚礼请柬'
  const shareDesc = '诚挚邀请您参加我们的婚礼，2025年10月20日，期待您的到来！'
  const shareImage = typeof window !== 'undefined' ? `${window.location.origin}/images/share-cover.jpg` : ''

  // 复制链接
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert('链接已复制到剪贴板！')
      setIsOpen(false)
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        alert('链接已复制到剪贴板！')
        setIsOpen(false)
      } catch (err) {
        alert('复制失败，请手动复制链接')
      }
      document.body.removeChild(textArea)
    }
  }

  // 微信分享（需要微信JS-SDK，这里提供基础方案）
  const shareWeChat = () => {
    // 提示用户在微信中点击右上角分享
    alert('请在微信中点击右上角菜单，选择"发送给朋友"或"分享到朋友圈"')
    setIsOpen(false)
  }

  // QQ分享
  const shareQQ = () => {
    const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDesc)}&pics=${encodeURIComponent(shareImage)}`
    window.open(qqUrl, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  // 原生分享API（移动端）
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDesc,
          url: currentUrl,
        })
        setIsOpen(false)
      } catch (err) {
        // 用户取消分享
      }
    } else {
      // 降级到复制链接
      copyLink()
    }
  }

  return (
    <>
      {/* 分享按钮 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white p-4 rounded-full shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaShareAlt className="text-xl" />
      </motion.button>

      {/* 分享面板遮罩 */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* 分享面板 */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-2xl"
            >
              {/* 关闭按钮 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">分享邀请函</h3>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-gray-800"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>

              {/* 分享选项 */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {/* 微信分享 */}
                <motion.button
                  onClick={shareWeChat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <FaWeixin className="text-white text-2xl" />
                  </div>
                  <span className="text-sm text-gray-700">微信</span>
                </motion.button>

                {/* QQ分享 */}
                <motion.button
                  onClick={shareQQ}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaQq className="text-white text-2xl" />
                  </div>
                  <span className="text-sm text-gray-700">QQ</span>
                </motion.button>

                {/* 复制链接 */}
                <motion.button
                  onClick={copyLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-rose-gold-500 rounded-full flex items-center justify-center">
                    <FaLink className="text-white text-xl" />
                  </div>
                  <span className="text-sm text-gray-700">复制链接</span>
                </motion.button>

                {/* 原生分享（移动端） */}
                {typeof navigator !== 'undefined' && navigator.share && (
                  <motion.button
                    onClick={nativeShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 rounded-full flex items-center justify-center">
                      <FaShareAlt className="text-white text-xl" />
                    </div>
                    <span className="text-sm text-gray-700">更多</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ShareButton

