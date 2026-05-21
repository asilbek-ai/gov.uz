import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [form, setForm] = useState({
    name: '', nameRu: '', phone: '', email: '', address: '', website: '', category: 'government'
  });

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await api.get('/organizations');
      setOrganizations(res.data);
    } catch (error) {
      toast.error('Tashkilotlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Tashkilot nomi kiritilmadi');
      return;
    }
    try {
      if (selectedOrg) {
        await api.put(`/organizations/${selectedOrg._id}`, form);
        toast.success('Tashkilot yangilandi');
      } else {
        await api.post('/organizations', form);
        toast.success('Tashkilot qo\'shildi');
      }
      fetchOrganizations();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tashkilotni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/organizations/${id}`);
        toast.success('Tashkilot o\'chirildi');
        fetchOrganizations();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const resetForm = () => {
    setForm({ name: '', nameRu: '', phone: '', email: '', address: '', website: '', category: 'government' });
    setSelectedOrg(null);
  };

  const editOrg = (org) => {
    setSelectedOrg(org);
    setForm({
      name: org.name, nameRu: org.nameRu || '', phone: org.phone || '', email: org.email || '',
      address: org.address || '', website: org.website || '', category: org.category || 'government'
    });
    setIsModalOpen(true);
  };

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (org.nameRu && org.nameRu.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Tashkilotlar boshqaruvi</h1>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary">
            <FiPlus /> Yangi tashkilot
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredOrgs.map((org, idx) => (
          <motion.div
            key={org._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{org.name}</h3>
                {org.nameRu && <p className="text-sm text-gray-500">{org.nameRu}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-500">
                  {org.phone && <p><i className="fas fa-phone mr-2 text-primary"></i>{org.phone}</p>}
                  {org.email && <p><i className="fas fa-envelope mr-2 text-primary"></i>{org.email}</p>}
                  {org.address && <p><i className="fas fa-map-marker-alt mr-2 text-primary"></i>{org.address}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editOrg(org)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FiEdit2 /></button>
                <button onClick={() => handleDelete(org._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
                <h2 className="text-xl font-bold">{selectedOrg ? 'Tashkilotni tahrirlash' : 'Yangi tashkilot'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block mb-1 text-sm font-medium">Nomi (UZ) *</label><input type="text" required className="w-full px-3 py-2 border rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div><label className="block mb-1 text-sm font-medium">Nomi (RU)</label><input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block mb-1 text-sm font-medium">Telefon</label><input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><label className="block mb-1 text-sm font-medium">Email</label><input type="email" className="w-full px-3 py-2 border rounded-lg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                </div>
                <div><label className="block mb-1 text-sm font-medium">Manzil</label><input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
                <div><label className="block mb-1 text-sm font-medium">Veb-sayt</label><input type="url" className="w-full px-3 py-2 border rounded-lg" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Bekor qilish</button>
                  <button type="submit" className="px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90">Saqlash</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}