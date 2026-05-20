import { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Documents() {
  const { t, documents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = documents.filter(doc => 
    doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Hujjatlar', 'Документы')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Rasmiy hujjatlar va normativ aktlar', 'Официальные документы и нормативные акты')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2 fas fa-search"></i>
            <input 
              type="text" 
              placeholder={t('Hujjat qidirish...', 'Поиск документов...')} 
              className="w-full py-3 pl-12 pr-4 border rounded-xl focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="py-4 pl-6 font-semibold text-left text-gray-600">{t('Hujjat nomi', 'Название документа')}</th>
                  <th className="py-4 font-semibold text-left text-gray-600">{t('Sana', 'Дата')}</th>
                  <th className="py-4 pr-6 font-semibold text-center text-gray-600">{t('Yuklab olish', 'Скачать')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-12 text-center">
                      <i className="mb-4 text-5xl text-gray-300 fas fa-file-alt"></i>
                      <p className="text-gray-500">{t('Hech qanday hujjat topilmadi', 'Документы не найдены')}</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <i className="text-2xl text-red-500 fas fa-file-pdf"></i>
                          <span className="font-medium text-gray-800">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500">{doc.date}</td>
                      <td className="py-4 pr-6 text-center">
                        <button className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-white transition rounded-lg bg-primary hover:bg-primary/90">
                          <i className="fas fa-download"></i> {t('Yuklash', 'Скачать')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}