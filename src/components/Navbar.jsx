import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

export default function Navbar() {
  const { t, lang, setLang } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.includes('/admin')) return null;

  const navItems = [
    { path: '/', label: 'Bosh sahifa', labelRu: 'Главная' },
    { path: '/about', label: 'Tuman haqida', labelRu: 'О районе' },
    { path: '/services', label: 'Xizmatlar', labelRu: 'Услуги' },
    { path: '/news', label: 'Yangiliklar', labelRu: 'Новости' },
    { path: '/documents', label: 'Hujjatlar', labelRu: 'Документы' },
    { path: '/media', label: 'Media', labelRu: 'Медиа' },
    { path: '/organizations', label: 'Tashkilotlar', labelRu: 'Организации' },
    { path: '/contact', label: 'Aloqa', labelRu: 'Контакты' }
  ];

  return (
    <>
      <div className="py-2 text-xs text-white bg-primary">
        <div className="flex flex-wrap items-center justify-between gap-2 container-custom">
          <div className="flex items-center gap-3">
            <a href="tel:+998653800000" className="transition hover:text-accent"><i className="mr-1 fas fa-phone-alt"></i> +998 65 380-00-00</a>
            <a href="mailto:info@jondor.uz" className="transition hover:text-accent"><i className="mr-1 fas fa-envelope"></i> info@jondor.uz</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button onClick={() => setLang('uz')} className={`px-2 py-0.5 rounded text-xs font-bold transition ${lang === 'uz' ? 'bg-white text-primary' : 'bg-white/20'}`}>UZ</button>
              <button onClick={() => setLang('ru')} className={`px-2 py-0.5 rounded text-xs font-bold transition ${lang === 'ru' ? 'bg-white text-primary' : 'bg-white/20'}`}>RU</button>
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary"><i className="text-sm text-white fas fa-landmark"></i></div>
              <div><div className="text-xs font-bold text-primary">JONDOR TUMANI</div><div className="text-[8px] text-gray-500">{t('Rasmiy portal', 'Официальный портал')}</div></div>
            </Link>
            <nav className="items-center hidden gap-1 lg:flex">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className={`px-2 py-1 rounded text-xs font-medium transition ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {t(item.label, item.labelRu)}
                </Link>
              ))}
              <Link to="/admin"><button className="px-2 py-1 ml-1 text-xs font-medium text-white transition rounded bg-primary hover:bg-primary/90"><i className="mr-1 fas fa-user-shield"></i> {t('Admin', 'Админ')}</button></Link>
            </nav>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-xs text-white rounded-lg lg:hidden w-7 h-7 bg-primary"><i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`}></i></button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 bottom-0 right-0 w-56 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-1 p-3 pt-16">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100">{t(item.label, item.labelRu)}</Link>
              ))}
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2 mt-2 text-sm text-center text-white rounded bg-primary">{t('Admin panel', 'Админ панель')}</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}