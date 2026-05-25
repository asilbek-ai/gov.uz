import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import AnimatedStatistics from '../components/AnimatedStatistics';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const { t, adminData, subscribe } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCountersStarted(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      const result = await subscribe(subscriberEmail);
      if (result) {
        setSubscribed(true);
        setSubscriberEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    }
  };

  const quickLinks = [
    { path: '/services', icon: 'th-large', label: 'Xizmatlar', labelRu: 'Услуги', bg: 'bg-blue-50', text: 'text-blue-600' },
    { path: '/news', icon: 'newspaper', label: 'Yangiliklar', labelRu: 'Новости', bg: 'bg-green-50', text: 'text-green-600' },
    { path: '/documents', icon: 'file-alt', label: 'Hujjatlar', labelRu: 'Документы', bg: 'bg-orange-50', text: 'text-orange-600' },
    { path: '/media', icon: 'photo-video', label: 'Media', labelRu: 'Медиа', bg: 'bg-purple-50', text: 'text-purple-600' },
    { path: '/organizations', icon: 'building', label: 'Tashkilotlar', labelRu: 'Организации', bg: 'bg-red-50', text: 'text-red-600' },
    { path: '/statistics', icon: 'chart-line', label: 'Statistika', labelRu: 'Статистика', bg: 'bg-teal-50', text: 'text-teal-600' },
    { path: '/contact', icon: 'envelope', label: 'Aloqa', labelRu: 'Контакты', bg: 'bg-pink-50', text: 'text-pink-600' },
    { path: '/about', icon: 'info-circle', label: 'Tuman haqida', labelRu: 'О районе', bg: 'bg-indigo-50', text: 'text-indigo-600' }
  ];

  const features = [
    { icon: 'fas fa-user-check', title: t('Tez xizmat ko\'rsatish', 'Быстрое обслуживание'), desc: t('30 daqiqada javob', 'Ответ за 30 минут') },
    { icon: 'fas fa-shield-alt', title: t('Ishonchli tizim', 'Надежная система'), desc: t('Ma\'lumotlar himoyasi', 'Защита данных') },
    { icon: 'fas fa-mobile-alt', title: t('Mobil qulaylik', 'Мобильное удобство'), desc: t('Har qanday qurilmadan', 'С любого устройства') },
    { icon: 'fas fa-headset', title: t('24/7 Yordam', 'Круглосуточная помощь'), desc: t('Doimiy online qo\'llab-quvvatlash', 'Постоянная поддержка') }
  ];

  const receptionHours = {
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00' }
  };

  const carouselList = adminData?.carousel || [];
  const leadersList = adminData?.leadership || [];
  const galleryList = adminData?.gallery || [];

  return (
    <div className="overflow-x-hidden relative">
      {/* Hero Slider */}
      <div className="relative h-[550px] md:h-[650px] overflow-hidden z-10">
        <Swiper 
          modules={[Autoplay, Pagination, Navigation, EffectFade]} 
          effect="fade" 
          autoplay={{ delay: 5000, disableOnInteraction: false }} 
          pagination={{ clickable: true }} 
          navigation 
          loop={carouselList.length > 1}
          className="h-full"
        >
          {carouselList.length > 0 ? (
            carouselList.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full w-full">
                  <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                          {t(slide.title, slide.titleRu)}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white/90">
                          {t('Jondor tumani rasmiy portali', 'Официальный портал Джондорского района')}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                          <Link to="/services">
                            <button className="px-6 py-3 bg-primary rounded-full hover:bg-primary/90 transition-all font-semibold shadow-lg">
                              <i className="fas fa-th-large mr-2"></i> {t('Xizmatlar', 'Услуги')}
                            </button>
                          </Link>
                          <Link to="/contact">
                            <button className="px-6 py-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all font-semibold border border-white/30">
                              <i className="fas fa-paper-plane mr-2"></i> {t('Murojaat qilish', 'Связаться')}
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative h-full w-full">
                <div className="w-full h-full bg-gradient-to-r from-primary to-primaryDark flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <i className="fas fa-image text-6xl mb-4 opacity-50"></i>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('Jondor tumani', 'Джондорский район')}</h1>
                      <p className="text-lg md:text-xl mb-8">{t('Rasmiy portal', 'Официальный портал')}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container-custom -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickLinks.map((link, idx) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={link.path} className="group bg-white rounded-xl p-3 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block">
                <div className={`${link.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition duration-300`}>
                  <i className={`fas fa-${link.icon} ${link.text} text-xl`}></i>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-primary transition">
                  {t(link.label, link.labelRu)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Statistics */}
      <div className="py-16">
        <AnimatedStatistics />
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary mb-3"
            >
              {t('Nima uchun biz?', 'Почему мы?')}
            </motion.h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                  <i className={`${feature.icon} text-2xl text-primary group-hover:text-white transition-all duration-300`}></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div ref={statsRef} className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary mb-3"
            >
              {t('Statistik ma\'lumotlar', 'Статистические данные')}
            </motion.h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {adminData?.statistics?.map((stat, idx) => (
              <motion.div 
                key={stat.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas fa-${stat.icon} text-2xl text-primary`}></i>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm">{t(stat.label, stat.labelRu)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ RAHBARIYAT QISMI ============ */}
      {leadersList.length > 0 && (
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-primary mb-3"
              >
                {t('Tuman rahbariyati', 'Руководство района')}
              </motion.h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {t('Xalq uchun xizmat qilayotgan yetakchilar', 'Лидеры, служащие народу')}
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadersList.slice(0, 3).map((leader, idx) => (
                <motion.div 
                  key={leader.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative">
                    {leader.image ? (
                      <img src={leader.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={leader.name} />
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                          <i className="fas fa-user-tie text-4xl text-primary/50"></i>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition">{leader.name}</h3>
                    <p className="text-primary text-sm font-medium">{leader.position}</p>
                    {leader.positionRu && <p className="text-gray-500 text-xs mt-1">{leader.positionRu}</p>}
                    <div className="mt-4 pt-3 border-t flex justify-center gap-4 text-sm">
                      {leader.phone && (
                        <a href={`tel:${leader.phone}`} className="text-gray-500 hover:text-primary transition">
                          <i className="fas fa-phone mr-1"></i> {leader.phone}
                        </a>
                      )}
                      {leader.email && (
                        <a href={`mailto:${leader.email}`} className="text-gray-500 hover:text-primary transition">
                          <i className="fas fa-envelope mr-1"></i> Email
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {leadersList.length > 3 && (
              <div className="text-center mt-8">
                <Link to="/about" className="text-primary hover:underline inline-flex items-center gap-1 group">
                  {t('Barcha rahbarlar', 'Все руководители')} <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ GALEREYA CAROUSEL QISMI ============ */}
      {galleryList.length > 0 && (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-primary mb-3"
              >
                {t('Galereya', 'Галерея')}
              </motion.h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {t('Tuman hayotidan eng chiroyli lavhalar', 'Красивые моменты из жизни района')}
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop={galleryList.length > 4}
              className="gallery-swiper pb-12"
            >
              {galleryList.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.image} 
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                          alt={item.title || 'Gallery image'} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition duration-300">
                          <p className="text-sm font-medium">{item.title}</p>
                          {item.titleRu && <p className="text-xs opacity-80">{item.titleRu}</p>}
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                        <i className="fas fa-search-plus mr-1"></i> Ko'rish
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="text-center mt-8">
              <Link to="/media" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium">
                {t('Barcha rasmlar', 'Все фото')} <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Reception Hours Section */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('Qabul jadvali', 'График приема')}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <i className="fas fa-user-tie text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Tuman hokimi qabuli', 'Прием хокима района')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-primary"></i> {t(receptionHours.governor.days, receptionHours.governor.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-primary"></i> {receptionHours.governor.time}</p>
                <p className="text-gray-600"><i className="fas fa-map-marker-alt w-6 text-primary"></i> {t(receptionHours.governor.location, receptionHours.governor.locationRu)}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                  <i className="fas fa-users text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Fuqarolar qabuli', 'Прием граждан')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-primary"></i> {t(receptionHours.citizens.days, receptionHours.citizens.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-primary"></i> {receptionHours.citizens.time}</p>
                <p className="text-gray-600"><i className="fas fa-phone-alt w-6 text-primary"></i> {receptionHours.citizens.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t('So\'nggi yangiliklar', 'Последние новости')}</h2>
            </div>
            <Link to="/news" className="text-primary hover:underline flex items-center gap-1 group">
              {t('Barchasi', 'Все')} <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminData?.news?.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/news/${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block">
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={item.title} />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-primaryDark text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      <i className="far fa-calendar-alt mr-1"></i> {item.date}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition">{t(item.title, item.titleRu)}</h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">{item.content?.slice(0, 100)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500"><i className="far fa-eye mr-1"></i> {item.views} {t('ko\'rildi', 'просмотров')}</span>
                      <span className="text-primary font-medium">{t('Davomi', 'Подробнее')} <i className="fas fa-arrow-right text-xs"></i></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-20 bg-gradient-to-r from-primary to-primaryDark text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-bell text-5xl mb-4 animate-pulse"></i>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('Yangiliklardan xabardor bo\'ling', 'Будьте в курсе новостей')}</h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
              <input 
                type="email" 
                placeholder={t('Email manzilingiz', 'Ваш email')} 
                className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                value={subscriberEmail} 
                onChange={(e) => setSubscriberEmail(e.target.value)} 
                required 
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t('Obuna bo\'lish', 'Подписаться')}
              </button>
            </form>
            {subscribed && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-300 font-medium"
              >
                {t('Obuna bo\'ldingiz!', 'Вы подписались!')}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for gallery swiper */}
      <style jsx>{`
        .gallery-swiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.5;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
        }
        .gallery-swiper .swiper-button-next,
        .gallery-swiper .swiper-button-prev {
          color: #3b82f6;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .gallery-swiper .swiper-button-next:after,
        .gallery-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}