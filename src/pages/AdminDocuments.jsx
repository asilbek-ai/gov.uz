import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function AdminDocuments() {
  const { adminData, updateData } = useContext(AppContext);
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    description: '',
    category: 'boshqa',
    fileUrl: '',
    fileSize: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (adminData && adminData.documents) {
      setDocuments(adminData.documents);
    }
  }, [adminData]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          fileUrl: reader.result,
          fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        });
        toast.success('Fayl yuklandi');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.fileUrl) {
      toast.error('Hujjat nomi va fayl kiritilmadi');
      return;
    }

    const newDoc = { ...form, id: Date.now(), downloadCount: 0 };
    const updatedDocs = [...documents, newDoc];
    
    updateData({ ...adminData, documents: updatedDocs });
    setDocuments(updatedDocs);
    setIsModalOpen(false);
    setForm({
      name: '',
      nameRu: '',
      description: '',
      category: 'boshqa',
      fileUrl: '',
      fileSize: '',
      date: new Date().toISOString().split('T')[0]
    });
    toast.success('Hujjat qo\'shildi');
  };

  const handleDelete = (id) => {
    if (window.confirm('O\'chirilsinmi?')) {
      const updatedDocs = documents.filter(doc => doc.id !== id);
      updateData({ ...adminData, documents: updatedDocs });
      setDocuments(updatedDocs);
      toast.success('Hujjat o\'chirildi');
    }
  };

  const handleDownload = (doc) => {
    window.open(doc.fileUrl, '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📄 Hujjatlar boshqaruvi ({documents.length})</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-lg">
          + Yangi hujjat
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">Hech qanday hujjat yo'q</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4">Nomi</th>
                <th className="text-left py-3 px-4">Kategoriya</th>
                <th className="text-left py-3 px-4">Sana</th>
                <th className="text-center py-3 px-4">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-file-pdf text-red-500"></i>
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{doc.category}</td>
                  <td className="py-3 px-4">{doc.date}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleDownload(doc)} className="text-blue-500" title="Yuklab olish">
                        <i className="fas fa-download"></i>
                      </button>
                      <button onClick={() => handleDelete(doc.id)} className="text-red-500" title="O'chirish">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Yangi hujjat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nomi (UZ) *</label>
                <input type="text" required className="w-full p-2 border rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nomi (RU)</label>
                <input type="text" className="w-full p-2 border rounded" value={form.nameRu} onChange={e => setForm({...form, nameRu: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategoriya</label>
                <select className="w-full p-2 border rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option value="qonun">Qonun</option>
                  <option value="qaror">Qaror</option>
                  <option value="farmon">Farmon</option>
                  <option value="hisobot">Hisobot</option>
                  <option value="nizom">Nizom</option>
                  <option value="boshqa">Boshqa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sana</label>
                <input type="date" className="w-full p-2 border rounded" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PDF fayl *</label>
                <div className="border-2 border-dashed p-4 text-center">
                  {form.fileUrl ? (
                    <div>
                      <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                      <p className="text-sm mt-1">{form.fileSize}</p>
                      <button type="button" onClick={() => setForm({...form, fileUrl: '', fileSize: ''})} className="text-red-500 text-sm mt-2">O'chirish</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                      <p className="text-sm text-gray-500">PDF fayl yuklash</p>
                      <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
                    </label>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded">Bekor</button>
                <button type="submit" className="flex-1 p-2 bg-primary text-white rounded">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}