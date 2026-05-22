import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function Documents() {
  const { t, documents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (url) => {
    window.open(url, '_blank');
    toast.success('Yuklab olish boshlandi');
  };

  if (documents.length === 0) {
    return (
      <div className="min-h-screen py-16 pt-28 bg-gray-50 text-center">
        <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
        <h1 className="text-2xl font-bold">Hujjatlar</h1>
        <p className="text-gray-500">Hozircha hech qanday hujjat yo'q</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 pt-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">📄 Rasmiy hujjatlar</h1>
        <p className="text-center text-gray-500 mb-8">Jami {documents.length} ta hujjat</p>
        <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>

        <div className="max-w-md mx-auto mb-8">
          <input type="text" placeholder="Qidirish..." className="w-full p-2 border rounded" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className="space-y-3">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl p-4 shadow flex justify-between items-center flex-wrap gap-3">
              <div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.date} | {doc.category}</p>
              </div>
              <button onClick={() => handleDownload(doc.fileUrl)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                <i className="fas fa-download mr-2"></i> Yuklab olish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}