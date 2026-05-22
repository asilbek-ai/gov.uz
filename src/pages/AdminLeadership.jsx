import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import AddModal from '../components/AddModal';
import toast from 'react-hot-toast';

export default function AdminLeadership() {
  const { leadership, addLeadership, deleteLeadership, updateLeadership } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) { toast.error('Ism familiya kiritilmadi'); return; }
    if (editingItem) { updateLeadership({ ...editingItem, ...form }); toast.success('Rahbar yangilandi'); }
    else { addLeadership({ ...form, id: Date.now() }); toast.success('Rahbar qo\'shildi'); }
    setIsModalOpen(false); setEditingItem(null); setForm({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👥 Rahbariyat boshqaruvi ({leadership.length})</h1>
        <button onClick={() => { setEditingItem(null); setForm({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' }); setIsModalOpen(true); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"><i className="fas fa-plus"></i> Yangi rahbar</button>
      </div>
      {leadership.length === 0 ? (<div className="bg-white rounded-xl p-12 text-center"><i className="fas fa-users text-6xl text-gray-300 mb-4"></i><p className="text-gray-500">Hech qanday rahbar yo'q</p></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leadership.map(item => (<motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
            <div className="h-40 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">{item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <i className="fas fa-user-circle text-6xl text-primary/40"></i>}</div>
            <div className="p-4 text-center"><h3 className="font-bold text-lg">{item.name}</h3><p className="text-primary text-sm">{item.position}</p>{item.positionRu && <p className="text-xs text-gray-500">{item.positionRu}</p>}<div className="mt-2 text-sm text-gray-500">{item.phone && <p><i className="fas fa-phone mr-1"></i> {item.phone}</p>}{item.email && <p><i className="fas fa-envelope mr-1"></i> {item.email}</p>}</div></div>
            <div className="border-t p-3 flex gap-2"><button onClick={() => { setEditingItem(item); setForm({ name: item.name, position: item.position || '', positionRu: item.positionRu || '', image: item.image || '', phone: item.phone || '', email: item.email || '' }); setIsModalOpen(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><i className="fas fa-edit mr-1"></i> Tahrirlash</button><button onClick={() => { if (confirm('O\'chirilsinmi?')) { deleteLeadership(item.id); toast.success('Rahbar o\'chirildi'); } }} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><i className="fas fa-trash-alt mr-1"></i> O'chirish</button></div>
          </motion.div>))}
        </div>
      )}
      <AddModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }} title={editingItem ? 'Rahbarni tahrirlash' : 'Yangi rahbar'} onSubmit={handleSubmit} editMode={!!editingItem}>
        <div><label className="block text-sm font-medium mb-1">Ism familiya *</label><input type="text" required className="w-full p-2 border rounded-lg" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Lavozimi (UZ)</label><input type="text" className="w-full p-2 border rounded-lg" value={form.position} onChange={e => setForm({...form, position: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Lavozimi (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={form.positionRu} onChange={e => setForm({...form, positionRu: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Rasm</label><div className="border-2 border-dashed p-4 text-center rounded-lg">{form.image ? <img src={form.image} className="h-24 w-24 mx-auto rounded-full object-cover" /> : <label className="cursor-pointer block"><i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i><p className="text-sm">Rasm yuklash</p><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /></label>}</div></div>
        <div><label className="block text-sm font-medium mb-1">Telefon</label><input type="text" className="w-full p-2 border rounded-lg" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full p-2 border rounded-lg" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
      </AddModal>
    </div>
  );
}