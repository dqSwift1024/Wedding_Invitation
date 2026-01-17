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
        { id: 1, name: '高圆圆', content: '祝福新人百年好合！💕', created_at: new Date().toISOString() },
        { id: 2, name: '邓紫棋', content: '恭喜恭喜！白头偕老！🎉', created_at: new Date().toISOString() },
        { id: 3, name: '王一博', content: '新婚快乐！幸福美满！✨', created_at: new Date().toISOString() },
        { id: 4, name: '赵丽颖', content: '祝你们永远幸福！❤️', created_at: new Date().toISOString() },
        { id: 5, name: '迪丽热巴', content: '执子之手，与子偕老！🌹', created_at: new Date().toISOString() },
        { id: 6, name: '易烊千玺', content: '天作之合，佳偶天成！💑', created_at: new Date().toISOString() },
        { id: 7, name: '白敬亭', content: '相亲相爱，幸福永远！💖', created_at: new Date().toISOString() },
        { id: 8, name: '刘亦菲', content: '永结同心，白头到老！🎊', created_at: new Date().toISOString() },
        { id: 9, name: '周深', content: '花好月圆，喜结良缘！🌙', created_at: new Date().toISOString() },
        { id: 10, name: '胡歌', content: '琴瑟和鸣，岁月静好！🎵', created_at: new Date().toISOString() },
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
        { id: 1, name: '高圆圆', content: '祝福新人百年好合！💕', created_at: new Date().toISOString() },
        { id: 2, name: '邓紫棋', content: '恭喜恭喜！白头偕老！🎉', created_at: new Date().toISOString() },
        { id: 3, name: '王一博', content: '新婚快乐！幸福美满！✨', created_at: new Date().toISOString() },
        { id: 4, name: '赵丽颖', content: '祝你们永远幸福！❤️', created_at: new Date().toISOString() },
        { id: 5, name: '迪丽热巴', content: '执子之手，与子偕老！🌹', created_at: new Date().toISOString() },
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

    // 7.125秒后移除第一条（动画持续时间5.625秒 + 缓冲时间1.5秒）
    setTimeout(() => {
      setDisplayMessages(prev => prev.filter(m => m.displayId !== firstMessage.displayId))
    }, 7125)

    const interval = setInterval(() => {
      const newMessage = {
        ...messages[messageIndex % messages.length],
        displayId: Math.random(),
        xOffset: Math.random() * 30 - 15,
      }
      console.log('弹出新弹幕:', newMessage)
      setDisplayMessages(prev => [...prev, newMessage])
      messageIndex++

      // 7.125秒后移除弹幕（动画持续时间5.625秒 + 缓冲时间1.5秒）
      setTimeout(() => {
        setDisplayMessages(prev => prev.filter(m => m.displayId !== newMessage.displayId))
      }, 7125)
    }, 1000) // 每1秒发送一条弹幕

    return () => clearInterval(interval)
  }, [isVisible, messages])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {isVisible && displayMessages.map((msg) => (
          <motion.div
            key={msg.displayId}
            initial={{
              x: '3%',
              y: window.innerHeight - 60,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: '3%',
              y: window.innerHeight * 0.4,
              opacity: [0, 1, 1, 0.8, 0.6, 0.4, 0.2, 0],
              scale: [0.8, 1, 1, 0.98, 0.96, 0.93, 0.9, 0.87],
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: 5.625,
              ease: 'linear',
              opacity: {
                duration: 5.625,
                times: [0, 0.1, 0.35, 0.55, 0.7, 0.82, 0.92, 1],
              },
              scale: {
                duration: 5.625,
                times: [0, 0.1, 0.35, 0.55, 0.7, 0.82, 0.92, 1],
              },
            }}
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-rose-400/70 to-pink-500/70 flex items-center justify-center text-white text-[10px] font-bold"
              >
                {msg.name?.charAt(0) || '💖'}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-white/80 text-[9px] font-medium leading-tight">
                  {msg.name || '匿名'}
                </span>
                <span className="text-white text-xs font-medium whitespace-nowrap leading-tight">
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
