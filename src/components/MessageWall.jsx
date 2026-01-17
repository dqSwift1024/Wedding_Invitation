import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'

const MessageWall = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({ name: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      // 检查Supabase是否已配置
      if (!isSupabaseConfigured()) {
        console.warn('Supabase未配置，显示默认留言')
        setMessages([
          {
            id: 1,
            name: '示例用户',
            content: '祝福新人百年好合！',
            created_at: new Date().toISOString(),
          },
        ])
        return
      }

      // 从Supabase获取留言，按创建时间倒序排列
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('获取留言失败:', error)
        throw error
      }

      setMessages(data || [])
    } catch (error) {
      console.error('获取留言失败:', error)
      // 如果获取失败，使用默认留言
      setMessages([
        {
          id: 1,
          name: '示例用户',
          content: '祝福新人百年好合！',
          created_at: new Date().toISOString(),
        },
      ])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newMessage.name.trim() || !newMessage.content.trim()) return

    setIsSubmitting(true)
    try {
      // 检查Supabase是否已配置
      if (!isSupabaseConfigured()) {
        console.warn('Supabase未配置，请在Netlify环境变量中设置VITE_SUPABASE_URL和VITE_SUPABASE_ANON_KEY')
        throw new Error('数据库未配置')
      }

      // 使用Supabase保存留言
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            name: newMessage.name.trim(),
            content: newMessage.content.trim(),
          }
        ])
        .select()

      if (error) {
        console.error('Supabase错误:', error)
        throw error
      }

      // 提交成功
      console.log('留言提交成功:', data)
      setNewMessage({ name: '', content: '' })
      fetchMessages() // 重新获取留言列表
      
      // 触发新留言弹幕事件
      if (data && data.length > 0) {
        const newMessageData = data[0]
        window.dispatchEvent(new CustomEvent('newMessageSubmitted', {
          detail: {
            id: newMessageData.id,
            name: newMessageData.name,
            content: newMessageData.content,
            created_at: newMessageData.created_at
          }
        }))
      }
      
    } catch (error) {
      console.error('提交留言失败:', error)
      alert('提交失败，请稍后重试或联系管理员')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="messages" ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            Message Wall
          </h2>
          <p className="text-rose-gold-600 text-lg">祝福留言墙</p>
        </motion.div>

        {/* 留言表单 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-cream-50 to-rose-gold-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="您的姓名"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors"
              required
            />
            <textarea
              placeholder="写下您的祝福..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors resize-none"
              required
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            >
              {isSubmitting ? '提交中...' : '发布留言'}
            </motion.button>
          </form>
        </motion.div>

        {/* 留言列表 */}
        <div className="grid md:grid-cols-2 gap-4">
          {messages.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 py-12">
              还没有留言，快来留下第一条祝福吧！
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-rose-gold-400"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{message.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {new Date(message.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm line-clamp-2">{message.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default MessageWall

