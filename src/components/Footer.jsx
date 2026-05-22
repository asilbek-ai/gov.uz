import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function Footer() {
  const { t } = useContext(AppContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo va ma'lumot */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-landmark text-2xl text-primary"></i>
              <h3 className="text-xl font-bold">Jondor tumani</h3>
            </div>
            <p className="text-gray-400 text-sm">
              {t('Rasmiy veb-portal', 'Официальный веб-портал')}
            </p>
          </div>

          {/* Mavzular */}
          <div>
            <h4 className="font-bold mb-4">{t('Mavzular', 'Темы')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/news" className="hover:text-primary transition">{t('Yangiliklar', 'Новости')}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition">{t('Xizmatlar', 'Услуги')}</Link></li>
              <li><Link to="/documents" className="hover:text-primary transition">{t('Hujjatlar', 'Документы')}</Link></li>
              <li><Link to="/media" className="hover:text-primary transition">{t('Media', 'Медиа')}</Link></li>
            </ul>
          </div>

          {/* Tashkilotlar */}
          <div>
            <h4 className="font-bold mb-4">{t('Tashkilotlar', 'Организации')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/organizations" className="hover:text-primary transition">{t('Rahbariyat', 'Руководство')}</Link></li>
              <li><Link to="/statistics" className="hover:text-primary transition">{t('Statistika', 'Статистика')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">{t('Tuman haqida', 'О районе')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">{t('Aloqa', 'Контакты')}</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-bold mb-4">{t('Bog\'lanish', 'Контакты')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><i className="fas fa-phone-alt w-5 text-primary"></i> +998 65 380-00-00</li>
              <li><i className="fas fa-envelope w-5 text-primary"></i> info@jondor.uz</li>
              <li><i className="fas fa-map-marker-alt w-5 text-primary"></i> {t('Jondor shahri', 'г. Джондор')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} {t('Jondor tumani hokimligi', 'Хокимият Джондорского района')}</p>
        </div>
      </div>
    </footer>
  );
}