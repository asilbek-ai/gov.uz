import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

export default function Documents() {
  const { t, adminData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = adminData?.documents || [];

  const categories = [
    { id: 'all', name: 'Barchasi', nameRu: 'Все' },
    { id: 'budget', name: 'Byudjet', nameRu: 'Бюджет' },
    { id: 'programs', name: 'Dasturlar', nameRu: 'Программы' },
    { id: 'laws', name: 'Qonunlar', nameRu: 'Законы' },
    { id: 'reports', name: 'Hisobotlar', nameRu: 'Отчеты' }
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.titleRu?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('Hujjatlar', 'Документы')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('Rasmiy hujjatlar va qarorlar', 'Официальные документы и решения')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" placeholder={t('Hujjat qidirish...', 'Поиск документов...')}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t(cat.name, cat.nameRu)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">{t('Hech qanday hujjat topilmadi', 'Документы не найдены')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-pdf text-primary"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold hover:text-primary transition">
                        {t(doc.title, doc.titleRu)}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-3 pt-3 border-t">
                    <span><i className="far fa-calendar-alt mr-1"></i> {doc.date}</span>
                    <span><i className="far fa-eye mr-1"></i> {doc.views || 0}</span>
                    <button className="text-primary hover:underline text-sm">
                      <i className="fas fa-download mr-1"></i> Yuklab olish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}