import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const MessageWall = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({ name: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3001/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.reverse())
      }
    } catch (error) {
      console.error('获取留言失败:', error)
      setMessages([
        {
          id: 1,
          name: '示例用户',
          content: '祝福新人百年好合！',
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newMessage.name.trim() || !newMessage.content.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newMessage,
          createdAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setNewMessage({ name: '', content: '' })
        fetchMessages()
      }
    } catch (error) {
      console.error('提交留言失败:', error)
      const newMsg = {
        id: Date.now(),
        ...newMessage,
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [newMsg, ...prev])
      setNewMessage({ name: '', content: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section id="messages" ref={ref} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-gold-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-rose-gold-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant"
          >
            Message Wall
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-rose-gold-600 text-lg"
          >
            祝福留言墙
          </motion.p>
        </motion.div>

        {/* 留言表单 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-gradient-to-br from-cream-50 to-rose-gold-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12 relative overflow-hidden"
        >
          {/* 背景光效 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="您的姓名"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-all"
              style={{
                boxShadow: focusedField === 'name' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
              }}
              required
            />
            <motion.textarea
              variants={itemVariants}
              placeholder="写下您的祝福..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              onFocus={() => setFocusedField('content')}
              onBlur={() => setFocusedField(null)}
              whileFocus={{ scale: 1.02 }}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-all resize-none"
              style={{
                boxShadow: focusedField === 'content' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
              }}
              required
            />
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              {/* 按钮光效 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10">
                {isSubmitting ? '提交中...' : '发布留言'}
              </span>
            </motion.button>
          </form>
        </motion.div>

        {/* 留言列表 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {messages.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="col-span-2 text-center text-gray-500 py-12"
            >
              还没有留言，快来留下第一条祝福吧！
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-rose-gold-400 relative overflow-hidden group"
              >
                {/* 卡片光效 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "linear"
                  }}
                />

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 flex items-center justify-center text-white font-bold"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {message.name.charAt(0).toUpperCase()}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-800">{message.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed relative z-10">{message.content}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default MessageWall
