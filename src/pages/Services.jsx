import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Services() {
  const { t, services } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = services.filter(s => 
    t(s.name, s.nameRu).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h1>
          <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder={t('Qidirish...', 'Поиск...')} className="w-full pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(service => (
            <div key={service.id} className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><i className={`fas fa-${service.icon} text-primary text-xl`}></i></div>
                <div><h3 className="font-bold">{t(service.name, service.nameRu)}</h3><p className="text-sm text-gray-500">{service.department}</p></div>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-gray-500">{t('Hech qanday xizmat topilmadi', 'Услуги не найдены')}</p></div>}
      </div>
    </div>
  );
}