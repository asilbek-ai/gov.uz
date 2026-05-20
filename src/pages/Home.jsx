import { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { AppContext } from '../App';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const { t, adminData } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isStatsInView && !countersStarted) setCountersStarted(true);
  }, [isStatsInView, countersStarted]);

  const quickLinks = [
    { path: '/services', icon: 'th-large', label: 'Xizmatlar', labelRu: 'Услуги', color: 'blue', bg: 'bg-blue-100', text: 'text-blue-600' },
    { path: '/news', icon: 'newspaper', label: 'Yangiliklar', labelRu: 'Новости', color: 'green', bg: 'bg-green-100', text: 'text-green-600' },
    { path: '/documents', icon: 'file-alt', label: 'Hujjatlar', labelRu: 'Документы', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-600' },
    { path: '/media', icon: 'photo-video', label: 'Media', labelRu: 'Медиа', color: 'purple', bg: 'bg-purple-100', text: 'text-purple-600' },
    { path: '/organizations', icon: 'building', label: 'Tashkilotlar', labelRu: 'Организации', color: 'red', bg: 'bg-red-100', text: 'text-red-600' },
    { path: '/statistics', icon: 'chart-line', label: 'Statistika', labelRu: 'Статистика', color: 'teal', bg: 'bg-teal-100', text: 'text-teal-600' },
    { path: '/contact', icon: 'envelope', label: 'Aloqa', labelRu: 'Контакты', color: 'pink', bg: 'bg-pink-100', text: 'text-pink-600' },
    { path: '/about', icon: 'info-circle', label: "Tuman haqida", labelRu: "О районе", color: 'indigo', bg: 'bg-indigo-100', text: 'text-indigo-600' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Slider */}
      <div className="relative h-[550px] md:h-[650px] overflow-hidden">
        <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]} effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation loop className="h-full">
          {adminData.carousel.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img src={slide.image} className="object-cover w-full h-full" alt={slide.title} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 text-center text-white">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-4 text-4xl font-bold md:text-6xl">{t(slide.title, slide.titleRu)}</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8 text-lg md:text-xl">{t('Jondor tumani rasmiy portali', 'Официальный портал Джондорского района')}</motion.p>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}><Link to="/services"><button className="text-lg btn-primary"><i className="mr-2 fas fa-th-large"></i> {t('Xizmatlar', 'Услуги')}</button></Link></motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Quick Links */}
      <div className="relative z-20 -mt-16 container-custom">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {quickLinks.map(link => (
            <Link key={link.path} to={link.path} className="p-3 text-center transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2">
              <div className={`${link.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition duration-300`}>
                <i className={`fas fa-${link.icon} ${link.text} text-xl`}></i>
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-primary">{t(link.label, link.labelRu)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div ref={statsRef} className="section-padding bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-bold md:text-4xl gradient-text">{t('Statistik ma\'lumotlar', 'Статистические данные')}</motion.h2>
            <p className="mt-2 text-gray-500">{t('Tuman rivojlanish ko\'rsatkichlari', 'Показатели развития района')}</p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {adminData.statistics.map(stat => (
              <div key={stat.id} className="p-6 text-center transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1 group">
                <div className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300`}>
                  <i className={`fas fa-${stat.icon} text-3xl text-${stat.color}-600 group-hover:text-white transition-all duration-300`}></i>
                </div>
                <div className="mb-2 text-3xl font-bold text-primary">{stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}</div>
                <div className="text-sm text-gray-600">{t(stat.label, stat.labelRu)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="bg-white section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl gradient-text">{t('Tuman rahbariyati', 'Руководство района')}</h2>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {adminData.leadership.map(leader => (
              <div key={leader.id} className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                <img src={leader.image} alt={leader.name} className="object-cover w-full h-64" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{leader.name}</h3>
                  <p className="text-sm text-primary">{t(leader.position, leader.positionRu)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div><h2 className="text-3xl font-bold md:text-4xl gradient-text">{t('So\'nggi yangiliklar', 'Последние новости')}</h2><p className="mt-1 text-gray-500">{t('Eng muhim voqealar', 'Самые важные события')}</p></div>
            <Link to="/news" className="flex items-center gap-1 text-primary hover:underline">{t('Barchasi', 'Все')} <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminData.news.slice(0, 3).map((item, idx) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                <img src={item.image} alt={item.title} className="object-cover w-full h-56" />
                <div className="p-5">
                  <div className="mb-2 text-sm text-gray-500"><i className="mr-1 far fa-calendar-alt"></i> {item.date}</div>
                  <h3 className="mb-2 text-xl font-bold transition line-clamp-2 group-hover:text-primary">{t(item.title, item.titleRu)}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-3">{item.content?.slice(0, 100)}...</p>
                  <Link to={`/news/${item.id}`} className="inline-flex items-center gap-1 font-medium transition-all text-primary hover:gap-2">{t('Davomi', 'Подробнее')} <i className="text-xs fas fa-arrow-right"></i></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div><h2 className="text-3xl font-bold md:text-4xl gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h2><p className="mt-1 text-gray-500">{t('Sizga kerakli xizmatlar', 'Нужные вам услуги')}</p></div>
            <Link to="/services" className="flex items-center gap-1 text-primary hover:underline">{t('Barchasi', 'Все')} <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminData.services.slice(0, 6).map(service => (
              <div key={service.id} className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center transition-all duration-300 w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary group-hover:to-primaryDark">
                    <i className={`fas fa-${service.icon} text-2xl text-primary group-hover:text-white transition-all duration-300`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold transition group-hover:text-primary">{t(service.name, service.nameRu)}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <div className="mt-2 text-xs text-primary"><i className="mr-1 fas fa-building"></i> {service.department}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}