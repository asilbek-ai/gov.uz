import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import AddModal from '../components/AddModal';
import toast from 'react-hot-toast';

export default function AdminDocuments() {
  const { documents, addDocument, deleteDocument, updateDocument } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', nameRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '', date: new Date().toISOString().split('T')[0] });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, fileUrl: reader.result, fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.fileUrl) { toast.error('Hujjat nomi va fayl kiritilmadi'); return; }
    if (editingItem) { updateDocument({ ...editingItem, ...form }); toast.success('Hujjat yangilandi'); }
    else { addDocument({ ...form, id: Date.now(), downloadCount: 0 }); toast.success('Hujjat qo\'shildi'); }
    setIsModalOpen(false); setEditingItem(null); setForm({ name: '', nameRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '', date: new Date().toISOString().split('T')[0] });
  };

  const getCategoryLabel = (cat) => ({ qonun: '📜 Qonun', qaror: '📋 Qaror', farmon: '📝 Farmon', hisobot: '📊 Hisobot', nizom: '📑 Nizom', boshqa: '📁 Boshqa' }[cat] || cat);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📄 Hujjatlar boshqaruvi ({documents.length})</h1>
        <button onClick={() => { setEditingItem(null); setForm({ name: '', nameRu: '', description: '', category: 'boshqa', fileUrl: '', fileSize: '', date: new Date().toISOString().split('T')[0] }); setIsModalOpen(true); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"><i className="fas fa-plus"></i> Yangi hujjat</button>
      </div>
      {documents.length === 0 ? (<div className="bg-white rounded-xl p-12 text-center"><i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i><p className="text-gray-500">Hech qanday hujjat yo'q</p></div>) : (
        <div className="space-y-3">
          {documents.map(item => (<motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ x: 5 }} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start flex-wrap gap-4"><div className="flex-1"><div className="flex items-center gap-3"><i className="fas fa-file-pdf text-red-500 text-2xl"></i><div><h3 className="font-bold text-lg">{item.name}</h3>{item.nameRu && <p className="text-sm text-gray-500">{item.nameRu}</p>}</div></div><div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500"><span>📅 {item.date}</span><span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{getCategoryLabel(item.category)}</span><span>💾 {item.fileSize || '1.2 MB'}</span></div></div>
            <div className="flex gap-2"><button onClick={() => window.open(item.fileUrl, '_blank')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"><i className="fas fa-download"></i></button><button onClick={() => { setEditingItem(item); setForm({ name: item.name, nameRu: item.nameRu || '', description: item.description || '', category: item.category || 'boshqa', fileUrl: item.fileUrl, fileSize: item.fileSize || '', date: item.date || new Date().toISOString().split('T')[0] }); setIsModalOpen(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><i className="fas fa-edit"></i></button><button onClick={() => { if (confirm('O\'chirilsinmi?')) { deleteDocument(item.id); toast.success('Hujjat o\'chirildi'); } }} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><i className="fas fa-trash-alt"></i></button></div></div>
          </motion.div>))}
        </div>
      )}
      <AddModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }} title={editingItem ? 'Hujjatni tahrirlash' : 'Yangi hujjat'} onSubmit={handleSubmit} editMode={!!editingItem}>
        <div><label className="block text-sm font-medium mb-1">Nomi (UZ) *</label><input type="text" required className="w-full p-2 border rounded-lg" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Nomi (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={form.nameRu} onChange={e => setForm({...form, nameRu: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Tavsif</label><textarea rows="3" className="w-full p-2 border rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Kategoriya</label><select className="w-full p-2 border rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option value="qonun">Qonun</option><option value="qaror">Qaror</option><option value="farmon">Farmon</option><option value="hisobot">Hisobot</option><option value="nizom">Nizom</option><option value="boshqa">Boshqa</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Sana</label><input type="date" className="w-full p-2 border rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">PDF fayl *</label><div className="border-2 border-dashed p-4 text-center rounded-lg">{form.fileUrl ? <div><i className="fas fa-file-pdf text-3xl text-red-500"></i><p className="text-sm mt-1">{form.fileSize}</p><button type="button" onClick={() => setForm({...form, fileUrl: '', fileSize: ''})} className="text-red-500 text-sm mt-2">O'chirish</button></div> : <label className="cursor-pointer block"><i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i><p className="text-sm">PDF yuklash</p><input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} /></label>}</div></div>
      </AddModal>
    </div>
  );
}