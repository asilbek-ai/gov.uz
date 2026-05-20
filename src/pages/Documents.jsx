import { useContext } from 'react';
import { AppContext } from '../App';

export default function Documents() {
  const { t, adminData } = useContext(AppContext);
  
  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-6 text-3xl font-bold gradient-text">{t('Hujjatlar', 'Документы')}</h1>
        
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-left text-gray-600">{t('Hujjat nomi', 'Название документа')}</th>
                  <th className="px-6 py-4 font-semibold text-left text-gray-600">{t('Sana', 'Дата')}</th>
                  <th className="px-6 py-4 font-semibold text-center text-gray-600">{t('Yuklab olish', 'Скачать')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminData.documents?.length > 0 ? (
                  adminData.documents.map((doc, idx) => (
                    <tr key={doc.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <i className="text-2xl text-red-500 fas fa-file-pdf"></i>
                          <span className="font-medium text-gray-800">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-white transition rounded-lg bg-primary hover:bg-primary/90">
                          <i className="fas fa-download"></i> {t('Yuklash', 'Скачать')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-12 text-center">
                      <i className="block mb-4 text-5xl text-gray-300 fas fa-file-alt"></i>
                      <p className="text-gray-500">{t('Hech qanday hujjat yo\'q', 'Нет документов')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}