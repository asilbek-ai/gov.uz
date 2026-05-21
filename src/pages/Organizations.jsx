import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Organizations() {
  const { t, organizations } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = organizations.filter(org =>
    t(org.name, org.nameRu).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('Tashkilotlar ro\'yxati', 'Список организаций')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Tumanimizdagi davlat tashkilotlari', 'Государственные организации нашего района')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder={t('Tashkilot qidirish...', 'Поиск организаций...')} 
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(org => (
            <div key={org.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <i className="fas fa-building text-2xl text-primary"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">{t(org.name, org.nameRu)}</h3>
                  <div className="space-y-2 mt-3">
                    {org.phone && (
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <i className="fas fa-phone-alt text-primary w-4"></i> {org.phone}
                      </p>
                    )}
                    {org.email && (
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <i className="fas fa-envelope text-primary w-4"></i> {org.email}
                      </p>
                    )}
                    {org.address && (
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-primary w-4"></i> {org.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-building text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">{t('Hech qanday tashkilot topilmadi', 'Организации не найдены')}</p>
          </div>
        )}
      </div>
    </div>
  );
}