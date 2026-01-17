import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'

const Hero = ({ onEnter, guestName, guestGroup, guestRelation }) => {
  // 根据guest_group和guest_relation生成个性化提示语
  const getPersonalizedGreeting = () => {
    if (!guestGroup && !guestRelation) {
      return null
    }

    const isBrideSide = guestGroup === '新娘方'
    const isGroomSide = guestGroup === '新郎方'
    
    // 新人名字
    const brideName = '景欢'
    const groomName = '吴旭'
    
    // 根据关系生成不同的提示语
    if (guestRelation) {
      // 新娘方的关系提示语
      if (isBrideSide) {
        const brideGreetings = {
          '父母': `感谢您养育了美丽的${brideName}，您的爱是她最珍贵的财富`,
          '父亲': `感谢您养育了美丽的${brideName}，您的爱是她最珍贵的财富`,
          '母亲': `感谢您养育了美丽的${brideName}，您的爱是她最珍贵的财富`,
          '爸爸': `感谢您养育了美丽的${brideName}，您的爱是她最珍贵的财富`,
          '妈妈': `感谢您养育了美丽的${brideName}，您的爱是她最珍贵的财富`,
          '兄弟姐妹': `感谢您陪伴${brideName}成长，这份手足之情弥足珍贵`,
          '哥哥': `感谢您陪伴${brideName}成长，这份手足之情弥足珍贵`,
          '姐姐': `感谢您陪伴${brideName}成长，这份手足之情弥足珍贵`,
          '弟弟': `感谢您陪伴${brideName}成长，这份手足之情弥足珍贵`,
          '妹妹': `感谢您陪伴${brideName}成长，这份手足之情弥足珍贵`,
          '朋友': `感谢您见证${brideName}的青春岁月，友谊地久天长`,
          '同学': `感谢您陪伴${brideName}的求学时光，同窗情谊永难忘`,
          '同事': `感谢您在工作中的支持与陪伴，让${brideName}在职场中倍感温暖`,
          '领导': `感谢您在工作中的悉心指导与关怀，您的支持让${brideName}倍感荣幸`,
          '老师': `感谢您对${brideName}的悉心教导与栽培，师恩如山永难忘`,
          '长辈': `感谢您对${brideName}的关爱与呵护，您的祝福是我们最大的荣幸`,
          '亲戚': `感谢您对${brideName}的关心与照顾，这份亲情温暖如春`,
          '表亲': `感谢您对${brideName}的关心与照顾，这份亲情温暖如春`,
          '堂亲': `感谢您对${brideName}的关心与照顾，这份亲情温暖如春`,
          '家人们': `感谢家人们对${brideName}的关爱与支持，有你们的陪伴是最大的幸福`,
        }
        
        return brideGreetings[guestRelation] || `感谢您作为${brideName}的${guestRelation}前来见证我们的幸福时刻`
      }
      
      // 新郎方的关系提示语
      if (isGroomSide) {
        const groomGreetings = {
          '父母': `感谢您养育了优秀的${groomName}，您的爱是他最珍贵的财富`,
          '父亲': `感谢您养育了优秀的${groomName}，您的爱是他最珍贵的财富`,
          '母亲': `感谢您养育了优秀的${groomName}，您的爱是他最珍贵的财富`,
          '爸爸': `感谢您养育了优秀的${groomName}，您的爱是他最珍贵的财富`,
          '妈妈': `感谢您养育了优秀的${groomName}，您的爱是他最珍贵的财富`,
          '兄弟姐妹': `感谢您陪伴${groomName}成长，这份手足之情弥足珍贵`,
          '哥哥': `感谢您陪伴${groomName}成长，这份手足之情弥足珍贵`,
          '姐姐': `感谢您陪伴${groomName}成长，这份手足之情弥足珍贵`,
          '弟弟': `感谢您陪伴${groomName}成长，这份手足之情弥足珍贵`,
          '妹妹': `感谢您陪伴${groomName}成长，这份手足之情弥足珍贵`,
          '朋友': `感谢您见证${groomName}的青春岁月，友谊地久天长`,
          '同学': `感谢您陪伴${groomName}的求学时光，同窗情谊永难忘`,
          '同事': `感谢您在工作中的支持与陪伴，让${groomName}在职场中倍感温暖`,
          '领导': `感谢您在工作中的悉心指导与关怀，您的支持让${groomName}倍感荣幸`,
          '老师': `感谢您对${groomName}的悉心教导与栽培，师恩如山永难忘`,
          '长辈': `感谢您对${groomName}的关爱与呵护，您的祝福是我们最大的荣幸`,
          '亲戚': `感谢您对${groomName}的关心与照顾，这份亲情温暖如春`,
          '表亲': `感谢您对${groomName}的关心与照顾，这份亲情温暖如春`,
          '堂亲': `感谢您对${groomName}的关心与照顾，这份亲情温暖如春`,
          '家人们': `感谢家人们对${groomName}的关爱与支持，有你们的陪伴是最大的幸福`,
        }
        
        return groomGreetings[guestRelation] || `感谢您作为${groomName}的${guestRelation}前来见证我们的幸福时刻`
      }
      
      // 只有关系信息，没有分组
      return `感谢您作为${guestRelation}前来见证我们的幸福时刻`
    }
    
    // 只有分组信息，没有关系
    if (isBrideSide) {
      return `感谢您作为${brideName}方的贵宾前来见证`
    }
    if (isGroomSide) {
      return `感谢您作为${groomName}方的贵宾前来见证`
    }
    
    return null
  }

  const personalizedGreeting = getPersonalizedGreeting()
  const [showDragonAnimation, setShowDragonAnimation] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    // 确保视频立即开始播放
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('视频自动播放被阻止:', err)
      })
    }
  }, [])

  const scrollToNext = () => {
    // 获取按钮的准确位置（相对于视口）
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      // 计算按钮的中心点，确保精确对齐
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
      
      // 触发动画（稍微延迟以确保状态更新）
      requestAnimationFrame(() => {
        setShowDragonAnimation(true)
      })
    }
    
    // 触发樱花飘落
    window.dispatchEvent(new CustomEvent('startCherryBlossoms'))
    
    // 触发弹幕显示
    window.dispatchEvent(new CustomEvent('showDanmaku'))
    
    setTimeout(() => {
      const nextSection = document.querySelector('#about-us')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
        onEnter()
      }
    }, 1500)
    
    setTimeout(() => {
      setShowDragonAnimation(false)
    }, 3000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-rose overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* 渐变遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-rose-100/30 to-rose-50/50"></div>
      </div>
      
      {/* 图案背景作为备用 */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center z-20 px-4"
      >
        {/* 个性化问候语 */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-8 py-4 border-2 border-rose-200">
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                {guestName}，您好！
              </p>
              {personalizedGreeting ? (
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  {personalizedGreeting}
                </p>
              ) : guestGroup ? (
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  {guestGroup}
                </p>
              ) : null}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mb-4 font-elegant">
            Huan
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-gold-400 to-transparent mx-auto mb-4"
            style={{ maxWidth: '200px' }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient font-elegant">
            & Xu
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl text-rose-gold-600 mb-4 font-light tracking-wider"
        >
          2026.02.22
        </motion.p>

        {/* 个性化邀请文案 */}
        {guestName ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-lg md:text-xl text-rose-700 mb-12 font-light"
          >
            诚挚邀请您参加我们的婚礼
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-lg md:text-xl text-rose-700 mb-12 font-light"
          >
            诚邀您见证我们的幸福时刻
          </motion.p>
        )}

        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="px-8 py-4 bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-lg"
        >
          开启邀请函
        </motion.button>
      </motion.div>

      {/* 开启动画层 - 精准对齐、视觉完美 */}
      <AnimatePresence>
        {showDragonAnimation && buttonPosition.x > 0 && (
          <div className="fixed inset-0 z-30 pointer-events-none">
            {/* 调试用 - 按钮中心标记点（可选，用于验证对齐）*/}
            {/* <div 
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            /> */}

            {/* 第一层：瞬间闪光 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute"
              style={{
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 207, 232, 0.6) 30%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 第二层：优雅波纹扩散 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3 + i * 0.5],
                  opacity: [0, 0.7, 0.4, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute rounded-full"
                style={{
                  left: `${buttonPosition.x}px`,
                  top: `${buttonPosition.y}px`,
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  border: `${3 - i * 0.3}px solid rgba(236, 72, 153, ${0.8 - i * 0.1})`,
                  boxShadow: `0 0 ${30 - i * 5}px rgba(236, 72, 153, ${0.6 - i * 0.1})`,
                }}
              />
            ))}

            {/* 第三层：中心光环脉冲 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 2.5],
                opacity: [0, 0.9, 0]
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="absolute rounded-full"
              style={{
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(251, 207, 232, 0.9) 0%, rgba(236, 72, 153, 0.6) 30%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* 第四层：环形樱花爆发 */}
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16
              const distance = 100 + Math.random() * 60
              const endX = Math.cos((angle * Math.PI) / 180) * distance
              const endY = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`petal-${i}`}
                  initial={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    left: `${buttonPosition.x + endX}px`,
                    top: `${buttonPosition.y + endY}px`,
                    opacity: [0, 1, 1, 0.7, 0],
                    rotate: [0, 360 + Math.random() * 360],
                    scale: [0, 1.2, 1, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.15 + i * 0.03,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-2xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.5))' 
                  }}
                >
                  🌸
                </motion.div>
              )
            })}

            {/* 第五层：爱心螺旋上升 */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8
              const spiralRadius = 40
              
              return (
                <motion.div
                  key={`heart-${i}`}
                  initial={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    left: `${buttonPosition.x + Math.cos((angle * Math.PI) / 180) * spiralRadius}px`,
                    top: `${buttonPosition.y - 150 + Math.sin((angle * Math.PI) / 180) * spiralRadius}px`,
                    opacity: [0, 1, 1, 0.8, 0],
                    scale: [0, 1.3, 1.1, 0.9, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.25 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-3xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.6))'
                  }}
                >
                  ❤️
                </motion.div>
              )
            })}

            {/* 第六层：放射状金光 */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30)
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1, 1.5, 0],
                    opacity: [0, 0.9, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.05 + i * 0.03,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute"
                  style={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    width: '4px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0) 0%, rgba(251, 191, 36, 1) 50%, rgba(251, 191, 36, 0) 100%)',
                    transformOrigin: 'center top',
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
                  }}
                />
              )
            })}

            {/* 第七层：星光爆炸 */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24
              const distance = 80 + Math.random() * 80
              const x = Math.cos((angle * Math.PI) / 180) * distance
              const y = Math.sin((angle * Math.PI) / 180) * distance
              
              return (
                <motion.div
                  key={`star-${i}`}
                  initial={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    left: `${buttonPosition.x + x}px`,
                    top: `${buttonPosition.y + y}px`,
                    scale: [0, 1.5, 1, 0],
                    opacity: [0, 1, 0.9, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.02,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div 
                    className="w-2 h-2 bg-white rounded-full" 
                    style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.5)' }}
                  />
                </motion.div>
              )
            })}

            {/* 第八层：细腻粉色粒子云 */}
            {[...Array(30)].map((_, i) => {
              const randomAngle = Math.random() * 360
              const randomDistance = 60 + Math.random() * 100
              const endX = Math.cos((randomAngle * Math.PI) / 180) * randomDistance
              const endY = Math.sin((randomAngle * Math.PI) / 180) * randomDistance - 40
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    left: `${buttonPosition.x + endX}px`,
                    top: `${buttonPosition.y + endY}px`,
                    opacity: [0, 0.9, 0.7, 0],
                    scale: [0, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    background: i % 4 === 0 ? '#fbbf24' : i % 4 === 1 ? '#ec4899' : i % 4 === 2 ? '#f472b6' : '#fbcfe8',
                    boxShadow: `0 0 6px ${i % 4 === 0 ? '#fbbf24' : '#ec4899'}`,
                  }}
                />
              )
            })}

            {/* 第九层：玫瑰花瓣旋转 */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60)
              const radius = 70
              
              return (
                <motion.div
                  key={`rose-${i}`}
                  initial={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    opacity: 0,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    left: `${buttonPosition.x + Math.cos((angle * Math.PI) / 180) * radius}px`,
                    top: `${buttonPosition.y + Math.sin((angle * Math.PI) / 180) * radius}px`,
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 720],
                    scale: [0, 1.5, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute text-2xl"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 2px 6px rgba(236, 72, 153, 0.5))'
                  }}
                >
                  🌹
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToNext}
        >
          <FaChevronDown className="text-rose-gold-400 text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero



