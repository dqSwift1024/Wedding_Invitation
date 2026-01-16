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
        // 默认留言
        setMessages([
          { id: 1, name: '张三', content: '祝福新人百年好合！永结同心！', created_at: new Date().toISOString() },
          { id: 2, name: '李四', content: '恭喜恭喜！白头偕老！', created_at: new Date().toISOString() },
          { id: 3, name: '王五', content: '新婚快乐！幸福美满！', created_at: new Date().toISOString() },
          { id: 4, name: '赵六', content: '祝你们永远幸福！', created_at: new Date().toISOString() },
          { id: 5, name: '小明', content: '执子之手，与子偕老！', created_at: new Date().toISOString() },
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
      if (messageIndex < messages.length) {
        const newMessage = {
          ...messages[messageIndex],
          displayId: Math.random(),
          lane: Math.floor(Math.random() * 3), // 3个弹道
        }
        setDisplayMessages(prev => [...prev, newMessage])
        messageIndex++

        // 8秒后移除弹幕
        setTimeout(() => {
          setDisplayMessages(prev => prev.filter(m => m.displayId !== newMessage.displayId))
        }, 8000)
      } else {
        // 循环播放
        messageIndex = 0
      }
    }, 1500) // 每1.5秒发送一条弹幕

    return () => clearInterval(interval)
  }, [isVisible, messages])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 h-40 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {displayMessages.map((msg) => (
          <motion.div
            key={msg.displayId}
            initial={{
              x: -500,
              y: msg.lane * 45 + 10,
            }}
            animate={{
              x: window.innerWidth + 500,
              y: msg.lane * 45 + 10,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 8,
              ease: 'linear',
            }}
            className="absolute left-0"
            style={{
              bottom: `${msg.lane * 45 + 10}px`,
            }}
          >
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                {msg.name?.charAt(0) || '❤️'}
              </div>
              <div className="flex flex-col">
                <span className="text-rose-300 text-xs font-medium">
                  {msg.name || '匿名'}
                </span>
                <span className="text-white text-sm font-medium whitespace-nowrap">
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
