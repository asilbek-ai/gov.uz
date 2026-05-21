import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiBarChart2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [form, setForm] = useState({
    label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue', prefix: '', suffix: ''
  });

  const colorOptions = ['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'indigo'];
  const iconOptions = ['users', 'school', 'hospital', 'briefcase', 'home', 'globe', 'chart-line', 'building', 'car', 'tree'];

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await api.get('/statistics');
      setStatistics(res.data);
    } catch (error) {
      toast.error('Statistikani yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.label || !form.value) {
      toast.error('Nomi va qiymat kiritilmadi');
      return;
    }
    try {
      if (selectedStat) {
        await api.put(`/statistics/${selectedStat._id}`, form);
        toast.success('Statistika yangilandi');
      } else {
        await api.post('/statistics', form);
        toast.success('Statistika qo\'shildi');
      }
      fetchStatistics();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Statistikani o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/statistics/${id}`);
        toast.success('Statistika o\'chirildi');
        fetchStatistics();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const resetForm = () => {
    setForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue', prefix: '', suffix: '' });
    setSelectedStat(null);
  };

  const editStat = (stat) => {
    setSelectedStat(stat);
    setForm({
      label: stat.label, labelRu: stat.labelRu || '', value: stat.value, icon: stat.icon || 'chart-line',
      color: stat.color || 'blue', prefix: stat.prefix || '', suffix: stat.suffix || ''
    });
    setIsModalOpen(true);
  };

  const getColorClass = (color) => {
    const classes = {
      blue: 'bg-blue-100 text-blue-600', green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600', purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600', teal: 'bg-teal-100 text-teal-600',
      pink: 'bg-pink-100 text-pink-600', indigo: 'bg-indigo-100 text-indigo-600'
    };
    return classes[color] || 'bg-gray-100 text-gray-600';
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Statistika boshqaruvi</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
        >
          <FiPlus /> Yangi statistika
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat, idx) => (
          <motion.div
            key={stat._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 text-center bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${getColorClass(stat.color)}`}>
              <i className={`fas fa-${stat.icon} text-2xl`}></i>
            </div>
            <div className="text-2xl font-bold text-primary">
              {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            {stat.labelRu && <div className="text-xs text-gray-400">{stat.labelRu}</div>}
            <div className="flex justify-center gap-2 mt-3">
              <button onClick={() => editStat(stat)} className="text-blue-500 hover:text-blue-700">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(stat._id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">{selectedStat ? 'Statistikani tahrirlash' : 'Yangi statistika'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nomi (UZ) *</label>
                    <input type="text" required className="w-full px-3 py-2 border rounded-lg" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nomi (RU)</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.labelRu} onChange={(e) => setForm({ ...form, labelRu: e.target.value })} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Qiymat *</label>
                    <input type="number" required className="w-full px-3 py-2 border rounded-lg" value={form.value} onChange={(e) => setForm({ ...form, value: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Icon</label>
                    <select className="w-full px-3 py-2 border rounded-lg" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                      {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Rang</label>
                    <select className="w-full px-3 py-2 border rounded-lg" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
                      {colorOptions.map(color => <option key={color} value={color}>{color}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Prefiks</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.prefix} onChange={(e) => setForm({ ...form, prefix: e.target.value })} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Suffiks</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} />
                    </div>
                  </div>
                </div>

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