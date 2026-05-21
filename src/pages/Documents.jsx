import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { FiSearch, FiDownload, FiFileText, FiCalendar } from 'react-icons/fi';

export default function Documents() {
  const { t, documents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Demo documents if no documents in context
  const demoDocuments = [
    { id: 1, name: "2024-yil hisoboti", nameRu: "Отчет за 2024 год", category: "hisobot", date: "2025-01-15", size: "2.4 MB", type: "PDF" },
    { id: 2, name: "Tuman rivojlanish rejasi 2025-2030", nameRu: "План развития района 2025-2030", category: "reja", date: "2025-01-10", size: "5.1 MB", type: "PDF" },
    { id: 3, name: "Byudjet xarajatlari to'g'risida", nameRu: "О бюджетных расходах", category: "moliya", date: "2025-01-05", size: "1.8 MB", type: "PDF" },
    { id: 4, name: "Yer taqsimoti qarori", nameRu: "Решение о распределении земли", category: "qaror", date: "2024-12-20", size: "0.9 MB", type: "PDF" },
    { id: 5, name: "Ekologik holat to'g'risida", nameRu: "Об экологической ситуации", category: "ekologiya", date: "2024-12-15", size: "3.2 MB", type: "PDF" }
  ];

  const categories = [
    { value: 'all', label: 'Barchasi', labelRu: 'Все' },
    { value: 'hisobot', label: 'Hisobotlar', labelRu: 'Отчеты' },
    { value: 'reja', label: 'Rejalar', labelRu: 'Планы' },
    { value: 'qaror', label: 'Qarorlar', labelRu: 'Решения' },
    { value: 'moliya', label: 'Moliya', labelRu: 'Финансы' },
    { value: 'ekologiya', label: 'Ekologiya', labelRu: 'Экология' }
  ];

  const displayDocuments = documents && documents.length > 0 ? documents : demoDocuments;

  const filtered = displayDocuments.filter(doc => {
    const matchSearch = (doc.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (doc.nameRu || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDownload = (doc) => {
    alert(`${t('Yuklanmoqda', 'Загружается')}: ${doc.name}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      hisobot: 'bg-blue-100 text-blue-700',
      reja: 'bg-green-100 text-green-700',
      qaror: 'bg-purple-100 text-purple-700',
      moliya: 'bg-orange-100 text-orange-700',
      ekologiya: 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      hisobot: t('Hisobot', 'Отчет'),
      reja: t('Reja', 'План'),
      qaror: t('Qaror', 'Решение'),
      moliya: t('Moliya', 'Финансы'),
      ekologiya: t('Ekologiya', 'Экология')
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            {t('Rasmiy hujjatlar', 'Официальные документы')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('Qonunlar, qarorlar, hisobotlar va boshqa rasmiy hujjatlar', 'Законы, постановления, отчеты и другие официальные документы')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('Hujjat qidirish...', 'Поиск документов...')}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(cat.label, cat.labelRu)}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <table>
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">
                    <FiFileText className="inline mr-2" /> {t('Hujjat nomi', 'Название документа')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">
                    {t('Kategoriya', 'Категория')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">
                    <FiCalendar className="inline mr-2" /> {t('Sana', 'Дата')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600">
                    {t('Hajmi', 'Размер')}
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-600">
                    {t('Yuklab olish', 'Скачать')}
                  </th>
                  </tr>
                </table>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <i className="fas fa-file-alt text-5xl text-gray-300 mb-4 block"></i>
                      <p className="text-gray-500">{t('Hech qanday hujjat topilmadi', 'Документы не найдены')}</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((doc, idx) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <i className="fas fa-file-pdf text-red-500 text-lg"></i>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{doc.name}</div>
                            {doc.nameRu && <div className="text-xs text-gray-400">{doc.nameRu}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(doc.category)}`}>
                          {getCategoryLabel(doc.category)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">{doc.date}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm">{doc.size || '1.2 MB'}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition flex items-center gap-2 mx-auto"
                        >
                          <FiDownload className="w-4 h-4" /> {t('Yuklash', 'Скачать')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {t('Jami', 'Всего')}: {filtered.length} {t('ta hujjat', 'документов')}
          </p>
        </div>
      </div>
    </div>
  );
}