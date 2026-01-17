import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { supabase, isSupabaseConfigured } from '../config/supabase'

const RSVPForm = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    attendance: '',
    guests: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'guests') {
      // 允许空字符串，以便用户可以清空输入框
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: '',
        }))
      } else {
        // 只允许输入数字，并限制范围
        const numValue = parseInt(value)
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
          setFormData(prev => ({
            ...prev,
            [name]: numValue,
          }))
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 验证出席人数
    if (formData.guests === '' || formData.guests < 1 || formData.guests > 10) {
      alert('请输入有效的出席人数（1-10人）')
      return
    }
    
    setIsSubmitting(true)

    try {
      // 检查Supabase是否已配置
      if (!isSupabaseConfigured()) {
        console.warn('Supabase未配置，请在Netlify环境变量中设置VITE_SUPABASE_URL和VITE_SUPABASE_ANON_KEY')
        throw new Error('数据库未配置')
      }

      // 使用Supabase保存数据
      const { data, error } = await supabase
        .from('rsvp')
        .insert([
          {
            attendance: formData.attendance,
            guests: formData.guests,
            phone: formData.phone,
            message: formData.message || null,
            submitted_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Supabase错误:', error)
        throw error
      }

      // 提交成功
      console.log('RSVP提交成功:', data)
      setIsSuccess(true)
      setFormData({
        attendance: '',
        guests: '',
        phone: '',
        message: '',
      })
      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      console.error('提交失败:', error)
      alert('提交失败，请稍后重试或联系管理员')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="rsvp" ref={ref} className="py-20 px-4 bg-gradient-rose">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            RSVP
          </h2>
          <p className="text-rose-gold-600 text-lg">出席登记</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <FaCheckCircle className="text-rose-gold-500 text-6xl mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">提交成功！</h3>
              <p className="text-gray-600">感谢您的回复，期待您的到来！</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 是否出席 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  是否出席 <span className="text-rose-gold-500">*</span>
                </label>
                <div className="flex gap-4">
                  {['yes', 'no'].map(option => (
                    <label
                      key={option}
                      className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.attendance === option
                          ? 'border-rose-gold-500 bg-rose-gold-50'
                          : 'border-gray-200 hover:border-rose-gold-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option}
                        checked={formData.attendance === option}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      <span className="text-center block">
                        {option === 'yes' ? '✅ 出席' : '❌ 不出席'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 出席人数 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  出席人数 <span className="text-rose-gold-500">*</span>
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="请输入出席人数（1-10人）"
                  min="1"
                  max="10"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors"
                />
              </div>

              {/* 联系电话 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  联系电话 <span className="text-rose-gold-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="请输入您的手机号码"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors"
                />
              </div>

              {/* 祝福留言 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  祝福留言
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="写下您对新人的祝福..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* 提交按钮 */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '提交中...' : '提交'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default RSVPForm

