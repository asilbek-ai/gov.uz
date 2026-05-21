import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function News() {
  const { t, news } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = news.filter(item => t(item.title, item.titleRu).toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold gradient-text">{t('Yangiliklar', 'Новости')}</h1>
          <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder={t('Qidirish...', 'Поиск...')} className="w-full pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={item.image} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-gray-400 text-xs">{item.date}</p>
                <h3 className="font-bold mt-1 line-clamp-2">{t(item.title, item.titleRu)}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-gray-500">{t('Hech qanday yangilik topilmadi', 'Новости не найдены')}</p></div>}
      </div>
    </div>
  );
}