import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';

export default function Navbar() {
  const { t, lang, setLang } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.includes('/admin')) return null;

  // Asosiy linklar (qisqartirilgan)
  const navItems = [
    { path: '/', label: 'Bosh', labelRu: 'Главная', icon: 'fa-home' },
    { path: '/about', label: 'Tuman', labelRu: 'Район', icon: 'fa-info-circle' },
    { path: '/services', label: 'Xizmatlar', labelRu: 'Услуги', icon: 'fa-th-large' },
    { path: '/news', label: 'Yangiliklar', labelRu: 'Новости', icon: 'fa-newspaper' },
    { path: '/documents', label: 'Hujjatlar', labelRu: 'Документы', icon: 'fa-file-alt' },
    { path: '/statistics', label: 'Statistika', labelRu: 'Статистика', icon: 'fa-chart-line' },
  ];

  // Qo'shimcha linklar (dropdown yoki yon tomonda)
  const extraItems = [
    { path: '/media', label: 'Media', labelRu: 'Медиа', icon: 'fa-photo-video' },
    { path: '/dashboard', label: 'Dashboard', labelRu: 'Дашборд', icon: 'fa-tachometer-alt' },
    { path: '/organizations', label: 'Tashkilotlar', labelRu: 'Организации', icon: 'fa-building' },
  ];

  const animationVariants = {
    container: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } } },
    item: { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } },
    mobileMenu: {
      hidden: { x: '100%', opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
      exit: { x: '100%', opacity: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
    },
    mobileItem: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } }
  };

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="bg-gradient-to-r from-[#003580] via-[#004a99] to-[#0066cc] text-white text-sm py-2 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2 relative z-10 text-white">
          <div className="flex gap-6">
            <motion.a href="tel:+998653800000" className="flex items-center gap-2 hover:text-[#00b4d8] transition group" whileHover={{ scale: 1.05 }}>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><i className="fas fa-phone-alt text-xs"></i></div>
              <span>+998 65 380-00-00</span>
            </motion.a>
            <motion.a href="mailto:info@jondor.uz" className="flex items-center gap-2 hover:text-[#00b4d8] transition group" whileHover={{ scale: 1.05 }}>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><i className="fas fa-envelope text-xs"></i></div>
              <span>info@jondor.uz</span>
            </motion.a>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full" whileHover={{ scale: 1.05 }}>
              <i className="fas fa-calendar-alt text-xs"></i>
              <span className="text-xs">{new Date().toLocaleDateString('uz-UZ')}</span>
            </motion.div>
            <div className="flex gap-1">
              {['uz', 'ru'].map(l => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    lang === l ? 'bg-white text-[#003580] shadow-md' : 'bg-white/20 hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {l.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' : 'bg-white shadow-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <i className="fas fa-landmark text-white text-xl"></i>
              </motion.div>
              <div>
                <div className="font-bold text-[#003580] text-sm md:text-base">JONDOR TUMANI</div>
                <div className="text-[10px] text-gray-500">{t('Rasmiy portal', 'Официальный портал')}</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              variants={animationVariants.container}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map((item, idx) => (
                <motion.div key={item.path} variants={animationVariants.item} onHoverStart={() => setHoveredItem(idx)} onHoverEnd={() => setHoveredItem(null)}>
                  <Link to={item.path} className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    location.pathname === item.path ? 'text-[#003580] bg-gradient-to-r from-[#003580]/10 to-[#0066cc]/10' : 'text-gray-600 hover:text-[#003580] hover:bg-gray-50'
                  }`}>
                    <motion.i className={`fas ${item.icon} text-xs`} animate={{ rotate: hoveredItem === idx ? [0, 10, -10, 0] : 0 }} />
                    <span>{t(item.label, item.labelRu)}</span>
                    {location.pathname === item.path && (
                      <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003580] to-[#0066cc] rounded-full" layoutId="activeNav" />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Qo'shimcha linklar dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#003580] hover:bg-gray-50 flex items-center gap-2">
                  <i className="fas fa-ellipsis-h text-xs"></i>
                  <span>Ko'proq</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {extraItems.map(item => (
                    <Link key={item.path} to={item.path} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#003580] transition">
                      <i className={`fas ${item.icon} w-5`}></i>
                      <span>{t(item.label, item.labelRu)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile AI - alohida button */}
              <motion.div variants={animationVariants.item}>
                <Link to="/mobile-info" className="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105">
                  <i className="fas fa-mobile-alt text-xs"></i>
                  <i className="fas fa-robot text-xs"></i>
                  <span className="hidden xl:inline">AI</span>
                </Link>
              </motion.div>

              {/* Aloqa */}
              <motion.div variants={animationVariants.item}>
                <Link to="/contact" className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  location.pathname === '/contact' ? 'text-[#003580] bg-gradient-to-r from-[#003580]/10 to-[#0066cc]/10' : 'text-gray-600 hover:text-[#003580] hover:bg-gray-50'
                }`}>
                  <i className="fas fa-envelope text-xs"></i>
                  <span>{t('Aloqa', 'Контакты')}</span>
                </Link>
              </motion.div>
            </motion.nav>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* <motion.button className="p-2 rounded-xl text-gray-600 hover:bg-gray-100" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <i className="fas fa-search text-lg"></i>
              </motion.button> */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 bg-gradient-to-r from-[#003580] to-[#0066cc] rounded-xl flex items-center justify-center text-white shadow-md"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: mobileOpen ? 90 : 0 }}
              >
                <i className={`fas fa-${mobileOpen ? 'times' : 'bars'} text-lg`}></i>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div variants={animationVariants.mobileMenu} initial="hidden" animate="visible" exit="exit" className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
              <div className="bg-gradient-to-r from-[#003580] to-[#0066cc] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><i className="fas fa-landmark text-white text-lg"></i></div>
                    <div><div className="text-white font-bold text-sm">JONDOR TUMANI</div><div className="text-white/70 text-xs">{t('Rasmiy portal', 'Официальный портал')}</div></div>
                  </div>
                  <motion.button onClick={() => setMobileOpen(false)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white" whileHover={{ scale: 1.1, rotate: 90 }}>
                    <i className="fas fa-times"></i>
                  </motion.button>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {[...navItems, ...extraItems].map((item, idx) => (
                  <motion.div key={item.path} variants={animationVariants.mobileItem}>
                    <Link to={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === item.path ? 'bg-gradient-to-r from-[#003580]/10 to-[#0066cc]/10 text-[#003580] font-semibold' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        location.pathname === item.path ? 'bg-gradient-to-r from-[#003580] to-[#0066cc] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <i className={`fas ${item.icon} text-sm`}></i>
                      </div>
                      <span className="flex-1">{t(item.label, item.labelRu)}</span>
                      {location.pathname === item.path && <i className="fas fa-chevron-right text-[#003580]"></i>}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile AI - mobil menyuda */}
                <motion.div variants={animationVariants.mobileItem}>
                  <Link to="/mobile-info" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><i className="fas fa-mobile-alt text-sm"></i></div>
                    <span className="flex-1">📱 Mobile AI</span>
                    <i className="fas fa-robot"></i>
                  </Link>
                </motion.div>
                {/* Aloqa */}
                <motion.div variants={animationVariants.mobileItem}>
                  <Link to="/contact" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === '/contact' ? 'bg-gradient-to-r from-[#003580]/10 to-[#0066cc]/10 text-[#003580] font-semibold' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><i className="fas fa-envelope text-sm text-gray-500"></i></div>
                    <span className="flex-1">{t('Aloqa', 'Контакты')}</span>
                  </Link>
                </motion.div>
              </div>

              <div className="border-t p-4 mt-4">
                <div className="flex justify-center gap-4">
                  {['telegram', 'facebook', 'instagram', 'youtube'].map((social, i) => (
                    <motion.a key={social} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#003580] hover:text-white transition" whileHover={{ scale: 1.1, y: -3 }}>
                      <i className={`fab fa-${social} text-sm`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}