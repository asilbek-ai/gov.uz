import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { AppContext } from '../App';
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
    { path: '/services', icon: 'th-large', label: 'Xizmatlar', labelRu: 'Услуги', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
    { path: '/news', icon: 'newspaper', label: 'Yangiliklar', labelRu: 'Новости', color: 'green', bg: 'bg-green-50', text: 'text-green-600' },
    { path: '/documents', icon: 'file-alt', label: 'Hujjatlar', labelRu: 'Документы', color: 'orange', bg: 'bg-orange-50', text: 'text-orange-600' },
    { path: '/media', icon: 'photo-video', label: 'Media', labelRu: 'Медиа', color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
    { path: '/organizations', icon: 'building', label: 'Tashkilotlar', labelRu: 'Организации', color: 'red', bg: 'bg-red-50', text: 'text-red-600' },
    { path: '/statistics', icon: 'chart-line', label: 'Statistika', labelRu: 'Статистика', color: 'teal', bg: 'bg-teal-50', text: 'text-teal-600' },
    { path: '/contact', icon: 'envelope', label: 'Aloqa', labelRu: 'Контакты', color: 'pink', bg: 'bg-pink-50', text: 'text-pink-600' },
    { path: '/about', icon: 'info-circle', label: 'Tuman haqida', labelRu: 'О районе', color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-600' }
  ];

  const features = [
    { icon: 'fas fa-user-check', title: t('Tez xizmat ko\'rsatish', 'Быстрое обслуживание'), desc: t('30 daqiqada javob', 'Ответ за 30 минут') },
    { icon: 'fas fa-shield-alt', title: t('Ishonchli tizim', 'Надежная система'), desc: t('Ma\'lumotlar himoyasi', 'Защита данных') },
    { icon: 'fas fa-mobile-alt', title: t('Mobil qulaylik', 'Мобильное удобство'), desc: t('Har qanday qurilmadan', 'С любого устройства') },
    { icon: 'fas fa-headset', title: t('24/7 Yordam', 'Круглосуточная помощь'), desc: t('Doimiy online qo\'llab-quvvatlash', 'Постоянная поддержка') }
  ];

  const receptionHours = {
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00', phoneRu: '+998 65 380-00-00' }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider */}
      <div className="relative h-[550px] md:h-[650px] overflow-hidden">
        <Swiper 
          modules={[Autoplay, Pagination, Navigation, EffectFade]} 
          effect="fade" 
          autoplay={{ delay: 5000, disableOnInteraction: false }} 
          pagination={{ clickable: true }} 
          navigation 
          loop 
          className="h-full"
        >
          {adminData.carousel.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fadeInUp">
                      {t(slide.title, slide.titleRu)}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-white/90">
                      {t('Jondor tumani rasmiy portali', 'Официальный портал Джондорского района')}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link to="/services">
                        <button className="px-6 py-3 bg-primary rounded-full hover:bg-primary/90 transition-all hover:scale-105 font-semibold">
                          <i className="fas fa-th-large mr-2"></i> {t('Xizmatlar', 'Услуги')}
                        </button>
                      </Link>
                      <Link to="/contact">
                        <button className="px-6 py-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all hover:scale-105 font-semibold border border-white/30">
                          <i className="fas fa-paper-plane mr-2"></i> {t('Murojaat qilish', 'Связаться')}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container-custom -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="group bg-white rounded-xl p-3 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${link.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition duration-300`}>
                <i className={`fas fa-${link.icon} ${link.text} text-xl`}></i>
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-primary transition">
                {t(link.label, link.labelRu)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              {t('Nima uchun biz?', 'Почему мы?')}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('Bizning afzalliklarimiz', 'Наши преимущества')}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                  <i className={`${feature.icon} text-2xl text-primary group-hover:text-white transition-all duration-300`}></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div ref={statsRef} className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              {t('Statistik ma\'lumotlar', 'Статистические данные')}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('Tuman rivojlanish ko\'rsatkichlari', 'Показатели развития района')}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {adminData.statistics.map(stat => (
              <div key={stat.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`fas fa-${stat.icon} text-2xl text-${stat.color}-600`}></i>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm">{t(stat.label, stat.labelRu)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reception Hours Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              {t('Qabul jadvali', 'График приема')}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('Rahbariyatning fuqarolar bilan uchrashuv vaqtlari', 'Время приема граждан руководством')}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-tie text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Tuman hokimi qabuli', 'Прием хокима района')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-primary"></i> {t(receptionHours.governor.days, receptionHours.governor.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-primary"></i> {receptionHours.governor.time}</p>
                <p className="text-gray-600"><i className="fas fa-map-marker-alt w-6 text-primary"></i> {t(receptionHours.governor.location, receptionHours.governor.locationRu)}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-users text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Fuqarolar qabuli', 'Прием граждан')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-primary"></i> {t(receptionHours.citizens.days, receptionHours.citizens.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-primary"></i> {receptionHours.citizens.time}</p>
                <p className="text-gray-600"><i className="fas fa-phone-alt w-6 text-primary"></i> {receptionHours.citizens.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {t('So\'nggi yangiliklar', 'Последние новости')}
              </h2>
              <p className="text-gray-500">{t('Eng muhim voqealar', 'Самые важные события')}</p>
            </div>
            <Link to="/news" className="text-primary hover:underline flex items-center gap-1 group">
              {t('Barchasi', 'Все')} <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminData.news.slice(0, 3).map((item, idx) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={item.title} />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    <i className="far fa-calendar-alt mr-1"></i> {item.date}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition">
                    {t(item.title, item.titleRu)}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.content?.slice(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500"><i className="far fa-eye mr-1"></i> {item.views} {t('ko\'rildi', 'просмотров')}</span>
                    <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('Davomi', 'Подробнее')} <i className="fas fa-arrow-right text-xs"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Services Preview Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {t('Davlat xizmatlari', 'Государственные услуги')}
              </h2>
              <p className="text-gray-500">{t('Sizga kerakli xizmatlar', 'Нужные вам услуги')}</p>
            </div>
            <Link to="/services" className="text-primary hover:underline flex items-center gap-1 group">
              {t('Barchasi', 'Все')} <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminData.services.slice(0, 3).map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                    <i className={`fas fa-${service.icon} text-2xl text-primary`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{t(service.name, service.nameRu)}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <div className="mt-2 text-xs text-primary">
                      <i className="fas fa-building mr-1"></i> {service.department}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-20 bg-gradient-to-r from-primary to-primaryDark text-white">
        <div className="container-custom text-center">
          <i className="fas fa-bell text-5xl mb-4 animate-pulse"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('Yangiliklardan xabardor bo\'ling', 'Будьте в курсе новостей')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('Obuna bo\'ling va eng so\'nggi yangiliklardan birinchi bo\'lib xabar toping', 
               'Подпишитесь и узнавайте о последних новостях первыми')}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
              className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-bell"></i> {t('Obuna bo\'lish', 'Подписаться')}
            </button>
          </form>
          {subscribed && (
            <div className="mt-4 text-green-300 animate-fadeInUp">
              <i className="fas fa-check-circle mr-2"></i> {t('Obuna bo\'ldingiz!', 'Вы подписались!')}
            </div>
          )}
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              {t('Hamkorlarimiz', 'Наши партнеры')}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="bg-white rounded-xl p-4 shadow-md w-32 h-20 flex items-center justify-center">
              <i className="fas fa-building text-3xl text-gray-400"></i>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md w-32 h-20 flex items-center justify-center">
              <i className="fas fa-university text-3xl text-gray-400"></i>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md w-32 h-20 flex items-center justify-center">
              <i className="fas fa-chart-line text-3xl text-gray-400"></i>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md w-32 h-20 flex items-center justify-center">
              <i className="fas fa-globe text-3xl text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}