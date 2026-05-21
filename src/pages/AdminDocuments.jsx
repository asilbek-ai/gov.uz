import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiDownload, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';
import MediaUpload from '../components/MediaUpload';

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', titleRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '' });

  useEffect(() => { fetchDocuments(); }, []);

  const fetchDocuments = async () => {
    try {
      const res = await api.get('/documents');
      setDocuments(res.data.documents || []);
    } catch (error) { toast.error('Hujjatlarni yuklashda xatolik'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.fileUrl) { toast.error('Nomi va fayl kiritilmadi'); return; }
    try {
      await api.post('/documents', form);
      toast.success('Hujjat qo\'shildi');
      fetchDocuments();
      setIsModalOpen(false);
      setForm({ title: '', titleRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '' });
    } catch (error) { toast.error('Xatolik yuz berdi'); }
  };

  const handleDelete = async (id) => {
    if (confirm('Hujjatni o\'chirishni tasdiqlaysizmi?')) {
      await api.delete(`/documents/${id}`);
      toast.success('Hujjat o\'chirildi');
      fetchDocuments();
    }
  };

  const filtered = documents.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Hujjatlar boshqaruvi</h1>
        <div className="flex gap-3">
          <div className="relative"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Qidirish..." className="pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary"><FiPlus /> Yangi hujjat</button>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map(doc => (
          <div key={doc._id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow">
            <div><h3 className="font-semibold">{doc.title}</h3><p className="text-sm text-gray-500">{doc.category}</p></div>
            <div className="flex gap-2"><a href={doc.fileUrl} download className="p-2 text-blue-500"><FiDownload /></a><button onClick={() => handleDelete(doc._id)} className="p-2 text-red-500"><FiTrash2 /></button></div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi hujjat</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Nomi (UZ)" className="w-full p-2 border rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              <input type="text" placeholder="Nomi (RU)" className="w-full p-2 border rounded" value={form.titleRu} onChange={e => setForm({...form, titleRu: e.target.value})} />
              <textarea placeholder="Tavsif" rows="3" className="w-full p-2 border rounded" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              <MediaUpload onUploadComplete={(file) => setForm({...form, fileUrl: file.url, fileSize: file.size})} accept="application/pdf" />
              <div className="flex gap-2"><button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded">Bekor</button><button type="submit" className="flex-1 p-2 bg-primary text-white rounded">Saqlash</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}