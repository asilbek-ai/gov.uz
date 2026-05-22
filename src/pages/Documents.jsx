import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function Documents() {
  const { t, documents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.nameRu && doc.nameRu.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownload = (doc) => {
    if (doc.fileUrl) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.name + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Yuklab olish boshlandi');
    } else {
      toast.error('Fayl topilmadi');
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

  if (documents.length === 0) {
    return (
      <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto text-center max-w-7xl">
          <i className="mb-4 text-6xl text-gray-300 fas fa-file-alt"></i>
          <h1 className="mb-2 text-3xl font-bold gradient-text">📄 Hujjatlar</h1>
          <p className="text-gray-500">Hozircha hech qanday hujjat yo'q</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#003580] to-[#0066cc] bg-clip-text text-transparent mb-3">
            📄 {t('Rasmiy hujjatlar', 'Официальные документы')}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500">
            {t('Qonunlar, qarorlar, farmonlar va boshqa rasmiy hujjatlar', 'Законы, постановления, указы и другие официальные документы')}
          </p>
          <div className="w-20 h-1 bg-[#003580] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="absolute text-gray-400 -translate-y-1/2 fas fa-search left-4 top-1/2"></i>
            <input
              type="text"
              placeholder={t('Hujjat qidirish...', 'Поиск документов...')}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="p-5 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl">
                      <i className="text-2xl text-red-500 fas fa-file-pdf"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{doc.name}</h3>
                      {doc.nameRu && <p className="text-sm text-gray-500">{doc.nameRu}</p>}
                    </div>
                  </div>
                  {doc.description && <p className="mb-3 text-sm text-gray-600">{doc.description}</p>}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><i className="fas fa-calendar"></i> {doc.date}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{getCategoryLabel(doc.category)}</span>
                    <span className="flex items-center gap-1"><i className="fas fa-database"></i> {doc.fileSize || '1.2 MB'}</span>
                    <span className="flex items-center gap-1"><i className="fas fa-download"></i> {doc.downloadCount || 0} marta</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc)}
                  className="px-5 py-2.5 bg-[#003580] text-white rounded-xl font-medium hover:bg-[#004a99] transition-all hover:scale-105 flex items-center gap-2"
                >
                  <i className="fas fa-download"></i> {t('Yuklab olish', 'Скачать')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {t('Jami', 'Всего')}: {filteredDocs.length} {t('ta hujjat', 'документов')}
          </p>
        </div>
      </div>
    </div>
  );
}