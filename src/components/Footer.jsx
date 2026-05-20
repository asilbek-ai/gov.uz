import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../App';

export default function Footer() {
  const { t } = useContext(AppContext);
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  if (location.pathname.includes('/admin')) return null;

  return (
    <footer className="pt-8 pb-4 mt-10 text-gray-400 bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary"><i className="text-sm text-white fas fa-landmark"></i></div>
              <div><div className="text-xs font-bold text-white">JONDOR TUMANI</div><div className="text-[8px] text-gray-500">{t('Rasmiy portal', 'Официальный портал')}</div></div>
            </div>
            <p className="text-xs text-gray-500">{t('Buxoro viloyati Jondor tumani hokimligi rasmiy veb-sayti', 'Официальный сайт хокимията Джондорского района')}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">{t('Menyu', 'Меню')}</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="text-xs text-gray-500 hover:text-primary">🏠 {t('Bosh sahifa', 'Главная')}</Link></li>
              <li><Link to="/about" className="text-xs text-gray-500 hover:text-primary">📖 {t('Tuman haqida', 'О районе')}</Link></li>
              <li><Link to="/services" className="text-xs text-gray-500 hover:text-primary">⚙️ {t('Xizmatlar', 'Услуги')}</Link></li>
              <li><Link to="/contact" className="text-xs text-gray-500 hover:text-primary">📞 {t('Aloqa', 'Контакты')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">{t('Foydali havolalar', 'Полезные ссылки')}</h4>
            <ul className="space-y-1">
              <li><a href="https://gov.uz" target="_blank" className="text-xs text-gray-500 hover:text-primary">Gov.uz</a></li>
              <li><a href="https://my.gov.uz" target="_blank" className="text-xs text-gray-500 hover:text-primary">My.gov.uz</a></li>
              <li><a href="https://buxoro.uz" target="_blank" className="text-xs text-gray-500 hover:text-primary">Buxoro.uz</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">{t('Bog\'lanish', 'Контакты')}</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs"><i className="w-4 fas fa-map-marker-alt text-primary"></i> Jondor tumani</li>
              <li className="flex items-center gap-2 text-xs"><i className="w-4 fas fa-phone-alt text-primary"></i> +998 65 380-00-00</li>
              <li className="flex items-center gap-2 text-xs"><i className="w-4 fas fa-envelope text-primary"></i> info@jondor.uz</li>
            </ul>
            <div className="flex gap-3 mt-3">
              <a href="#" className="flex items-center justify-center transition bg-gray-800 rounded-full w-7 h-7 hover:bg-primary"><i className="text-xs text-white fab fa-telegram"></i></a>
              <a href="#" className="flex items-center justify-center transition bg-gray-800 rounded-full w-7 h-7 hover:bg-primary"><i className="text-xs text-white fab fa-facebook-f"></i></a>
              <a href="#" className="flex items-center justify-center transition bg-gray-800 rounded-full w-7 h-7 hover:bg-primary"><i className="text-xs text-white fab fa-instagram"></i></a>
              <a href="#" className="flex items-center justify-center transition bg-gray-800 rounded-full w-7 h-7 hover:bg-primary"><i className="text-xs text-white fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center text-gray-600 text-[10px]">
          © {currentYear} Jondor tumani hokimligi. {t('Barcha huquqlar himoyalangan', 'Все права защищены')}
        </div>
      </div>
    </footer>
  );
}