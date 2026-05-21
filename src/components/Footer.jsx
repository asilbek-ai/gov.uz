import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../App';

export default function Footer() {
  const { t } = useContext(AppContext);
  const location = useLocation();
  if (location.pathname.includes('/admin')) return null;

  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6 mt-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><i className="fas fa-landmark text-white text-sm"></i></div>
              <div><div className="font-bold text-white text-xs">JONDOR TUMANI</div></div>
            </div>
            <p className="text-xs text-gray-500">{t('Buxoro viloyati Jondor tumani hokimligi rasmiy veb-sayti', 'Официальный сайт хокимията Джондорского района')}</p>
          </div>
          <div><h4 className="text-white text-sm font-bold mb-3">{t('Menyu', 'Меню')}</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="text-gray-500 hover:text-primary text-xs"><i class="fa-regular fa-house fa-beat-fade"></i> {t('Bosh sahifa', 'Главная')}</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-primary text-xs"><i class="fa-solid fa-book-journal-whills fa-beat-fade"></i> {t('Tuman haqida', 'О районе')}</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary text-xs"><i class="fa-solid fa-phone-volume fa-beat-fade"></i> {t('Aloqa', 'Контакты')}</Link></li>
            </ul>
          </div>
          <div><h4 className="text-white text-sm font-bold mb-3">{t('Foydali havolalar', 'Полезные ссылки')}</h4>
            <ul className="space-y-1"><li><a href="https://gov.uz" target="_blank" className="text-gray-500 hover:text-primary text-xs">Gov.uz</a></li><li><a href="https://my.gov.uz" target="_blank" className="text-gray-500 hover:text-primary text-xs">My.gov.uz</a></li></ul>
          </div>
          <div><h4 className="text-white text-sm font-bold mb-3">{t('Bog\'lanish', 'Контакты')}</h4>
            <ul className="space-y-2"><li className="flex items-center gap-2 text-xs"><i className="fas fa-map-marker-alt w-4 text-primary"></i> Jondor tumani</li><li className="flex items-center gap-2 text-xs"><i className="fas fa-phone-alt w-4 text-primary"></i> +998 65 380-00-00</li><li className="flex items-center gap-2 text-xs"><i className="fas fa-envelope w-4 text-primary"></i> info@jondor.uz</li></ul>
            <div className="flex gap-3 mt-3"><a href="#" className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary"><i className="fab fa-telegram text-white text-xs"></i></a><a href="#" className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary"><i className="fab fa-facebook-f text-white text-xs"></i></a></div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center text-gray-600 text-[10px]">© {new Date().getFullYear()} Jondor tumani hokimligi. {t('Barcha huquqlar himoyalangan', 'Все права защищены')}</div>
      </div>
    </footer>
  );
}