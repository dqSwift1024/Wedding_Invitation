import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const AboutUs = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timeline = [
    { stage: '相识', emoji: '👋', desc: '在大学的图书馆里，我们第一次相遇，那一刻，时间仿佛静止' },
    { stage: '相知', emoji: '💕', desc: '共同的兴趣爱好让我们走到了一起，彼此了解，心灵相通' },
    { stage: '相恋', emoji: '🌹', desc: '一起走过山川湖海，看遍世间美景，每一刻都是最美好的回忆' },
    { stage: '承诺', emoji: '💍', desc: '在最美的日落时分，许下终身承诺，决定共度余生' },
    { stage: '永恒', emoji: '💒', desc: '执子之手，与子偕老，开启人生新篇章' },
  ]

  const photos = [
    { id: 1, url: '/images/couple-1.jpg', alt: '合照1' },
    { id: 2, url: '/images/couple-2.jpg', alt: '合照2' },
    { id: 3, url: '/images/couple-3.jpg', alt: '合照3' },
    { id: 4, url: '/images/couple-4.jpg', alt: '合照4' },
  ]

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  // 子元素动画变体
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  // 照片动画变体
  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="about-us" ref={ref} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-gold-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-rose-gold-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant"
          >
            About Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-rose-gold-500 text-lg"
          >
            我们的故事
          </motion.p>
        </motion.div>

        {/* 新人照片 - 增强动画 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          <motion.div
            variants={photoVariants}
            className="text-center group"
          >
            <motion.div 
              className="relative mb-6 overflow-hidden rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/images/groom.jpg"
                alt="新郎"
                className="w-full h-auto object-cover"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/f9a8d4/ffffff?text=新郎'
                }}
              />
              {/* 图片加载时的遮罩 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-rose-gold-600 mb-2"
              whileHover={{ scale: 1.1 }}
            >
              Ming
            </motion.h3>
            <p className="text-gray-600">温柔体贴，热爱生活</p>
          </motion.div>

          <motion.div
            variants={photoVariants}
            className="text-center group"
          >
            <motion.div 
              className="relative mb-6 overflow-hidden rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/images/bride.jpg"
                alt="新娘"
                className="w-full h-auto object-cover"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/fbcfe8/ffffff?text=新娘'
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-rose-gold-600 mb-2"
              whileHover={{ scale: 1.1 }}
            >
              Xin
            </motion.h3>
            <p className="text-gray-600">美丽善良，充满活力</p>
          </motion.div>
        </motion.div>

        {/* 时间线 - 增强动画 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-gradient font-elegant"
          >
            情感阶段
          </motion.h3>
          <div className="relative">
            {/* 时间线连接线 - 动画 */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-gold-200 via-rose-gold-400 to-rose-gold-200 hidden md:block"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    className="bg-gradient-to-br from-cream-50 to-rose-gold-50 p-6 rounded-xl shadow-lg relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    {/* 背景光效 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <div className="relative z-10">
                      <motion.div 
                        className="flex items-center gap-3 mb-3"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ 
                          delay: index * 0.2 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <span className="text-4xl">{item.emoji}</span>
                        <div className="text-rose-gold-600 font-bold text-xl">{item.stage}</div>
                      </motion.div>
                      <div className="text-gray-600 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* 时间节点 - 脉冲动画 */}
                <motion.div 
                  className="hidden md:block w-8 h-8 rounded-full bg-rose-gold-500 border-4 border-white shadow-lg z-10 relative"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {/* 脉冲效果 */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-rose-gold-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 合照轮播 - 增强效果 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8 text-gradient font-elegant"
          >
            美好回忆
          </motion.h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30
              },
            }}
            className="pb-12"
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo.id}>
                <motion.div 
                  className="overflow-hidden rounded-xl shadow-lg group relative"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* 图片加载占位 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-gold-100 to-rose-gold-200 flex items-center justify-center z-0">
                    <motion.div
                      className="w-8 h-8 border-2 border-rose-gold-400 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  {/* 图片 */}
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-64 object-cover relative z-10 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/f9a8d4/ffffff?text=${photo.alt}`
                      e.target.onerror = null
                    }}
                    onLoad={(e) => {
                      // 图片加载完成后隐藏占位
                      const placeholder = e.target.parentElement?.querySelector('.absolute')
                      if (placeholder) {
                        placeholder.style.opacity = '0'
                        setTimeout(() => {
                          placeholder.style.display = 'none'
                        }, 300)
                      }
                    }}
                  />
                  
                  {/* 悬浮遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-semibold text-sm">{photo.alt}</p>
                    </div>
                  </div>
                  
                  {/* 光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs
