import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminLeadership() {
  const { leadership, addLeader, deleteLeader, updateLeader, t } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    position: '',
    positionRu: '',
    phone: '',
    email: '',
    image: ''
  });

  const leadersList = leadership || [];

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
    if (!form.name) {
      toast.error(t('Ism kiritilmadi', 'Имя не введено'));
      return;
    }
    if (editingItem) {
      updateLeader({ ...editingItem, ...form });
      toast.success(t('Rahbar yangilandi', 'Руководитель обновлен'));
    } else {
      addLeader(form);
      toast.success(t('Rahbar qo\'shildi', 'Руководитель добавлен'));
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setForm({ name: '', nameRu: '', position: '', positionRu: '', phone: '', email: '', image: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-users text-primary mr-2"></i>
          {t('Rahbariyat boshqaruvi', 'Управление руководством')} ({leadersList.length})
        </h2>
        <button
          onClick={() => { setEditingItem(null); setForm({ name: '', nameRu: '', position: '', positionRu: '', phone: '', email: '', image: '' }); setIsModalOpen(true); }}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {t('Yangi rahbar', 'Новый руководитель')}
        </button>
      </div>

      {leadersList.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border">
          <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">{t('Hech qanday rahbar yo\'q', 'Нет руководителей')}</p>
          <button onClick={() => { setEditingItem(null); setForm({ name: '', nameRu: '', position: '', positionRu: '', phone: '', email: '', image: '' }); setIsModalOpen(true); }} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
            + {t('Birinchi rahbar qo\'shish', 'Добавить первого руководителя')}
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadersList.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg border overflow-hidden">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                {item.image ? <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  : <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center"><i className="fas fa-user-tie text-5xl text-primary/50"></i></div>}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                <p className="text-primary text-sm font-medium">{item.position}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => { setEditingItem(item); setForm({ name: item.name || '', nameRu: item.nameRu || '', position: item.position || '', positionRu: item.positionRu || '', phone: item.phone || '', email: item.email || '', image: item.image || '' }); setIsModalOpen(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                    <i className="fas fa-edit mr-1"></i> {t('Tahrirlash', 'Редактировать')}
                  </button>
                  <button onClick={() => { if (window.confirm(t('O\'chirilsinmi?', 'Удалить?'))) { deleteLeader(item.id); toast.success(t('Rahbar o\'chirildi', 'Руководитель удален')); } }} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    <i className="fas fa-trash-alt mr-1"></i> {t('O\'chirish', 'Удалить')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingItem ? t('Rahbarni tahrirlash', 'Редактирование руководителя') : t('Yangi rahbar qo\'shish', 'Добавить руководителя')}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('Rasm', 'Изображение')}</label>
                <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
                  {form.image ? <img src={form.image} className="h-32 mx-auto rounded" alt="preview" />
                    : <label className="cursor-pointer block"><i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-500">{t('Rasm yuklash', 'Загрузить изображение')}</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /></label>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">{t('Ism (UZ)', 'Имя (UZ)')} *</label>
                  <input type="text" className="w-full p-2 border rounded-lg" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
                <div><label className="block text-sm font-medium mb-1">{t('Ism (RU)', 'Имя (RU)')}</label>
                  <input type="text" className="w-full p-2 border rounded-lg" value={form.nameRu} onChange={e => setForm({ ...form, nameRu: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">{t('Lavozim (UZ)', 'Должность (UZ)')} *</label>
                  <input type="text" className="w-full p-2 border rounded-lg" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required /></div>
                <div><label className="block text-sm font-medium mb-1">{t('Lavozim (RU)', 'Должность (RU)')}</label>
                  <input type="text" className="w-full p-2 border rounded-lg" value={form.positionRu} onChange={e => setForm({ ...form, positionRu: e.target.value })} /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">{t('Telefon', 'Телефон')}</label>
                <input type="text" className="w-full p-2 border rounded-lg" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded-lg" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">{t('Bekor qilish', 'Отмена')}</button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">{t('Saqlash', 'Сохранить')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}