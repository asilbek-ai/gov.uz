import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiGrid } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    icon: 'gear',
    description: '',
    descriptionRu: '',
    department: ''
  });

  const iconOptions = [
    'id-card', 'map-marked-alt', 'briefcase', 'hard-hat', 'hands-helping', 'passport',
    'hospital', 'school', 'water', 'graduation-cap', 'file-alt', 'chart-line',
    'building', 'phone', 'envelope', 'clock', 'users', 'user-tie', 'calendar-alt',
    'newspaper', 'photo-video', 'download', 'headphones', 'music', 'video'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (error) {
      toast.error('Xizmatlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Xizmat nomi kiritilmadi');
      return;
    }
    try {
      if (selectedService) {
        await api.put(`/services/${selectedService._id}`, form);
        toast.success('Xizmat yangilandi');
      } else {
        await api.post('/services', form);
        toast.success('Xizmat qo\'shildi');
      }
      fetchServices();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xizmatni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/services/${id}`);
        toast.success('Xizmat o\'chirildi');
        fetchServices();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const resetForm = () => {
    setForm({ name: '', nameRu: '', icon: 'gear', description: '', descriptionRu: '', department: '' });
    setSelectedService(null);
  };

  const editService = (service) => {
    setSelectedService(service);
    setForm({
      name: service.name, nameRu: service.nameRu || '', icon: service.icon || 'gear',
      description: service.description || '', descriptionRu: service.descriptionRu || '',
      department: service.department || ''
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Xizmatlar boshqaruvi</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
        >
          <FiPlus /> Yangi xizmat
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className={`fas fa-${service.icon} text-xl text-primary`}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{service.name}</h3>
                {service.nameRu && <p className="text-sm text-gray-500">{service.nameRu}</p>}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                {service.department && <p className="text-xs text-primary mt-2">{service.department}</p>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => editService(service)} className="p-1 text-blue-500 hover:text-blue-700">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(service._id)} className="p-1 text-red-500 hover:text-red-700">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
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
              className="relative w-full max-w-lg bg-white rounded-xl shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">{selectedService ? 'Xizmatni tahrirlash' : 'Yangi xizmat'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nomi (UZ) *</label>
                    <input type="text" required className="w-full px-3 py-2 border rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nomi (RU)</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Icon</label>
                    <select className="w-full px-3 py-2 border rounded-lg" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                      {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Departament</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Tavsif (UZ)</label>
                  <textarea rows={3} className="w-full px-3 py-2 border rounded-lg" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Tavsif (RU)</label>
                  <textarea rows={3} className="w-full px-3 py-2 border rounded-lg" value={form.descriptionRu} onChange={(e) => setForm({ ...form, descriptionRu: e.target.value })} />
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