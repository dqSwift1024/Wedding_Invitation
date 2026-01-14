import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photos = [
    { id: 1, url: '/images/wedding-1.jpg', alt: '婚纱照1' },
    { id: 2, url: '/images/wedding-2.jpg', alt: '婚纱照2' },
    { id: 3, url: '/images/wedding-3.jpg', alt: '婚纱照3' },
    { id: 4, url: '/images/wedding-4.jpg', alt: '婚纱照4' },
    { id: 5, url: '/images/wedding-5.jpg', alt: '婚纱照5' },
    { id: 6, url: '/images/wedding-6.jpg', alt: '婚纱照6' },
  ]

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 bg-gradient-rose">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            Gallery
          </h2>
          <p className="text-rose-gold-600 text-lg">美好瞬间</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            className="pb-12"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {photos.map(photo => (
              <SwiperSlide key={photo.id} className="!w-auto">
                <div className="mx-2 overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-[400px] md:h-[500px] object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x600/f9a8d4/ffffff?text=${photo.alt}`
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

export default Gallery



