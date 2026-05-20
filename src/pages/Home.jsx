// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';
import ScrollToTop from '../components/ScrollToTop';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } }
};

export default function Home() {
  const [statistics, setStatistics] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [countersStarted, setCountersStarted] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          statsRes, newsRes, servicesRes, leadershipRes, 
          projectsRes, vacanciesRes, testimonialsRes, galleryRes, 
          quickLinksRes, announcementsRes, faqsRes, partnersRes
        ] = await Promise.all([
          api.get('/statistics').catch(() => ({ data: [] })),
          api.get('/news').catch(() => ({ data: [] })),
          api.get('/services').catch(() => ({ data: [] })),
          api.get('/leadership').catch(() => ({ data: [] })),
          api.get('/projects').catch(() => ({ data: [] })),
          api.get('/vacancies').catch(() => ({ data: [] })),
          api.get('/testimonials').catch(() => ({ data: [] })),
          api.get('/gallery').catch(() => ({ data: [] })),
          api.get('/quickLinks').catch(() => ({ data: [] })),
          api.get('/announcements').catch(() => ({ data: [] })),
          api.get('/faqs').catch(() => ({ data: [] })),
          api.get('/partners').catch(() => ({ data: [] }))
        ]);
        
        setStatistics(statsRes.data || []);
        setNews((newsRes.data || []).slice(0, 6));
        setServices((servicesRes.data || []).slice(0, 6));
        setLeadership(leadershipRes.data || []);
        setProjects(projectsRes.data || []);
        setVacancies((vacanciesRes.data || []).slice(0, 4));
        setTestimonials(testimonialsRes.data || []);
        setGallery(galleryRes.data || []);
        setQuickLinks(quickLinksRes.data || []);
        setAnnouncements(announcementsRes.data || []);
        setFaqs((faqsRes.data || []).slice(0, 4));
        setPartners(partnersRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Counter observer
  useEffect(() => {
    if (isStatsInView && !countersStarted) {
      setCountersStarted(true);
    }
  }, [isStatsInView, countersStarted]);

  // Testimonial auto-slide
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', contactForm);
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setContactSubmitted(false), 5000);
    } catch (error) {
      console.error('Contact error:', error);
      alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!countersStarted) return;
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration, countersStarted]);
    return <span className="text-4xl font-extrabold md:text-5xl text-primary">{count.toLocaleString()}</span>;
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      teal: 'from-teal-500 to-teal-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color] || 'from-primary to-primaryDark';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
          <p className="text-gray-500">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Header />
      <HeroSlider />

      {/* Rotating Image Banner - Statistics tepasida */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-12 overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
      >
        <div className="container-max lg:mt-20">
          <div className="relative overflow-hidden shadow-2xl rounded-2xl">
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
              <motion.img
                src="https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600"
                alt="Jondor tumani"
                className="absolute inset-0 object-cover w-full h-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h2 
                  className="mb-2 text-3xl font-bold md:text-5xl"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Jondor tumani
                </motion.h2>
                <motion.p 
                  className="text-lg text-white/90"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Buxoro viloyatining durdonasi
                </motion.p>
              </div>
            </div>
            {/* Decorative rotating elements */}
            <div className="absolute w-16 h-16 border-2 rounded-full top-4 right-4 border-white/30 animate-spin-slow" />
            <div className="absolute w-10 h-10 border-2 rounded-full bottom-4 left-4 border-white/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.section 
        className="relative z-30 -mt-16 container-max"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((item, i) => (
            <motion.div key={item.id} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Link
                to={item.link}
                className="block p-5 text-center transition-all duration-300 bg-white shadow-xl group rounded-2xl hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${getColorClass(item.color)} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition duration-300 shadow-lg`}>
                  <i className={`fas fa-${item.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 transition group-hover:text-primary">{item.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Announcements Ticker */}
      {announcements.length > 0 && (
        <section className="mt-12">
          <div className="py-3 overflow-hidden border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 border-y">
            <div className="container-max">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full shadow-md animate-pulse">
                  <i className="fas fa-bullhorn"></i>
                  <span className="text-sm font-bold">E'LON</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap">
                    {announcements.map((ann) => (
                      <span key={ann.id} className="mx-6">
                        {ann.urgent && <span className="mr-2 font-bold text-red-500">⚠️</span>}
                        📢 {ann.title}
                        <span className="ml-2 text-sm text-gray-400">{new Date(ann.date).toLocaleDateString('uz-UZ')}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <motion.section 
        ref={statsRef}
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-max">
          <div className="mb-12 text-center">
            <motion.h2 
              className="mb-3 text-3xl font-bold md:text-4xl gradient-text"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Statistik ma'lumotlar
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-gray-500"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Tuman rivojlanish ko'rsatkichlari
            </motion.p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {statistics.map((stat, idx) => (
              <motion.div
                key={stat.id}
                className="p-6 text-center transition-all duration-300 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl hover:shadow-lg hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-all duration-300 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110">
                  <i className={`fas fa-${stat.icon} text-3xl text-primary group-hover:text-white transition-all duration-300`}></i>
                </div>
                <div className="mb-2">
                  {stat.prefix}
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/statistics" className="inline-flex items-center gap-1 transition-all text-primary hover:underline hover:gap-2">
              Batafsil statistika <i className="text-xs fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">Tuman rahbariyati</h2>
            <p className="max-w-2xl mx-auto text-gray-500">Xalq uchun xizmat qilayotgan yetakchilar</p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {leadership.map((leader, idx) => (
              <motion.div
                key={leader.id}
                className="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="object-cover w-full h-full transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-end justify-center pb-4 transition duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100">
                    <div className="flex gap-3">
                      <a href={`tel:${leader.phone}`} className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full hover:bg-primary hover:text-white">
                        <i className="fas fa-phone"></i>
                      </a>
                      <a href={`mailto:${leader.email}`} className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full hover:bg-primary hover:text-white">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold">{leader.name}</h3>
                  <p className="mb-2 text-sm text-primary">{leader.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">Davlat xizmatlari</h2>
              <p className="text-gray-500">Sizga kerakli xizmatlar</p>
            </div>
            <Link to="/services" className="flex items-center gap-1 transition-all text-primary hover:underline hover:gap-2">
              Barchasi <i className="text-xs fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/services/${service.id}`} className="block p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center transition-all duration-300 w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary group-hover:to-primaryDark">
                      <i className={`fas fa-${service.icon || 'gear'} text-2xl text-primary group-hover:text-white transition-all duration-300`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold transition group-hover:text-primary">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-primary">
                        <i className="fas fa-building"></i>
                        <span>{service.department || "Tuman hokimligi"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">So'nggi yangiliklar</h2>
              <p className="text-gray-500">Eng muhim voqealar</p>
            </div>
            <Link to="/news" className="flex items-center gap-1 transition-all text-primary hover:underline hover:gap-2">
              Barchasi <i className="text-xs fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/news/${item.id}`} className="block overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full transition duration-500 group-hover:scale-110" />
                    )}
                    <div className="absolute px-3 py-1 text-xs text-white rounded-full top-4 left-4 bg-primary">
                      <i className="mr-1 far fa-calendar-alt"></i> {new Date(item.date).toLocaleDateString('uz-UZ')}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold transition line-clamp-2 group-hover:text-primary">{item.title}</h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">{item.summary || item.content?.slice(0, 100)}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium transition-all text-primary group-hover:gap-2">
                      Davomi <i className="text-xs fas fa-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Media Gallery Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">Media galereya</h2>
              <p className="text-gray-500">Rasmlar orqali tumanga sayohat</p>
            </div>
            <Link to="/media" className="flex items-center gap-1 transition-all text-primary hover:underline hover:gap-2">
              Barchasi <i className="text-xs fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gallery.slice(0, 8).map((item, idx) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden transition-all duration-300 shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl"
                onClick={() => setSelectedMedia(item)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={item.image} alt={item.title} className="object-cover w-full h-64 transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 transition duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.category}</p>
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 transition duration-300 rounded-full opacity-0 top-4 right-4 bg-white/20 backdrop-blur group-hover:opacity-100">
                  <i className="text-white fas fa-search-plus"></i>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container-max">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">Fuqarolar fikri</h2>
              <p className="max-w-2xl mx-auto text-gray-500">Xalqimizning samimiy fikrlari</p>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
                      <div className="p-8 text-center bg-white shadow-lg rounded-2xl">
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <i key={i} className="text-lg text-yellow-400 fas fa-star"></i>
                          ))}
                        </div>
                        <p className="mb-6 text-lg italic text-gray-700">"{testimonial.text}"</p>
                        <div className="flex items-center justify-center gap-4">
                          <img src={testimonial.image} alt={testimonial.name} className="object-cover border-2 rounded-full w-14 h-14 border-primary" />
                          <div className="text-left">
                            <div className="text-lg font-bold">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.position}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <motion.section 
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container-max">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">Ko'p so'raladigan savollar</h2>
                <p className="mb-8 text-gray-500">Sizni qiziqtirgan savollarga javoblar</p>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      className="overflow-hidden shadow-md bg-gray-50 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: faq.id * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                        className="flex items-center justify-between w-full p-5 font-medium text-left transition hover:bg-gray-100"
                      >
                        <span className="text-lg">{faq.question}</span>
                        <i className={`fas fa-chevron-${activeFaq === faq.id ? 'up' : 'down'} text-primary transition-transform duration-300`}></i>
                      </button>
                      {activeFaq === faq.id && (
                        <div className="p-5 text-gray-600 bg-white border-t">
                          {faq.answer}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="p-8 text-white bg-gradient-to-br from-primary to-primaryDark rounded-2xl">
                  <h3 className="mb-4 text-2xl font-bold">Yordam kerakmi?</h3>
                  <p className="mb-6 opacity-90">Savolingiz bo'lsa, biz bilan bog'laning</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>+998 65 123-45-67</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>info@jondor.uz</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>Dushanba-Juma: 09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <motion.section 
          className="py-16 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container-max">
            <h2 className="mb-10 text-3xl font-bold text-center md:text-4xl gradient-text">Hamkorlarimiz</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((partner, idx) => (
                <motion.a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center h-20 bg-white shadow-md w-36 rounded-xl">
                    <i className={`fas fa-${partner.icon} text-gray-400 text-3xl`}></i>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">{partner.name}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Contact & Map Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">Biz bilan bog'laning</h2>
              <p className="mb-6 text-gray-500">Savol va takliflaringizni yuboring</p>
              <div className="p-6 shadow-lg bg-gray-50 rounded-2xl">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Ism familiya *</label>
                      <input 
                        type="text" 
                        placeholder="Ism familiya" 
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} 
                        className="w-full px-4 py-3 transition-all border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Email *</label>
                      <input 
                        type="email" 
                        placeholder="Email" 
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} 
                        className="w-full px-4 py-3 transition-all border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Telefon</label>
                    <input 
                      type="tel" 
                      placeholder="Telefon" 
                      value={contactForm.phone} 
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} 
                      className="w-full px-4 py-3 transition-all border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Xabar *</label>
                    <textarea 
                      rows="4" 
                      placeholder="Xabar matni" 
                      value={contactForm.message} 
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} 
                      className="w-full px-4 py-3 transition-all border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primaryDark rounded-xl hover:shadow-lg hover:scale-105">
                    <i className="fas fa-paper-plane"></i> Yuborish
                  </button>
                  {contactSubmitted && (
                    <div className="p-3 text-center text-green-600 bg-green-50 rounded-xl animate-fadeInUp">
                      ✓ Xabaringiz qabul qilindi! Tez orada javob beramiz.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">Xarita</h2>
              <p className="mb-6 text-gray-500">Jondor tumani geografik joylashuvi</p>
              <div className="overflow-hidden shadow-xl rounded-2xl h-96">
                <iframe
                  title="Jondor map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Jondor+District+Bukhara+Region+Uzbekistan"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
      <ScrollToTop />

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              className="w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full max-h-[80vh] object-contain bg-gray-900" />
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
                  <p className="text-sm text-gray-500">{selectedMedia.category}</p>
                </div>
                <button onClick={() => setSelectedMedia(null)} className="px-6 py-2 transition-all duration-300 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white">
                  <i className="mr-1 fas fa-times"></i> Yopish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .gradient-text {
          background: linear-gradient(135deg, #003580 0%, #0066cc 50%, #00b4d8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}