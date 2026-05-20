import { useContext, useRef, useState, useEffect } from 'react';
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
  const { t, carousel, statistics, news, services, subscribe } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setCountersStarted(true);
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
    { path: '/services', icon: 'th-large', label: 'Xizmatlar', labelRu: 'Услуги', color: 'blue' },
    { path: '/news', icon: 'newspaper', label: 'Yangiliklar', labelRu: 'Новости', color: 'green' },
    { path: '/documents', icon: 'file-alt', label: 'Hujjatlar', labelRu: 'Документы', color: 'orange' },
    { path: '/media', icon: 'photo-video', label: 'Media', labelRu: 'Медиа', color: 'purple' },
    { path: '/organizations', icon: 'building', label: 'Tashkilotlar', labelRu: 'Организации', color: 'red' },
    { path: '/statistics', icon: 'chart-line', label: 'Statistika', labelRu: 'Статистика', color: 'teal' },
    { path: '/contact', icon: 'envelope', label: 'Aloqa', labelRu: 'Контакты', color: 'pink' },
    { path: '/about', icon: 'info-circle', label: "Tuman haqida", labelRu: "О районе", color: 'indigo' }
  ];

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]} effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation loop className="h-full">
          {carousel.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img src={slide.image} className="object-cover w-full h-full" alt={slide.title} />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 text-center text-white">
                    <h1 className="mb-4 text-3xl font-bold md:text-5xl">{t(slide.title, slide.titleRu)}</h1>
                    <p className="mb-6 text-base md:text-xl">{t('Jondor tumani rasmiy portali', 'Официальный портал Джондорского района')}</p>
                    <Link to="/services">
                      <button className="px-5 py-2 text-sm transition rounded-full md:px-6 md:py-3 bg-primary hover:bg-primary/90 md:text-base">
                        <i className="mr-2 fas fa-th-large"></i> {t('Xizmatlar', 'Услуги')}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Quick Links */}
      <div className="relative z-20 -mt-10 container-custom md:-mt-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8 md:gap-4">
          {quickLinks.map(link => (
            <Link key={link.path} to={link.path} className="p-2 text-center transition-all duration-300 bg-white shadow-lg group rounded-xl md:p-3 hover:shadow-2xl hover:-translate-y-2">
              <div className={`bg-${link.color}-100 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-1 md:mb-2 group-hover:scale-110 transition`}>
                <i className={`fas fa-${link.icon} text-${link.color}-600 text-base md:text-xl`}></i>
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-700 group-hover:text-primary">{t(link.label, link.labelRu)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Qabul jadvali */}
      <div className="py-12 bg-white md:py-16">
        <div className="container-custom">
          <div className="mb-8 text-center md:mb-10">
            <h2 className="text-2xl font-bold md:text-3xl gradient-text">{t('Qabul jadvali', 'График приема')}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid max-w-4xl gap-5 mx-auto md:grid-cols-2">
            <div className="p-5 shadow bg-gradient-to-r from-blue-50 to-white rounded-xl">
              <div className="flex items-center gap-3 mb-3"><i className="text-2xl fas fa-user-tie text-primary"></i><h3 className="text-lg font-bold">{t('Tuman hokimi', 'Хоким района')}</h3></div>
              <p className="text-sm text-gray-600"><i className="w-5 fas fa-calendar-alt text-primary"></i> {t('Dushanba - Juma', 'Понедельник - Пятница')}</p>
              <p className="text-sm text-gray-600"><i className="w-5 fas fa-clock text-primary"></i> 15:00 - 17:00</p>
            </div>
            <div className="p-5 shadow bg-gradient-to-r from-green-50 to-white rounded-xl">
              <div className="flex items-center gap-3 mb-3"><i className="text-2xl fas fa-users text-primary"></i><h3 className="text-lg font-bold">{t('Fuqarolar qabuli', 'Прием граждан')}</h3></div>
              <p className="text-sm text-gray-600"><i className="w-5 fas fa-calendar-alt text-primary"></i> {t('Har payshanba', 'Каждый четверг')}</p>
              <p className="text-sm text-gray-600"><i className="w-5 fas fa-clock text-primary"></i> 10:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistika */}
      <div ref={statsRef} className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8 text-center md:mb-10">
            <h2 className="text-2xl font-bold md:text-3xl gradient-text">{t('Statistik ma\'lumotlar', 'Статистические данные')}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {statistics.map(stat => (
              <div key={stat.id} className="p-4 text-center transition bg-white shadow rounded-xl md:p-6 hover:shadow-lg">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <i className={`fas fa-${stat.icon} text-xl md:text-2xl text-${stat.color}-600`}></i>
                </div>
                <div className="text-xl font-bold md:text-3xl text-primary">{countersStarted && <CountUp end={stat.value} duration={2.5} />}</div>
                <div className="mt-1 text-xs text-gray-600 md:text-sm">{t(stat.label, stat.labelRu)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yangiliklar */}
      <div className="py-12 bg-white md:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl font-bold md:text-3xl gradient-text">{t('So\'nggi yangiliklar', 'Последние новости')}</h2>
            <Link to="/news" className="text-sm text-primary hover:underline">{t('Barchasi', 'Все')} →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map(item => (
              <Link key={item.id} to={`/news/${item.id}`} className="overflow-hidden transition bg-white shadow rounded-xl hover:shadow-xl hover:-translate-y-1">
                <img src={item.image} className="object-cover w-full h-44 md:h-52" alt={item.title} />
                <div className="p-4">
                  <p className="mb-2 text-xs text-gray-500"><i className="mr-1 far fa-calendar-alt"></i> {item.date}</p>
                  <h3 className="text-base font-bold line-clamp-2">{t(item.title, item.titleRu)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Xizmatlar */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl font-bold md:text-3xl gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h2>
            <Link to="/services" className="text-sm text-primary hover:underline">{t('Barchasi', 'Все')} →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map(service => (
              <div key={service.id} className="p-4 transition bg-white shadow rounded-xl hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl"><i className={`fas fa-${service.icon} text-primary text-lg`}></i></div>
                  <div><h3 className="text-sm font-bold md:text-base">{t(service.name, service.nameRu)}</h3><p className="mt-1 text-xs text-gray-600">{service.description}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Obuna */}
      <div className="py-12 text-white md:py-16 bg-gradient-to-r from-primary to-primaryDark">
        <div className="text-center container-custom">
          <i className="mb-3 text-3xl fas fa-bell md:text-4xl"></i>
          <h2 className="mb-2 text-xl font-bold md:text-2xl">{t('Yangiliklardan xabardor bo\'ling', 'Будьте в курсе новостей')}</h2>
          <p className="mb-5 text-sm text-white/80">{t('Obuna bo\'ling va eng so\'nggi yangiliklardan birinchi bo\'lib xabar toping', 'Подпишитесь и узнавайте о последних новостях первыми')}</p>
          <form onSubmit={handleSubscribe} className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row">
            <input type="email" placeholder={t('Email manzilingiz', 'Ваш email')} className="flex-1 px-4 py-2 text-sm text-gray-800 rounded-xl focus:outline-none" value={subscriberEmail} onChange={(e) => setSubscriberEmail(e.target.value)} required />
            <button type="submit" className="px-5 py-2 text-sm font-bold transition bg-white text-primary rounded-xl hover:scale-105">
              <i className="mr-2 fas fa-bell"></i> {t('Obuna bo\'lish', 'Подписаться')}
            </button>
          </form>
          {subscribed && <p className="mt-3 text-sm text-green-300 animate-pulse">✓ {t('Obuna bo\'ldingiz!', 'Вы подписались!')}</p>}
        </div>
      </div>
    </div>
  );
}