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
    { path: '/contact', label: 'Aloqa', labelRu: 'Контакты' }
  ];

  return (
    <>
      <div className="bg-primary text-white text-sm py-2">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-4">
            <a href="tel:+998653800000" className="hover:opacity-80"><i className="fas fa-phone-alt mr-1"></i> +998 65 380-00-00</a>
            <a href="mailto:info@jondor.uz" className="hover:opacity-80"><i className="fas fa-envelope mr-1"></i> info@jondor.uz</a>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setLang('uz')} className={`px-2 py-0.5 rounded text-xs font-bold ${lang === 'uz' ? 'bg-white text-primary' : 'bg-white/20'}`}>UZ</button>
            <button onClick={() => setLang('ru')} className={`px-2 py-0.5 rounded text-xs font-bold ${lang === 'ru' ? 'bg-white text-primary' : 'bg-white/20'}`}>RU</button>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"><i className="fas fa-landmark text-white text-lg"></i></div>
              <div><div className="font-bold text-primary text-sm">JONDOR TUMANI</div><div className="text-[10px] text-gray-500">{t('Rasmiy portal', 'Официальный портал')}</div></div>
            </Link>
            <nav className="hidden lg:flex gap-1">
              {navItems.map((item) => (<Link key={item.path} to={item.path} className={`px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>{t(item.label, item.labelRu)}</Link>))}
              <Link to="/admin/login"><button className="ml-2 px-3 py-2 bg-primary text-white rounded-lg text-sm"><i className="fas fa-user-shield mr-1"></i> Admin</button></Link>
            </nav>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 bg-primary rounded-lg text-white"><i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`}></i></button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="pt-20 p-4 flex flex-col gap-2">
              {navItems.map((item) => (<Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">{t(item.label, item.labelRu)}</Link>))}
              <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-primary text-white rounded-lg text-center">Admin panel</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}