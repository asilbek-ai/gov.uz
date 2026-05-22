import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import AddModal from '../components/AddModal';
import toast from 'react-hot-toast';

export default function AdminServices() {
  const { services, addService, deleteService, updateService } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) { toast.error('Xizmat nomi kiritilmadi'); return; }
    if (editingItem) { updateService({ ...editingItem, ...form }); toast.success('Xizmat yangilandi'); }
    else { addService({ ...form, id: Date.now() }); toast.success('Xizmat qo\'shildi'); }
    setIsModalOpen(false); setEditingItem(null); setForm({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
  };

  const handleEdit = (item) => { setEditingItem(item); setForm({ name: item.name, nameRu: item.nameRu || '', icon: item.icon || 'gear', description: item.description || '', department: item.department || '' }); setIsModalOpen(true); };
  const handleDelete = (id) => { if (confirm('O\'chirilsinmi?')) { deleteService(id); toast.success('Xizmat o\'chirildi'); } };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">⚙️ Xizmatlar boshqaruvi ({services.length})</h1>
        <button onClick={() => { setEditingItem(null); setForm({ name: '', nameRu: '', icon: 'gear', description: '', department: '' }); setIsModalOpen(true); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"><i className="fas fa-plus"></i> Yangi xizmat</button>
      </div>
      {services.length === 0 ? (<div className="bg-white rounded-xl p-12 text-center"><i className="fas fa-th-large text-6xl text-gray-300 mb-4"></i><p className="text-gray-500">Hech qanday xizmat yo'q</p></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(item => (<motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 flex items-center gap-3"><div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"><i className={`fas fa-${item.icon} text-primary text-xl`}></i></div><div><h3 className="font-bold">{item.name}</h3>{item.nameRu && <p className="text-sm text-gray-500">{item.nameRu}</p>}</div></div>
            <div className="p-4"><p className="text-gray-600 text-sm">{item.description}</p><p className="text-xs text-primary mt-2"><i className="fas fa-building mr-1"></i> {item.department}</p></div>
            <div className="border-t p-3 flex gap-2"><button onClick={() => handleEdit(item)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><i className="fas fa-edit mr-1"></i> Tahrirlash</button><button onClick={() => handleDelete(item.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><i className="fas fa-trash-alt mr-1"></i> O'chirish</button></div>
          </motion.div>))}
        </div>
      )}
      <AddModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }} title={editingItem ? 'Xizmatni tahrirlash' : 'Yangi xizmat'} onSubmit={handleSubmit} editMode={!!editingItem}>
        <div><label className="block text-sm font-medium mb-1">Nomi (UZ) *</label><input type="text" required className="w-full p-2 border rounded-lg" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Nomi (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={form.nameRu} onChange={e => setForm({...form, nameRu: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Icon</label><input type="text" placeholder="id-card, briefcase, etc." className="w-full p-2 border rounded-lg" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Tavsif</label><textarea rows="3" className="w-full p-2 border rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div><label className="block text-sm font-medium mb-1">Departament</label><input type="text" className="w-full p-2 border rounded-lg" value={form.department} onChange={e => setForm({...form, department: e.target.value})} /></div>
      </AddModal>
    </div>
  );
}