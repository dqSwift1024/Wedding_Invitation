import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const AboutUs = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photos = [
    { id: 1, url: '/images/couple-1.jpg', alt: '合照1' },
    { id: 2, url: '/images/couple-2.jpg', alt: '合照2' },
    { id: 3, url: '/images/couple-3.jpg', alt: '合照3' },
    { id: 4, url: '/images/couple-4.jpg', alt: '合照4' },
  ]

  return (
    <section id="about-us" ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            About Us
          </h2>
          <p className="text-rose-gold-500 text-lg">我们的故事</p>
        </motion.div>

        {/* 新人照片 */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/bride.jpg"
                alt="新娘"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/fbcfe8/ffffff?text=新娘'
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">Huan</h3>
            <p className="text-gray-600">美丽善良，充满活力</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/groom.jpg"
                alt="新郎"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/f9a8d4/ffffff?text=新郎'
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">Xu</h3>
            <p className="text-gray-600">温柔体贴，热爱生活</p>
          </motion.div>
        </div>

        {/* 合照轮播 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-gradient font-elegant">
            美好回忆
          </h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {photos.map(photo => (
              <SwiperSlide key={photo.id}>
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/f9a8d4/ffffff?text=${photo.alt}`
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs



