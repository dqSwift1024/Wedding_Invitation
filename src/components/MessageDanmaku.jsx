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
      // 默认留言 - 更多祝福语
      const defaultMessages = [
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
      ]

      if (!isSupabaseConfigured()) {
        console.log('使用默认留言')
        setMessages(defaultMessages)
        return
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('获取留言失败，使用默认留言:', error)
        setMessages(defaultMessages)
        return
      }

      // 如果没有数据，使用默认留言
      if (!data || data.length === 0) {
        console.log('数据库无留言，使用默认留言')
        setMessages(defaultMessages)
      } else {
        setMessages(data)
      }
    } catch (error) {
      console.error('获取留言失败，使用默认留言:', error)
      // 出错时使用默认留言
      setMessages([
        { id: 1, name: '小红', content: '祝福新人百年好合！💕', created_at: new Date().toISOString() },
        { id: 2, name: '小明', content: '恭喜恭喜！白头偕老！🎉', created_at: new Date().toISOString() },
        { id: 3, name: '小李', content: '新婚快乐！幸福美满！✨', created_at: new Date().toISOString() },
        { id: 4, name: '小王', content: '祝你们永远幸福！❤️', created_at: new Date().toISOString() },
        { id: 5, name: '小张', content: '执子之手，与子偕老！🌹', created_at: new Date().toISOString() },
      ])
    }
  }

  useEffect(() => {
    console.log('弹幕状态:', { isVisible, messagesCount: messages.length })
    
    if (!isVisible || messages.length === 0) {
      console.log('弹幕未激活或无消息')
      return
    }

    console.log('开始弹幕循环')
    let messageIndex = 0
    
    // 立即显示第一条
    const firstMessage = {
      ...messages[0],
      displayId: Math.random(),
      xOffset: Math.random() * 30 - 15,
    }
    setDisplayMessages([firstMessage])
    messageIndex++

    // 6秒后移除第一条
    setTimeout(() => {
      setDisplayMessages(prev => prev.filter(m => m.displayId !== firstMessage.displayId))
    }, 6000)

    const interval = setInterval(() => {
      const newMessage = {
        ...messages[messageIndex % messages.length],
        displayId: Math.random(),
        xOffset: Math.random() * 30 - 15,
      }
      console.log('弹出新弹幕:', newMessage)
      setDisplayMessages(prev => [...prev, newMessage])
      messageIndex++

      // 6秒后移除弹幕
      setTimeout(() => {
        setDisplayMessages(prev => prev.filter(m => m.displayId !== newMessage.displayId))
      }, 6000)
    }, 2000) // 每2秒发送一条弹幕

    return () => clearInterval(interval)
  }, [isVisible, messages])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {isVisible && displayMessages.map((msg) => (
          <motion.div
            key={msg.displayId}
            initial={{
              x: `calc(8% + ${msg.xOffset}vw)`,
              y: 'calc(100vh + 50px)',
              opacity: 0,
              scale: 0.5,
              rotate: -5,
            }}
            animate={{
              x: `calc(8% + ${msg.xOffset}vw)`,
              y: '-100px',
              opacity: [0, 1, 1, 1, 1, 0.8, 0.5, 0],
              scale: [0.5, 1.1, 1, 1, 1, 0.95, 0.9, 0.7],
              rotate: [-5, 0, 0, 0, 0, 2, 5],
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
              y: '-200px',
            }}
            transition={{
              duration: 6,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: {
                duration: 6,
                times: [0, 0.08, 0.25, 0.5, 0.7, 0.85, 0.95, 1],
              },
              scale: {
                duration: 6,
                times: [0, 0.1, 0.15, 0.4, 0.7, 0.85, 0.95, 1],
              },
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 8px 32px rgba(236, 72, 153, 0.4)',
                  '0 12px 40px rgba(236, 72, 153, 0.6)',
                  '0 8px 32px rgba(236, 72, 153, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-rose-500/95 to-pink-500/95 backdrop-blur-md rounded-2xl px-5 py-3 border-2 border-white/50"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-white to-rose-100 flex items-center justify-center text-rose-600 text-base font-bold shadow-xl ring-2 ring-white/60"
              >
                {msg.name?.charAt(0) || '💖'}
              </motion.div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold drop-shadow-lg tracking-wide">
                  {msg.name || '匿名宾客'}
                </span>
                <span className="text-white text-lg font-bold whitespace-nowrap drop-shadow-xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                  {msg.content}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default MessageDanmaku
