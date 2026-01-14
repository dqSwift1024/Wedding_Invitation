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

  const timeline = [
    { year: '2018', event: '初次相遇', desc: '在大学的图书馆里，我们第一次相遇' },
    { year: '2019', event: '相知相恋', desc: '共同的兴趣爱好让我们走到了一起' },
    { year: '2021', event: '毕业旅行', desc: '一起走过山川湖海，看遍世间美景' },
    { year: '2023', event: '求婚成功', desc: '在最美的日落时分，许下终身承诺' },
    { year: '2025', event: '步入婚姻', desc: '执子之手，与子偕老' },
  ]

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
                src="/images/groom.jpg"
                alt="新郎"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/f9a8d4/ffffff?text=新郎'
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">Ming</h3>
            <p className="text-gray-600">温柔体贴，热爱生活</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            <h3 className="text-2xl font-bold text-rose-gold-600 mb-2">Xin</h3>
            <p className="text-gray-600">美丽善良，充满活力</p>
          </motion.div>
        </div>

        {/* 时间线 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient font-elegant">
            我们的爱情时间线
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-gold-200 to-rose-gold-400 hidden md:block"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gradient-to-br from-cream-50 to-rose-gold-50 p-6 rounded-xl shadow-lg">
                    <div className="text-rose-gold-600 font-bold text-xl mb-2">{item.year}</div>
                    <div className="text-gray-800 font-semibold text-lg mb-2">{item.event}</div>
                    <div className="text-gray-600">{item.desc}</div>
                  </div>
                </div>
                <div className="hidden md:block w-8 h-8 rounded-full bg-rose-gold-500 border-4 border-white shadow-lg z-10"></div>
                <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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



