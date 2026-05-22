import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function AdminDocuments() {
  const { documents, addDocument, deleteDocument, updateDocument } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    description: '',
    category: 'boshqa',
    fileUrl: '',
    fileSize: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { value: 'qonun', label: 'Qonun' },
    { value: 'qaror', label: 'Qaror' },
    { value: 'farmon', label: 'Farmon' },
    { value: 'hisobot', label: 'Hisobot' },
    { value: 'nizom', label: 'Nizom' },
    { value: 'boshqa', label: 'Boshqa' }
  ];

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
    const newDoc = {
      id: Date.now(),
      name: form.name,
      nameRu: form.nameRu,
      description: form.description,
      category: form.category,
      fileUrl: form.fileUrl,
      fileSize: form.fileSize,
      date: form.date,
      downloadCount: 0
    };
    addDocument(newDoc);
    toast.success('Hujjat qo\'shildi');
    setIsModalOpen(false);
    setEditingDoc(null);
    resetForm();
  };

  const handleUpdate = () => {
    if (!form.name || !form.fileUrl) {
      toast.error('Hujjat nomi va fayl kiritilmadi');
      return;
    }
    updateDocument({ ...editingDoc, ...form });
    toast.success('Hujjat yangilandi');
    setIsModalOpen(false);
    setEditingDoc(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('O\'chirilsinmi?')) {
      deleteDocument(id);
      toast.success('O\'chirildi');
    }
  };

  const handleEdit = (doc) => {
    setEditingDoc(doc);
    setForm({
      name: doc.name,
      nameRu: doc.nameRu || '',
      description: doc.description || '',
      category: doc.category,
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
      date: doc.date
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({
      name: '',
      nameRu: '',
      description: '',
      category: 'boshqa',
      fileUrl: '',
      fileSize: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDownload = (doc) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Yuklab olish boshlandi');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📄 Hujjatlar boshqaruvi ({documents.length})</h1>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="px-4 py-2 text-white rounded-lg bg-primary">
          + Yangi hujjat
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl">
          <i className="mb-4 text-6xl text-gray-300 fas fa-file-alt"></i>
          <p className="text-gray-500">Hech qanday hujjat yo'q</p>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 mt-4 text-white rounded-lg bg-primary">
            + Birinchi hujjatni qo'shish
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="p-4 transition-all bg-white shadow-md rounded-xl hover:shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <i className="text-2xl text-red-500 fas fa-file-pdf"></i>
                    <div>
                      <h3 className="text-lg font-bold">{doc.name}</h3>
                      {doc.nameRu && <p className="text-sm text-gray-500">{doc.nameRu}</p>}
                    </div>
                  </div>
                  {doc.description && <p className="mt-2 text-sm text-gray-600">{doc.description}</p>}
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    <span><i className="fas fa-calendar"></i> {doc.date}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{doc.category}</span>
                    <span><i className="fas fa-database"></i> {doc.fileSize || '1.2 MB'}</span>
                    <span><i className="fas fa-download"></i> {doc.downloadCount || 0} marta</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(doc)} className="p-2 text-green-600 transition rounded-lg bg-green-50 hover:bg-green-100" title="Yuklab olish">
                    <i className="fas fa-download"></i>
                  </button>
                  <button onClick={() => handleEdit(doc)} className="p-2 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100" title="Tahrirlash">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(doc.id)} className="p-2 text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100" title="O'chirish">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-4 bg-white border-b">
              <h2 className="text-xl font-bold">{editingDoc ? '✏️ Hujjatni tahrirlash' : '📄 Yangi hujjat'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="absolute text-gray-500 top-4 right-4 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={editingDoc ? handleUpdate : handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Nomi (UZ) *</label>
                <input type="text" required className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Nomi (RU)</label>
                <input type="text" className="w-full p-2 border rounded-lg" value={form.nameRu} onChange={e => setForm({...form, nameRu: e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Tavsif</label>
                <textarea rows="3" className="w-full p-2 border rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Kategoriya</label>
                <select className="w-full p-2 border rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Sana</label>
                <input type="date" className="w-full p-2 border rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">PDF fayl *</label>
                <div className="p-4 text-center border-2 border-dashed rounded-lg">
                  {form.fileUrl ? (
                    <div>
                      <i className="text-3xl text-red-500 fas fa-file-pdf"></i>
                      <p className="mt-1 text-sm">{form.fileSize}</p>
                      <button type="button" onClick={() => setForm({...form, fileUrl: '', fileSize: ''})} className="mt-2 text-sm text-red-500">O'chirish</button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <i className="text-3xl text-gray-400 fas fa-cloud-upload-alt"></i>
                      <p className="text-sm text-gray-500">PDF fayl yuklash</p>
                      <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
                    </label>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded-lg hover:bg-gray-50">Bekor</button>
                <button type="submit" className="flex-1 p-2 text-white rounded-lg bg-primary hover:bg-primary/90">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}