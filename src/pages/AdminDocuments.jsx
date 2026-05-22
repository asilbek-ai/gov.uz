import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function AdminDocuments() {
  const { documents, addDocument, deleteDocument } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    description: '',
    category: 'boshqa',
    fileUrl: '',
    fileSize: '',
    date: new Date().toISOString().split('T')[0]
  });

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

  const handleSubmit = () => {
    if (!form.name || !form.fileUrl) {
      toast.error('Nomi va fayl kiritilmadi');
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
    setShowForm(false);
    setForm({ name: '', nameRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id) => {
    if (window.confirm('O\'chirilsinmi?')) {
      deleteDocument(id);
      toast.success('O\'chirildi');
    }
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📄 Hujjatlar ({documents.length})</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-primary text-white rounded-lg">
          {showForm ? '✖ Bekor qilish' : '+ Yangi hujjat'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow border">
          <h2 className="text-lg font-bold mb-4">Yangi hujjat qo'shish</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Nomi (UZ)" className="w-full p-2 border rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input type="text" placeholder="Nomi (RU)" className="w-full p-2 border rounded" value={form.nameRu} onChange={e => setForm({...form, nameRu: e.target.value})} />
            <textarea placeholder="Tavsif" rows="2" className="w-full p-2 border rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <select className="w-full p-2 border rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="qonun">Qonun</option><option value="qaror">Qaror</option><option value="farmon">Farmon</option>
              <option value="hisobot">Hisobot</option><option value="nizom">Nizom</option><option value="boshqa">Boshqa</option>
            </select>
            <input type="date" className="w-full p-2 border rounded" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            <div className="border-2 border-dashed p-4 text-center rounded">
              {form.fileUrl ? (
                <div><i className="fas fa-file-pdf text-3xl text-red-500"></i><p className="text-sm">{form.fileSize}</p><button onClick={() => setForm({...form, fileUrl: '', fileSize: ''})} className="text-red-500 text-sm">O'chirish</button></div>
              ) : (
                <label className="cursor-pointer block"><i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i><p className="text-sm">PDF yuklash</p><input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} /></label>
              )}
            </div>
            <button onClick={handleSubmit} className="w-full p-2 bg-primary text-white rounded">Saqlash</button>
          </div>
        </div>
      )}

      {documents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">Hech qanday hujjat yo'q</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl p-4 shadow flex justify-between items-center flex-wrap gap-3">
              <div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.date} | {doc.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDownload(doc.fileUrl)} className="px-3 py-1 bg-blue-500 text-white rounded">Yuklab olish</button>
                <button onClick={() => handleDelete(doc.id)} className="px-3 py-1 bg-red-500 text-white rounded">O'chirish</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}