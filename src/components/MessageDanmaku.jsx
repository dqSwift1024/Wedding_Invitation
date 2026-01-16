import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../config/supabase'

const MessageDanmaku = () => {
  const [messages, setMessages] = useState([])
  const [displayMessages, setDisplayMessages] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchMessages()
    
    // 监听显示弹幕事件
    const handleShow = () => {
      setIsVisible(true)
    }
    
    window.addEventListener('showDanmaku', handleShow)
    
    return () => {
      window.removeEventListener('showDanmaku', handleShow)
    }
  }, [])

  const fetchMessages = async () => {
    try {
      if (!isSupabaseConfigured()) {
        // 默认留言 - 更多祝福语
        setMessages([
          { id: 1, name: '小红', content: '祝福新人百年好合！💕', created_at: new Date().toISOString() },
          { id: 2, name: '小明', content: '恭喜恭喜！白头偕老！🎉', created_at: new Date().toISOString() },
          { id: 3, name: '小李', content: '新婚快乐！幸福美满！✨', created_at: new Date().toISOString() },
          { id: 4, name: '小王', content: '祝你们永远幸福！❤️', created_at: new Date().toISOString() },
          { id: 5, name: '小张', content: '执子之手，与子偕老！🌹', created_at: new Date().toISOString() },
          { id: 6, name: '小赵', content: '天作之合，佳偶天成！💑', created_at: new Date().toISOString() },
          { id: 7, name: '小刘', content: '相亲相爱，幸福永远！💖', created_at: new Date().toISOString() },
          { id: 8, name: '小陈', content: '永结同心，白头到老！🎊', created_at: new Date().toISOString() },
          { id: 9, name: '小林', content: '花好月圆，喜结良缘！🌙', created_at: new Date().toISOString() },
          { id: 10, name: '小周', content: '琴瑟和鸣，岁月静好！🎵', created_at: new Date().toISOString() },
        ])
        return
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('获取留言失败:', error)
    }
  }

  useEffect(() => {
    if (!isVisible || messages.length === 0) return

    let messageIndex = 0
    const interval = setInterval(() => {
      const newMessage = {
        ...messages[messageIndex % messages.length],
        displayId: Math.random(),
        xOffset: Math.random() * 30 - 15, // 随机左右偏移
      }
      setDisplayMessages(prev => [...prev, newMessage])
      messageIndex++

      // 5秒后移除弹幕（透明度动画）
      setTimeout(() => {
        setDisplayMessages(prev => prev.filter(m => m.displayId !== newMessage.displayId))
      }, 5000)
    }, 2000) // 每2秒发送一条弹幕

    return () => clearInterval(interval)
  }, [isVisible, messages])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {displayMessages.map((msg) => (
          <motion.div
            key={msg.displayId}
            initial={{
              x: `calc(5% + ${msg.xOffset}vw)`,
              y: '100vh',
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: `calc(5% + ${msg.xOffset}vw)`,
              y: '-20vh',
              opacity: [0, 1, 1, 1, 0.8, 0.5, 0],
              scale: [0.8, 1, 1, 1, 0.95, 0.9, 0.8],
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 5,
              ease: 'linear',
              opacity: {
                times: [0, 0.1, 0.3, 0.6, 0.8, 0.9, 1],
              },
            }}
            className="absolute"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-rose-500/90 to-pink-500/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-2xl border-2 border-white/40">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-500 text-sm font-bold shadow-lg">
                {msg.name?.charAt(0) || '❤️'}
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold drop-shadow-lg">
                  {msg.name || '匿名'}
                </span>
                <span className="text-white text-base font-semibold whitespace-nowrap drop-shadow-lg">
                  {msg.content}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default MessageDanmaku
