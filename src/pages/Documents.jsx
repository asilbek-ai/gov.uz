import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { FiSearch, FiDownload, FiFileText, FiCalendar, FiFolder } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Documents() {
  const { t, adminData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // adminData.documents dan hujjatlarni olish
  const documents = adminData?.documents || [];

  const categories = [
    { value: 'all', label: t('Barchasi', 'Все') },
    { value: 'qonun', label: t('Qonunlar', 'Законы') },
    { value: 'qaror', label: t('Qarorlar', 'Постановления') },
    { value: 'farmon', label: t('Farmonlar', 'Указы') },
    { value: 'hisobot', label: t('Hisobotlar', 'Отчеты') },
    { value: 'nizom', label: t('Nizomlar', 'Положения') },
    { value: 'boshqa', label: t('Boshqa', 'Другое') }
  ];

  const filteredDocs = documents.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (doc.nameRu && doc.nameRu.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDownload = (doc) => {
    if (doc.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.name + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t('Yuklab olish boshlandi', 'Загрузка началась'));
    } else {
      toast.error(t('Fayl topilmadi', 'Файл не найден'));
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      qonun: '📜 Qonun',
      qaror: '📋 Qaror',
      farmon: '📝 Farmon',
      hisobot: '📊 Hisobot',
      nizom: '📑 Nizom',
      boshqa: '📁 Boshqa'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      qonun: 'bg-red-100 text-red-700',
      qaror: 'bg-blue-100 text-blue-700',
      farmon: 'bg-purple-100 text-purple-700',
      hisobot: 'bg-green-100 text-green-700',
      nizom: 'bg-orange-100 text-orange-700',
      boshqa: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            📄 {t('Rasmiy hujjatlar', 'Официальные документы')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('Qonunlar, qarorlar, farmonlar va boshqa rasmiy hujjatlar', 'Законы, постановления, указы и другие официальные документы')}
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
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
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
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-2">{t('Hozircha hech qanday hujjat yo\'q', 'Пока нет документов')}</p>
            <p className="text-gray-400 text-sm">{t('Yangi hujjatlar qo\'shilishi bilan bu yerda ko\'rinadi', 'Новые документы появятся здесь после добавления')}</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">{t('Hech qanday hujjat topilmadi', 'Документы не найдены')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                        <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{doc.name}</h3>
                        {doc.nameRu && <p className="text-sm text-gray-500">{doc.nameRu}</p>}
                      </div>
                    </div>
                    {doc.description && <p className="text-gray-600 text-sm mb-3">{doc.description}</p>}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" /> {doc.date || '2025-01-01'}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(doc.category)}`}>
                        {getCategoryLabel(doc.category)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiFileText className="w-4 h-4" /> {doc.fileSize || '1.2 MB'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <FiDownload className="w-4 h-4" /> {t('Yuklab olish', 'Скачать')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {documents.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {t('Jami', 'Всего')}: {filteredDocs.length} {t('ta hujjat', 'документов')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}