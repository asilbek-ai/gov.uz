import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { FiPlus, FiTrash2, FiEdit2, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminLeadership() {
  const { t, leadership, deleteLeadership, addLeadership } = useContext(AppContext);
  const [localLeaders, setLocalLeaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', positionRu: '', phone: '', email: '', image: '' });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (leadership && leadership.length > 0) {
      setLocalLeaders(leadership);
    } else {
      const saved = localStorage.getItem('jondor_data');
      if (saved) {
        const data = JSON.parse(saved);
        setLocalLeaders(data.leadership || []);
      }
    }
  }, [leadership]);

  const saveToLocalStorage = (updatedLeaders) => {
    const saved = localStorage.getItem('jondor_data');
    const data = saved ? JSON.parse(saved) : { leadership: [] };
    data.leadership = updatedLeaders;
    localStorage.setItem('jondor_data', JSON.stringify(data));
    setLocalLeaders(updatedLeaders);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Faqat rasm fayli yuklang');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Ism familiya kiritilmadi');
      return;
    }
    if (editingLeader) {
      const updated = localLeaders.map(l => l.id === editingLeader.id ? { ...l, ...form } : l);
      saveToLocalStorage(updated);
      toast.success('Rahbar yangilandi');
    } else {
      const newLeader = { ...form, id: Date.now() };
      saveToLocalStorage([...localLeaders, newLeader]);
      if (addLeadership) addLeadership(newLeader);
      toast.success('Rahbar qo\'shildi');
    }
    setIsModalOpen(false);
    setEditingLeader(null);
    setForm({ name: '', position: '', positionRu: '', phone: '', email: '', image: '' });
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    if (confirm('O\'chirilsinmi?')) {
      const updated = localLeaders.filter(l => l.id !== id);
      saveToLocalStorage(updated);
      if (deleteLeadership) deleteLeadership(id);
      toast.success('Rahbar o\'chirildi');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rahbariyat boshqaruvi</h1>
        <button onClick={() => { setEditingLeader(null); setForm({ name: '', position: '', positionRu: '', phone: '', email: '', image: '' }); setImagePreview(null); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
          <FiPlus /> Yangi rahbar
        </button>
      </div>

      {localLeaders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">Hech qanday rahbar yo'q</p>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 px-5 py-2 bg-primary text-white rounded-lg">
            Birinchi rahbar qo'shish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localLeaders.map(leader => (
            <div key={leader.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-40 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                {leader.image ? <img src={leader.image} className="w-full h-full object-cover" alt={leader.name} /> : <FiUser className="text-5xl text-primary/40" />}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{leader.name}</h3>
                <p className="text-primary text-sm">{leader.position}</p>
                {leader.positionRu && <p className="text-gray-500 text-xs">{leader.positionRu}</p>}
                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  {leader.phone && <p><FiPhone className="inline mr-2" /> {leader.phone}</p>}
                  {leader.email && <p><FiMail className="inline mr-2" /> {leader.email}</p>}
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <button onClick={() => { setEditingLeader(leader); setForm(leader); setImagePreview(leader.image || null); setIsModalOpen(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                    <FiEdit2 className="inline mr-1" /> Tahrirlash
                  </button>
                  <button onClick={() => handleDelete(leader.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    <FiTrash2 className="inline mr-1" /> O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
              <h2 className="text-xl font-bold">{editingLeader ? 'Rahbarni tahrirlash' : 'Yangi rahbar'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" placeholder="Ism familiya *" className="w-full p-2 border rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Lavozimi (UZ)" className="w-full p-2 border rounded" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
                <input type="text" placeholder="Lavozimi (RU)" className="w-full p-2 border rounded" value={form.positionRu} onChange={e => setForm({...form, positionRu: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Telefon" className="w-full p-2 border rounded" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} className="w-24 h-24 rounded-full object-cover mx-auto" alt="Preview" />
                    <button type="button" onClick={() => { setImagePreview(null); setForm({ ...form, image: '' }); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2 block"></i>
                    <p className="text-sm text-gray-500">Rasm yuklash</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
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