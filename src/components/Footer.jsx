import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Footer() {
  const { t, lang } = useContext(AppContext);
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/', label: 'Bosh sahifa', labelRu: 'Главная' },
    { path: '/about', label: 'Tuman haqida', labelRu: 'О районе' },
    { path: '/services', label: 'Xizmatlar', labelRu: 'Услуги' },
    { path: '/news', label: 'Yangiliklar', labelRu: 'Новости' },
    { path: '/documents', label: 'Hujjatlar', labelRu: 'Документы' },
    { path: '/contact', label: 'Aloqa', labelRu: 'Контакты' }
  ];

  return (
    <footer className="pt-12 pb-6 mt-10 text-gray-400 bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <i className="text-white fas fa-landmark"></i>
              </div>
              <div>
                <div className="font-bold text-white">JONDOR TUMANI</div>
                <div className="text-xs text-gray-500">{t('Rasmiy portal', 'Официальный портал')}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              {t('Buxoro viloyati Jondor tumani hokimligi rasmiy veb-sayti', 'Официальный сайт хокимията Джондорского района Бухарской области')}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t('Menyu', 'Меню')}</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-500 transition hover:text-primary">
                    {t(link.label, link.labelRu)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t('Foydali havolalar', 'Полезные ссылки')}</h4>
            <ul className="space-y-2">
              <li><a href="https://gov.uz" target="_blank" className="text-sm text-gray-500 transition hover:text-primary">Gov.uz</a></li>
              <li><a href="https://my.gov.uz" target="_blank" className="text-sm text-gray-500 transition hover:text-primary">My.gov.uz</a></li>
              <li><a href="https://buxoro.uz" target="_blank" className="text-sm text-gray-500 transition hover:text-primary">Buxoro.uz</a></li>
              <li><a href="https://lex.uz" target="_blank" className="text-sm text-gray-500 transition hover:text-primary">Lex.uz</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t('Bog\'lanish', 'Контакты')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm"><i className="w-5 fas fa-map-marker-alt text-primary"></i> Jondor tumani, Buxoro</li>
              <li className="flex items-center gap-2 text-sm"><i className="w-5 fas fa-phone-alt text-primary"></i> +998 65 380-00-00</li>
              <li className="flex items-center gap-2 text-sm"><i className="w-5 fas fa-envelope text-primary"></i> info@jondor.uz</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-sm text-center text-gray-600 border-t border-gray-800">
          © {currentYear} Jondor tumani hokimligi. {t('Barcha huquqlar himoyalangan', 'Все права защищены')}
        </div>
      </div>
    </footer>
  );
}