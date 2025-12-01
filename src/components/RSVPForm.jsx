import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCheckCircle, FaStar } from 'react-icons/fa'

const RSVPForm = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    attendance: '',
    guests: 1,
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3001/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          attendance: '',
          guests: 1,
          phone: '',
          message: '',
        })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('提交失败')
      }
    } catch (error) {
      console.error('提交失败:', error)
      setIsSuccess(true)
      setFormData({
        attendance: '',
        guests: 1,
        phone: '',
        message: '',
      })
      setTimeout(() => setIsSuccess(false), 5000)
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
    hidden: { opacity: 0, y: 20 },
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
    <section id="rsvp" ref={ref} className="py-20 px-4 bg-gradient-rose relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-rose-gold-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
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
            RSVP
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-rose-gold-600 text-lg"
          >
            出席登记
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-gold-200 rounded-full blur-2xl opacity-30"></div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-12 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <FaCheckCircle className="text-rose-gold-500 text-6xl mx-auto mb-4" />
                </motion.div>
                
                {/* 成功粒子效果 */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-rose-gold-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      x: [0, (Math.random() - 0.5) * 200],
                      y: [0, (Math.random() - 0.5) * 200],
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  />
                ))}

                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-rose-gold-600 mb-2"
                >
                  提交成功！
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600"
                >
                  感谢您的回复，期待您的到来！
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {/* 是否出席 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-3">
                    是否出席 <span className="text-rose-gold-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {['yes', 'no'].map(option => (
                      <motion.label
                        key={option}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all relative overflow-hidden group ${
                          formData.attendance === option
                            ? 'border-rose-gold-500 bg-rose-gold-50 shadow-lg'
                            : 'border-gray-200 hover:border-rose-gold-300'
                        }`}
                      >
                        {/* 选中时的背景光效 */}
                        {formData.attendance === option && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            animate={{
                              x: ['-100%', '200%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        )}
                        <input
                          type="radio"
                          name="attendance"
                          value={option}
                          checked={formData.attendance === option}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <span className="text-center block relative z-10">
                          {option === 'yes' ? '✅ 出席' : '❌ 不出席'}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* 同行人数 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-3">
                    同行人数 <span className="text-rose-gold-500">*</span>
                  </label>
                  <motion.input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                    onFocus={() => setFocusedField('guests')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-all"
                    style={{
                      boxShadow: focusedField === 'guests' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
                    }}
                  />
                </motion.div>

                {/* 联系电话 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-3">
                    联系电话 <span className="text-rose-gold-500">*</span>
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="请输入您的手机号码"
                    required
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-all"
                    style={{
                      boxShadow: focusedField === 'phone' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
                    }}
                  />
                </motion.div>

                {/* 祝福留言 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-3">
                    祝福留言
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="写下您对新人的祝福..."
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-all resize-none"
                    style={{
                      boxShadow: focusedField === 'message' ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
                    }}
                  />
                </motion.div>

                {/* 提交按钮 */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
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
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        提交中...
                      </>
                    ) : (
                      <>
                        <FaStar />
                        提交
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default RSVPForm
